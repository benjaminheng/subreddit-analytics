import { Iterable } from 'immutable';

function configTemplate(type, title, xTitle, yTitle, seriesName, categories, datapoints) {
    const config = {
        credits: false,
        legend: {
            enabled: false
        },
        chart: {
            type: type
        },
        title: {
            text: title
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

function buildConfig(type, title, xTitle, yTitle, seriesName, xKey, yKey, data) {
    if (Iterable.isIterable(data)) {
        data = data.toJS();
    }
    let categories = [];
    let datapoints = [];
    data.map(item => {
        categories.push(item[xKey]);
        datapoints.push(parseInt(item[yKey]));
    });
    let config = configTemplate(type, title, xTitle, yTitle, seriesName, categories, datapoints);
    return config
}

function topCommentersByScore(data) {
    return buildConfig('bar', 'By karma', '', 'Karma', 'Karma', 'author', 'count', data);
}

function topCommentersByPosts(data) {
    return buildConfig('bar', 'By posts', '', 'Posts', 'Posts', 'author', 'count', data);
}

function commentDistributionByDay(data) {
    return buildConfig('column', 'Comment distribution by day of week', '', 'Comments', 'Comments', 'day', 'count', data);
}

function commentDistributionByHour(data) {
    return buildConfig('column', 'Comment distribution by hour', '', 'Comments', 'Comments', 'hour', 'count', data);
}

export default {
    topCommentersByScore,
    topCommentersByPosts,
    commentDistributionByDay,
    commentDistributionByHour
}
