/**
 * Send confirmation to applicant that their application has been processed
 * @param {Object} entity - Member app entity from the db
 */
module.exports = async function (entity) {
  try {
    await strapi.plugins['email'].services.email.send({
      to: entity.email,
      from: 'no-reply@unclesamfsc.com',
      replyTo: 'unclesamtroy@gmail.com',
      subject: 'USFSC Membership Application Processed',
      text: `Great News! 
    Your US Figure Skating membership application has been processed. 
    You're all set! 
    If you have any additional questions, please feel free to let us know.
    
    Sincerely,
    Uncle Sam Figure Skating Club
    unclesamtroy@gmail.com`,
      html: `<h1>Great News!</h1>
    <p>Your US Figure Skating membership application has been processed.</p>
    <p>You're all set!</p>
    <p> If you have any additional questions, please feel free to let us know.</p>
    <br/>
    <p>Sincerely,</p>
    <p>Uncle Sam Figure Skating Club</p>
    <a href='mailto:unclesamtroy@gmail.com'>unclesamtroy@gmail.com</a>`,
    });
  } catch (e) {
    strapi.log.error(
      `Error sending application reviewed email to ${entity.email}`,
      e,
    );
  }
};
