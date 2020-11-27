/**
 * Send confirmation to applicant that their application has been processed
 * @param {Object} entity - Member app entity from the db
 */
module.exports = async function (entity) {
  try {
    await strapi.plugins['email'].services.email.send({
      to: entity.email,
      from: 'noreply@unclesamfsc.com',
      replyTo: 'unclesamtroy@gmail.com',
      subject: 'USFSC Membership Application Processed',
      text: `Great News! 
    Your US Figure Skating membership application has been processed. 
    You're all set! 
    If you have any additional questions, please feel free to let us know.`,
      html: `<h1>Great News!</h1>
    <p>Your US Figure Skating membership application has been processed.</p>
    <p>You're all set!</p>
    <p> If you have any additional questions, please feel free to let us know.</p>`,
    });
  } catch (e) {
    strapi.log.error(
      `Error sending application reviewed email to ${entity.email}`,
      e,
    );
  }
};
