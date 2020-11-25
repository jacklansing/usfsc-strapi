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

    let body = ctx.request.body;
    for (const key in body) {
      // At this time, updates should only ever be made to these two fields.
      if (key !== 'payment_received' && key !== 'application_reviewed') {
        return {
          message: 'unauthorized',
        };
      }
    }

    if (
      body.payment_received === true &&
      !ctx.header['confirm-payment-secret']
    ) {
      console.error(
        'Payment confirmation was attempted without payment secret',
        body,
      );
      return;
    }

    if (
      ctx.header['confirm-payment-secret'] &&
      ctx.header['confirm-payment-secret'] !==
        process.env.CONFIRM_PAYMENT_SECRET
    ) {
      console.error('Payment confirmation was attempted with invalid secret');
      return;
    }

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

      if (body.application_reviewed === true) {
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

    let body = ctx.request.body;

    if (
      body.payment_received === true &&
      !ctx.header['confirm-payment-secret']
    ) {
      console.error(
        'Payment confirmation was attempted without payment secret',
        body,
      );
      return;
    }

    if (
      ctx.header['confirm-payment-secret'] &&
      ctx.header['confirm-payment-secret'] !==
        process.env.CONFIRM_PAYMENT_SECRET
    ) {
      console.error('Payment confirmation was attempted with invalid secret');
      return;
    }

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
