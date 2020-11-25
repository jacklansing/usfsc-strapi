const lazyRateLimit = {
  get RateLimit() {
    return require('koa2-ratelimit').RateLimit;
  },
};

module.exports = async (ctx, next) => {
  const message = [
    {
      messages: [
        {
          id: 'Member.app.error.ratelimit',
          message: 'Too many attempts, please try again in a minute.',
        },
      ],
    },
  ];

  return lazyRateLimit.RateLimit.middleware({
    interval: 1 * 60 * 1000,
    max: 5,
    prefixKey: `${ctx.request.path}:${ctx.request.ip}`,
    message,
  })(ctx, next);
};
