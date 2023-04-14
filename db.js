const elasticsearch = require('elasticsearch');
const config = require('config');

const elasticClient = new elasticsearch.Client({
    host: config.elasticsearch.url + "" + config.elasticsearch.port
    // requestTimeout: 6 * 350 * 25000,
    // requestTimeout: Infinity,
    // keepAlive: false
    // log: 'debug',
})

module.exports = elasticClient