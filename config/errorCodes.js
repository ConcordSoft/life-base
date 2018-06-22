module.exports.codes = {
  'BAD_REQUEST': {
    code: '400',
    message: 'Bad request'
  },
  'MISSING_PAYMENT_DATA': {
    code: '400',
    message: 'Missing payment data'
  },
  'NOT_AUTHENTICATED': {
    code: '401',
    message: 'Not Authenticated'
  },
  'FORBIDDEN': {
    code: '405',
    message: 'You are not authorized to access this URI'
  },
  'EXPIRED': {
    code: '403',
    message: 'Your session has expired, please re-login.'
  },
  'NOT_FOUND': {
    code: '404',
    message: 'Not found'
  },
  'NOT_ALLOWED': {
    code: '405',
    message: 'Not allowed'
  },
  'ALREADY_REGISTERED': {
    code: '406',
    message: 'Email already registered'
  },
  'LENGTH_REQUIRED': {
    code: '406',
    message: "Field can't be empty"
  },
  'DEVICE_ALREADY_REGISTERED': {
    code: '406',
    message: 'Device with provided serial number is already registered'
  },
  'INVALID_USERNAME_PASSWORD': {
    code: '409',
    message: 'Invalid username/password'
  },
  'INTERNAL_ERROR': {
    code: '500',
    message: 'Internal server error'
  },
  'MONGO_ERROR': {
    code: '500',
    message: 'Database error'
  },
  'INTERNAL_ERROR_SENDING_EMAIL': {
    code: '500',
    message: 'Internal server error occurred while sending email'
  },
  'BAD_ID_FORMAT' : {
    code: '500',
    message: 'Bad Id Format'
  }
};