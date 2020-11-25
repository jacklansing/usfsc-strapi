module.exports = async (ctx, next) => {
  let body = ctx.request.body;
  for (const key in body) {
    // At this time, updates should only ever be made to these two fields.
    if (key !== 'payment_received' && key !== 'application_reviewed') {
      return ctx.unauthorized(`You're not allowed to perform this action!`);
    }
  }
  return await next();
};
