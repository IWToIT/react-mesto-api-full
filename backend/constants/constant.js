const NOT_FOUND = 'NotFound';
const CAST_ERROR = 'CastError';
const ERR_EMAILPASSWORD = 'Неправильные почта или пароль';
const ERR_VALIDATION = 'Validation failed';

const REGEX_URL = /https?:\/\/(www\.)?[-a-zA-Z0-9:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/;

const allowedCors = [
  'http://domainname.studentegor.nomoredomains.icu',
  'https://domainname.studentegor.nomoredomains.icu',
  'http://localhost:3000',
];

const badRequest = 400;
const notFound = 404;
const defaultErr = 500;
const admitErr = 403;
const emailErr = 450;
const dataErr = 401;
const repeatErr = 409;

module.exports = {
  NOT_FOUND,
  CAST_ERROR,
  defaultErr,
  badRequest,
  notFound,
  admitErr,
  emailErr,
  dataErr,
  REGEX_URL,
  ERR_EMAILPASSWORD,
  ERR_VALIDATION,
  repeatErr,
  allowedCors,
};
