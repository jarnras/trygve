const deleteSignup = require('./deleteSignup.js');
const sendEmailToQueue = require('../../../signup/hooks/sendEmailToQueue');
const hooks = require('feathers-hooks-common');
const { authenticate } = require('@feathersjs/authentication');

exports.before = {
  all: [authenticate('jwt')],
  find: [hooks.disallow('external')],
  get: [hooks.disallow('external')],
  create: [hooks.disallow('external')],
  update: [hooks.disallow('external')],
  patch: [hooks.disallow('external')],
  remove: [deleteSignup(), sendEmailToQueue()],

};

exports.after = {};
