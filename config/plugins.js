module.exports = ({ env }) => ({
  email: {
    provider: 'sendgrid',
    providerOptions: {
      apiKey: env('SENDGRID_API_KEY'),
    },
    settings: {
      defaultFrom: 'unclesamtroy@gmail.com',
      defaultReplyTo: 'unclesamtroy@gmail.com',
    },
  },
});
