var AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: process.env.REGION });

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

exports.sendEmail = async ({
  emailAddress,
  subject,
  htmlTemplate,
  textTemplate,
}) => {
  console.log("Adderss ", emailAddress);
  var params = {
    Destination: {
      ToAddresses: emailAddress,
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: htmlTemplate,
        },
        Text: {
          Charset: "UTF-8",
          Data: textTemplate,
        },
      },

      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: "ramthapa9221@gmail.com",
  };

  // Create the promise and SES service object
  const emailReponse = await ses.sendEmail(params).promise();

  return emailReponse;
};
