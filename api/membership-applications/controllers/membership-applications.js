'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
const sendPaymentReceivedEmail = require('../../../utils/sendPaymentReceivedEmail');
const sendApplicationReviewedEmail = require('../../../utils/sendApplicationReviewedEmail');
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
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services['membership-applications'].update(
        { id },
        data,
        {
          files,
        },
      );
    } else {
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

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services['membership-applications'].create(data, {
        files,
      });
    } else {
      entity = await strapi.services['membership-applications'].create(
        ctx.request.body,
      );
    }
    return sanitizeEntity(entity, {
      model: strapi.models['membership-applications'],
    });
  },
};
