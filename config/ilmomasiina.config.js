const _ = require('lodash');

const config = {
  mysqlUser: process.env.MYSQL_USER,
  mysqlPassword: process.env.MYSQL_PASSWORD,
  mysqlDatabase: process.env.MYSQL_DATABASE,
  editTokenSalt: process.env.EDIT_TOKEN_SALT,
  mailFrom: process.env.MAIL_FROM,
  mailSmtpServer: process.env.MAIL_SMTP_SERVER,
  mailSmtpPort: process.env.MAIL_SMTP_PORT,
  mailSmtpUser: process.env.MAIL_SMTP_USER,
  mailSmtpPassword: process.env.MAIL_SMTP_PASSWORD,
  feathersAuthSecret: process.env.FEATHERS_AUTH_SECRET,
  baseUrl: process.env.BASE_URL,
  prefixUrl: process.env.PREFIX_URL || '',
  adminRegistrationAllowed:
  process.env.ADMIN_REGISTRATION_ALLOWED === 'true' || false,
  brandingMailFooterText: process.env.BRANDING_MAIL_FOOTER_TEXT,
  brandingMailFooterLink: `${process.env.BASE_URL}${process.env.PREFIX_URL ||
    ''}`,
  authenticationConfig: {
    secret: process.env.FEATHERS_AUTH_SECRET,
    path: 'api/authentication',
    service: 'api/users',
    entity: 'user',
    authStrategies: [
      'local',
      'jwt',
    ],
    jwtOptions: {
      header: { typ: 'access' },
      audience: 'http://localhost:3000',
      issuer: 'feathers',
      algorithm: 'HS256',
      expiresIn: '1d',
    },
    local: {
      entity: 'user',
      usernameField: 'email',
      passwordField: 'password',
    },
  },
};

_.forOwn(config, (value, key) => {
  if (!value) {
    console.error(
      `Missing .env variable: ${key}, please check /config/ilmomasiina.config.js`,
    );
  }
});

module.exports = config;
