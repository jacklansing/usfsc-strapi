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
          id: 'Posts.get.error.ratelimit',
          message: 'Too many requests, please try again in a minute.',
        },
      ],
    },
  ];

  return lazyRateLimit.RateLimit.middleware({
    interval: 1 * 60 * 1000,
    max: 20,
    prefixKey: `${ctx.request.path}:${ctx.request.ip}`,
    message,
  })(ctx, next);
};
