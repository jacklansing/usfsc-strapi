'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
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

    if (!ctx.header['confirm-payment-secret']) {
      console.error(
        'Update application was attempted without payment secret',
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
