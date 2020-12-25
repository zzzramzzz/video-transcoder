const AWS = require("aws-sdk");
const {
  getErrorResponse,
  getSuccessResponse,
} = require("./../utils/responseUtil");
const s3 = new AWS.S3({
  signatureVersion: "v4",
});

module.exports.main = async (event) => {
  try {
    const query = event.queryStringParameters;
    if (query.code !== process.env.ACCESS_CODE)
      throw { statusCode: 403, message: "Unauthorized" };

    const userPath = query.email.replace("@", "_at_the_rate_");
    const bucketName = `test-artifacts-dev`;

    const s3Params = {
      Bucket: bucketName,
      Key: userPath + "/" + query.file_name,
      ContentType: query.file_type,
    };

    const responseData = await s3.getSignedUrlPromise("putObject", s3Params);

    console.log(responseData);
    return getSuccessResponse({ statusCode: 200, data: responseData });
  } catch (ex) {
    console.log(ex);
    return getErrorResponse({
      statusCode: ex.statusCode || 500,
      message: ex.message || ex,
    });
  }
};
