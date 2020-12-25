const AWS = require("aws-sdk"),
  transcoder = new AWS.ElasticTranscoder({
    apiVersion: "2012-09-25",
    region: "us-east-1",
  });
module.exports.main = async (event) => {
  let fileName = event.Records[0].s3.object.key;

  const file = fileName.split("/");

  try {
    const jobResponse = await transcoder
      .createJob({
        PipelineId: process.env.PIPELINE_ID,
        Input: {
          Key: fileName,
        },
        Output: {
          Key:
            file[0] +
            "/" +
            file[1].substr(0, file[1].lastIndexOf(".")) +
            Date.now() +
            ".mp4",
          ThumbnailPattern: "",
          PresetId: "1351620000001-100180",
          Rotate: "auto",
        },
      })
      .promise();
    console.log(jobResponse, "check job response");
  } catch (ex) {
    console.log(ex, "check ex");
  }
};
