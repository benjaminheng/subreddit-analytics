import { Iterable } from 'immutable';

function configTemplate(type, xTitle, yTitle, seriesName, categories, datapoints) {
    const config = {
        credits: false,
        legend: {
            enabled: false
        },
        chart: {
            type: type
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: categories,
            title: {
                text: xTitle
            }
        },
        yAxis: {
            title: {
                text: yTitle
            }
        },
        series: [{
            name: seriesName,
            data: datapoints
        }]
    }
    return config;
}

function buildConfig(type, xTitle, yTitle, seriesName, xKey, yKey, data) {
    if (Iterable.isIterable(data)) {
        data = data.toJS();
    }
    let categories = [];
    let datapoints = [];
    data.map(item => {
        categories.push(item[xKey]);
        datapoints.push(parseInt(item[yKey]));
    });
    let config = configTemplate(type, xTitle, yTitle, seriesName, categories, datapoints);
    return config
}

function topCommentersByScore(data) {
    return buildConfig('bar', '', 'Karma', 'Karma', 'author', 'count', data);
}

function topCommentersByPosts(data) {
    return buildConfig('bar', '', 'Posts', 'Posts', 'author', 'count', data);
}

function commentDistributionByDay(data) {
    return buildConfig('column', '', 'Comments', 'Comments', 'day', 'count', data);
}

function commentDistributionByHour(data) {
    return buildConfig('column', '', 'Comments', 'Comments', 'hour', 'count', data);
}

function commentsPerMonth(data) {
    return buildConfig('column', '', 'Comments', 'Comments', 'month', 'count', data);
}

export default {
    topCommentersByScore,
    topCommentersByPosts,
    commentDistributionByDay,
    commentDistributionByHour,
    commentsPerMonth
}
