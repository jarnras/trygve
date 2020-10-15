const hooks = require('feathers-hooks-common');
const createPassword = require('./hooks/createPassword');
const validateRegistration = require('./hooks/validateRegistration');
const sendEmail = require('./hooks/sendEmail');
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const config = require('../../../config/ilmomasiina.config.js');
const { authenticate } = require('@feathersjs/authentication');

let createHook;

if (config.adminRegistrationAllowed) {
  createHook = [validateRegistration(), createPassword(), hashPassword('password')];
} else {
  createHook = [authenticate('jwt'), createPassword(), hashPassword('password')];
}

exports.before = {
  all: [],
  find: [authenticate('jwt')],
  get: [authenticate('jwt')],
  create: createHook,
  update: [hooks.disallow('external'), hashPassword('password')],
  patch: [hooks.disallow('external'), hashPassword('password')],
  remove: [authenticate('jwt')],
};

exports.after = {
  all: [protect('password')],
  find: [],
  get: [],
  create: [sendEmail()],
  update: [],
  patch: [],
  remove: [],
};
