#!/usr/bin/python

import praw
import psycopg2
from requests.exceptions import HTTPError
import logging

__author__ = 'Ben'
__version__ = '0.1.0'

SUBREDDIT = 'singapore'

DB_USER = 'Ben'
DB_NAME = 'subreddit-analytics-dev'
HOST = 'localhost'
PORT = 5432
PASSWORD = '' # It is RECOMMENDED to leave this blank and instead use the .pgpass credential store.

LOG_LEVEL = logging.INFO

def init_logger(name='subreddit-analytics'):
    formatStr = '%(asctime)s - %(levelname)s - %(name)s - %(message)s'
    logging.basicConfig(filename=name+'.log', level=LOG_LEVEL, 
                        format=formatStr)
    logFormatter = logging.Formatter(formatStr)
    logger = logging.getLogger(name)
    ch = logging.StreamHandler()
    ch.setFormatter(logFormatter)
    logger.addHandler(ch)
    return logger


class DB():
    def __init__(self):
        try:
            if PASSWORD != '':
                connectStr = "dbname='%s' user='%s' host='%s' port=%s password='%s'" % (DB_NAME, DB_USER, HOST, PORT, PASSWORD)
            else:
                connectStr = "dbname='%s' user='%s' host='%s' port=%s" % (DB_NAME, DB_USER, HOST, PORT)
            self.conn = psycopg2.connect(connectStr)
            self.c = self.conn.cursor()
        except:
            logger.error('Unable to connect to database')
            raise
        self.initialize_tables()

    # Create tables if they don't exist
    def initialize_tables(self):
        self.c.execute('''
                        CREATE TABLE IF NOT EXISTS submission (
                            id varchar(8) primary key,
                            title text,
                            posted timestamp with time zone,
                            permalink varchar(255),
                            url text,
                            selftext text,
                            author varchar(24),
                            score integer,
                            gilded integer 
                        )''')
        self.c.execute('''
                        CREATE TABLE IF NOT EXISTS comment (
                            id varchar(8) primary key,
                            submission_id varchar(8) references submission(id),
                            posted timestamp with time zone,
                            permalink varchar(255),
                            author varchar(24),
                            body text,
                            score integer,
                            gilded integer
                        )''')
        self.conn.commit()

    # Add a row to `submission` table
    def submission_add_row(self, data):
        self.c.execute('''UPDATE submission SET gilded=%s, selftext=%s, score=%s WHERE id=%s''', 
                        (data['gilded'], data['selftext'], data['score'], data['id']))
        self.c.execute('''
                        INSERT INTO submission
                        SELECT %(id)s, %(title)s, to_timestamp(%(posted)s), %(permalink)s, %(url)s, %(selftext)s, %(author)s, %(score)s, %(gilded)s
                        WHERE NOT EXISTS (SELECT 1 from submission where id=%(id)s)
                ''', data)
        self.conn.commit()

    # Add rows to `comment` table
    def comment_add_rows(self, data):
        toUpdate = []
        for d in data:
            toUpdate.append((d['body'], d['gilded'], d['score'], d['id']))

        self.c.executemany('''UPDATE comment SET body=%s, gilded=%s, score=%s WHERE id=%s''', toUpdate)
        self.c.executemany('''
                        INSERT INTO comment
                        SELECT %(id)s, %(submission_id)s, to_timestamp(%(posted)s), %(permalink)s, %(author)s, %(body)s, %(score)s, %(gilded)s
                        WHERE NOT EXISTS (SELECT 1 FROM comment WHERE id=%(id)s)
                ''', data)
        self.conn.commit()

if __name__ == '__main__':
    logger = init_logger()
    db = DB()

    r = praw.Reddit(user_agent='subreddit-analytics/%s' % __version__)
    while True:
        try:
            logger.info('Updating database')
            submissions = r.get_subreddit(SUBREDDIT).get_new(limit=50)
            for sub in submissions:
                subRowData = {'id': sub.id, 'title': sub.title, 'posted': sub.created_utc, 
                        'permalink': sub.permalink, 'url': sub.url, 'selftext': sub.selftext, 
                        'score': sub.score, 'gilded': sub.gilded}
                if sub.author != None: subRowData['author'] = sub.author.name
                db.submission_add_row(subRowData)

                comments = []

                try: # tends to throw an error, gracefully continue updating if it happens
                    sub.replace_more_comments(limit=None)
                except HTTPError: 
                    logger.error('HTTPError: Unable to load more comments for submission %s.' % sub.id)
                flatComments = praw.helpers.flatten_tree(sub.comments)
                for comment in flatComments:
                    if comment.author != None:
                        comments.append({'id': comment.id, 'posted': comment.created_utc, 
                            'submission_id': comment.submission.id, 'permalink': comment.permalink,
                            'author': comment.author.name, 'body': comment.body, 'score': comment.score,
                            'gilded': comment.gilded})
                db.comment_add_rows(comments)
            logger.info('Finished updating database')
        except Exception as e:
            logger.error('Main loop: %s: %s' % (type(e).__name__, e))
