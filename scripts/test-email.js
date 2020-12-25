const EmailService = require('../server/mail/');

const msg = {
  to: 'rasmusjarnstrom@gmail.com',
  from: '<intra@akademen.com>',
  subject: 'Test',
  html: 'test',
};

EmailService.send(msg);
