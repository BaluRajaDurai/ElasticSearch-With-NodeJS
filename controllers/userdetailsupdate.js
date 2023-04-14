const config = require("config");
const elastic_client = require("../db");

const indexName = config.elasticsearch.elasticsearchIndices.STUDENTS.index;
const indexType = config.elasticsearch.elasticsearchIndices.STUDENTS.type;


exports.updateSingleData = function (req, res, next) {
  elastic_client
    .update({
      index: indexName,
      type: indexType,
      id: req.body.id,
      body: {
        doc: {
          student_id: req.body.student_id,
          age: req.body.age,
          dept: req.body.dept,
          skills: req.body.skills,
          leaves: req.body.leaves,
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
      console.log("Elasticsearch ERROR - data not updated");
    });
};
