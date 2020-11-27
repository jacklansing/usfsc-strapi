'use strict';
const { sanitizeEntity } = require('strapi-utils');
const sendPaymentReceivedEmail = require('../../../utils/sendPaymentReceivedEmail');
const sendApplicationReviewedEmail = require('../../../utils/sendApplicationReviewedEmail');
const sendNewApplicationEmail = require('../../../utils/sendNewApplicationEmail');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Update a record.
   *
   * @return {Object}
   */
  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    entity = await strapi.services['membership-applications'].update(
      { id },
      ctx.request.body,
    );

    if (ctx.header['confirm-payment-secret']) {
      // The header will let us know this update includes payment confirmation.
      // If this is the case, we'll send an email confirming payment.
      await sendPaymentReceivedEmail(entity);
    }

    if (ctx.request.body.application_reviewed === true) {
      // If the application status changes to reviewed, send confirmation email
      await sendApplicationReviewedEmail(entity);
    }

    return sanitizeEntity(entity, {
      model: strapi.models['membership-applications'],
    });
  },
  /**
   * Create a record.
   *
   * @return {Object}
   */
  async create(ctx) {
    let entity;

    entity = await strapi.services['membership-applications'].create(
      ctx.request.body,
    );
    await sendNewApplicationEmail(entity);
    return sanitizeEntity(entity, {
      model: strapi.models['membership-applications'],
    });
  },
};
