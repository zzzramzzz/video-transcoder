exports.notificationTemplate = () => {
  const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Notification - Video Processed </title>
        </head>
        <body>
       Your video has been successfully converted to mp4 format.
         {{url}}
        </body>
        </html>`;

  return html;
};

exports.notificationTemplateText = (url) => {
  const textEmail = `
   Your video has been successfully converted to mp4 formtat.
   ${url}
`;
  return textEmail;
};
