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

function topCommentersByScore(data) {
    if (Iterable.isIterable(data)) {
        data = data.toJS();
    }
    let config = Object.assign({}, generalConfig);
    let categories = [];
    let datapoints = [];
    data.map(item => {
        categories.push(item.author);
        datapoints.push(-parseInt(item.count));
    });

    let options = bar('By karma', '', 'Score', 'Score', categories, datapoints);
    options = {
        ...options,
        yAxis: {
            ...options.yAxis,
            labels: {
                formatter: function() {
                    return Math.abs(this.value);
                }
            }
        },
        plotOptions: {
            series: {
                tooltip: {
                    pointFormatter: function() {
                        const value = Math.abs(this.y);
                        return `<span style="color:${this.color}">\u25CF</span> ${this.series.name}: <b>${value}</b><br/>`
                    }
                }
            }
        }
    }
    Object.assign(config, options);
    return config
}

function topCommentersByPosts(data) {
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

    let options = bar('By posts', '', 'Posts', 'Posts', categories, datapoints);
    options = {
        ...options,
        xAxis: {
            ...options.xAxis,
            opposite: true
        }
    }
    Object.assign(config, options);
    return config
}

export default {
    topCommentersByScore,
    topCommentersByPosts
}
