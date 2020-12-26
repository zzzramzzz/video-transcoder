const AWS = require("aws-sdk");
const {
  getErrorResponse,
  getSuccessResponse,
} = require("../utils/responseUtil");
const s3 = new AWS.S3({
  signatureVersion: "v4",
});

module.exports.main = async (event) => {
  try {
    var bucketParams = {
      Bucket: "transcoder-bucket-dec",
    };

    let responseData = await s3.listObjects(bucketParams).promise();

    const keys = responseData.Contents.map((ele) => ele.Key);

    const baseUrl = `https://transcoder-bucket-dec.s3.amazonaws.com/`;
    return getSuccessResponse({ statusCode: 200, data: { keys, baseUrl } });
  } catch (ex) {
    console.log(ex);
    return getErrorResponse({
      statusCode: ex.statusCode || 500,
      message: ex.message || ex,
    });
  }
};
