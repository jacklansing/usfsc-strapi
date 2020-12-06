module.exports = {
  settings: {
    cors: {
      origin:
        process.env.NODE_ENV === 'production'
          ? ['https://api.unclesamfsc.com', 'https://unclesamfsc.com']
          : [
              'http://localhost:1337',
              'https://api.unclesamfsc.com',
              'https://unclesamfsc.com',
            ],
    },
  },
};
