module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 0000),
        database: env('DATABASE_NAME', 'db_name'),
        username: env('DATABASE_USERNAME', 'db_user'),
        password: env('DATABASE_PASSWORD', 'db_pass'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {},
    },
  },
});
