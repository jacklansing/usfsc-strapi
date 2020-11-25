/**
 * Send payment confirmation email via strapi email service
 * @param {Object} entity - Member app entity from the db
 */
module.exports = async function (entity) {
  try {
    await strapi.plugins['email'].services.email.send({
      to: entity.email,
      from: 'membership@unclesamfsc.com',
      replyTo: 'unclesamtroy@gmail.com',
      subject: 'USFSC Membership Application Payment Confirmation',
      text: `Success! 
    Your application has been submitted and payment approved. 
    You'll receive a follow-up email to notify you when the application has been processed.`,
      html: `<h1>Success!</h1>
    <p>Your application has been submitted and payment approved.</p>
    <p>You'll receive a follow-up email to notify you when the application has been processed.</p>`,
    });
  } catch (e) {
    strapi.log.error(`Error sending email to ${entity.email}`, e);
  }
};
