/**
 * Send payment confirmation email via strapi email service
 * @param {Object} entity - Member app entity from the db
 */
module.exports = async function (entity) {
  try {
    await strapi.plugins['email'].services.email.send({
      to: entity.email,
      from: 'no-reply@unclesamfsc.com',
      replyTo: 'unclesamtroy@gmail.com',
      subject: 'USFSC Membership Application Payment Confirmation',
      text: `Success! 
    Your application has been submitted and payment approved. 
    You'll receive a follow-up email to notify you when the application has been processed.
    
    Sincerely,
    Uncle Sam Figure Skating Club
    unclesamtroy@gmail.com`,
      html: `<h1>Success!</h1>
    <p>Your application has been submitted and payment approved.</p>
    <p>You'll receive a follow-up email to notify you when the application has been processed.</p>
    <br/>
    <p>Sincerely,</p>
    <p>Uncle Sam Figure Skating Club</p>
    <a href='mailto:unclesamtroy@gmail.com'>unclesamtroy@gmail.com</a>`,
    });
  } catch (e) {
    strapi.log.error(
      `Error sending payment received email to ${entity.email}`,
      e,
    );
  }
};
