module.exports = async (ctx, next) => {
  let body = ctx.request.body;

  if (body.payment_received === true && !ctx.header['confirm-payment-secret']) {
    strapi.log.info(
      'Payment confirmation was attempted without payment secret',
      body,
    );
    return ctx.unauthorized(`You're not allowed to perform this action!`);
  }

  if (
    ctx.header['confirm-payment-secret'] &&
    ctx.header['confirm-payment-secret'] !== process.env.CONFIRM_PAYMENT_SECRET
  ) {
    strapi.log.error('Payment confirmation was attempted with invalid secret');
    return ctx.unauthorized(`You're not allowed to perform this action!`);
  }
  return await next();
};
