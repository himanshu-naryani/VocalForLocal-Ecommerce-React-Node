let yup = require('yup');

export const emailSchema = yup.object().shape({
  email: yup.string().email().max(25),
});

