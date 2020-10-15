const { AuthenticationService, JWTStrategy, hooks } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const config = require('./../../../config/ilmomasiina.config.js');

module.exports = function () {
  const app = this;

  app.set('authentication', {
    secret: config.feathersAuthSecret,
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
      expiresIn: '1m',
    },
    local: {
      entity: 'user',
      usernameField: 'email',
      passwordField: 'password',
    },
  });

  const authService = new AuthenticationService(app);

  authService.register('jwt', new JWTStrategy());
  authService.register('local', new LocalStrategy());

  app.use('/api/authentication', authService);
};
