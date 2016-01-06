import { Iterable } from 'immutable';

var generalConfig = {
    credits: false,
    legend: {
        enabled: false
    }
}

function bar(title, xTitle, yTitle, seriesName, categories, datapoints) {
    const config = {
        chart: {
            type: 'bar'
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

function topCommenters(title, xTitle, yTitle, seriesName, data) {
    if (Iterable.isIterable(data)) {
        data = data.toJS();
    }
    let config = Object.assign({}, generalConfig);
    let categories = [];
    let datapoints = [];
    data.map(item => {
        categories.push(item.author);
        datapoints.push(parseInt(item.count));
    });
    let options = bar(title, xTitle, yTitle, seriesName, categories, datapoints);
    Object.assign(config, options);
    return config
}

function topCommentersByScore(data) {
    return topCommenters('By karma', '', 'Karma', 'Karma', data);
}

function topCommentersByPosts(data) {
    return topCommenters('By posts', '', 'Posts', 'Posts', data);
}

export default {
    topCommentersByScore,
    topCommentersByPosts
}
