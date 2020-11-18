'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  findOneBySlug: async ctx => {
    // const id = ctx.params.id;
    const { slug } = ctx.params;
    const entity = await strapi.services.posts.findOne({ slug });
    return sanitizeEntity(entity, { model: strapi.models.posts });
  },
};
