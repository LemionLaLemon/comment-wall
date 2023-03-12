const { NetlifyFormsAPI } = require("@netlify/forms");

const netlifyFormsAPI = new NetlifyFormsAPI({
  accessToken: process.env.NETLIFY_ACCESS_TOKEN,
});

exports.handler = async (event, context) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }
    const data = JSON.parse(event.body);
    const submission = await netlifyFormsAPI.createFormSubmission({
      formId: process.env.NETLIFY_FORM_ID,
      formData: data,
    });
    const submissions = await netlifyFormsAPI.listFormSubmissions({
      formId: process.env.NETLIFY_FORM_ID,
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
