const { sendEmail } = require("../utils/email");
const mustache = require("mustache");

const {
  notificationTemplate,
  notificationTemplateText,
} = require("./../email-template/notification-template");

module.exports.main = async (event) => {
  console.log(event.Records[0].Sns, "check event");
  const message = JSON.parse(event.Records[0].Sns.Message);
  const topicArn = event.Records[0].Sns.TopicArn;

  if (topicArn.includes("success_transcoder")) {
    const key = message.outputs[0].key;

    let newKey = key.replace("_at_the_rate_", "@");
    const email = newKey.split("/")[0];

    const url = "https://transcoder-bucket-dec.s3.amazonaws.com/" + key;
    await sendEmailNotification({ email, url });
  }
};

//send email function
async function sendEmailNotification(data) {
  const content = {
    url: data.url,
  };
  const viewHtml = await notificationTemplate();
  const viewText = await notificationTemplateText(content.url);

  const output = mustache.render(viewHtml, content);
  const subject = "Notification from Video conversion portal.";

  await sendEmail({
    emailAddress: [data.email],
    subject,
    htmlTemplate: output,
    textTemplate: viewText,
  });
}
