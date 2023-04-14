const config = require("config");
const elastic_client = require("../db");

const indexName = config.elasticsearch.elasticsearchIndices.STUDENTS.index;
const indexType = config.elasticsearch.elasticsearchIndices.STUDENTS.type;

exports.getEachIndicesData = function (req, res, next) {
  elastic_client
    .search({
      index: req.params["index"],
      body: {
        from: 0,
        size: 10000,
        query: {
          match_all: {},
        },
      },
    })
    .then(
      function (response) {
        let hits = response.hits.hits;
        res.status(200).send(hits);
      },
      function (error) {
        console.trace(error.message);
      }
    )
    .catch((err) => {
      console.log("Elasticsearch ERROR - data not fetched");
    });
};

exports.getEachIndicesSingleRecord = function (req, res, next) {
  elastic_client
    .search({
      index: indexName,
      type: indexType,
      body: {
        query: {
          match: { student_id: req.body.student_id },
        },
      },
    })
    .then(
      function (response) {
        let hits = response.hits.hits;
        res.status(200).send(hits);
      },
      function (error) {
        console.trace(error.message);
      }
    )
    .catch((err) => {
      console.log("Elasticsearch ERROR - data not fetched");
    });
};

exports.getRepeatedFieldIndicesData = function (req, res, next) {
  elastic_client
    .search({
      index: indexName,
      type: indexType,
      body: {
        aggs: {
          count: {
            terms: {
              field: "dept.keyword",
              size: 100,
            },
          },
        },
      },
    })
    .then(
      function (response) {
        let hits = response;
        res.status(200).send(hits);
      },
      function (error) {
        console.trace(error.message);
      }
    )
    .catch((err) => {
      console.log("Elasticsearch ERROR - data not fetched");
    });
};
