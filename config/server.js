module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '14d205bbb661c1bdae4fd3c69d764445'),
    },
  },
  cron: {
    enabled: true
  }
});
