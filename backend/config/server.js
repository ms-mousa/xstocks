module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'ccdbae0c544dbfa8273c38e5734263bd'),
    },
  },
  cron: {
    enabled: false
  }
});
