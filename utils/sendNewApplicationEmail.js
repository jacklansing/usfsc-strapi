/**
 * Send notification to club leaders that a new applicaiton has been received.
 * @param {Object} entity - Member app entity from the db
 */
module.exports = async function (entity) {
  const {
    email,
    primary_applicant_first_name,
    primary_applicant_last_name,
  } = entity;
  const applicant_name =
    primary_applicant_first_name + ' ' + primary_applicant_last_name;
  try {
    await strapi.plugins['email'].services.email.send({
      to: email,
      from: 'noreply@unclesamfsc.com',
      replyTo: 'unclesamtroy@gmail.com',
      subject: `New USFSC Member Application from ${applicant_name}`,
      text: `A new application has been submitted by ${applicant_name}! Please review the application as soon as possible.`,
      html: `<h1>A new application has been submitted by ${applicant_name}!</h1>
    <p>Please review the application as soon as possible.</p>`,
    });
  } catch (e) {
    strapi.log.error(
      `Error sending new application notification email to ${email}`,
      e,
    );
  }
};
