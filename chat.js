const { NetlifyFormsAPI } = require("@netlify/forms");

const netlifyFormsAPI = new NetlifyFormsAPI({
  accessToken: process.env.B8O2lUMG8KE0Rxu4NCkhiZLFaQ9kZ27ii51EK2echzE,
});

exports.handler = async (event, context) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }
    const data = JSON.parse(event.body);
    const submission = await netlifyFormsAPI.createFormSubmission({
      formId: process.env.640d2c0883d028000812403a,
      formData: data,
    });
    const submissions = await netlifyFormsAPI.listFormSubmissions({
      formId: process.env.640d2c0883d028000812403a,
      perPage: 100,
    });
    if (submissions.length > 5) {
      await netlifyFormsAPI.deleteFormSubmission({
        submissionId: submissions[0].id,
      });
    }
    return {
      statusCode: 200,
      body: JSON.stringify(submission),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString(),
    };
  }
};
