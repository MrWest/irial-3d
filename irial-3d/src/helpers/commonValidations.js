import { date, email as emailFunc, format, length, numericality, required } from 'redux-form-validators';
// import log from '../logger';

const stateValidation = country =>
  ['US', 'USA'].includes(country)
    ? [
        format({
          with: /^((A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/i,
          message: { defaultMessage: 'Must be an US state' }
        })
      ]
    : [required({ msg: 'Required' })];

const phoneValidation = country => (country === 'US' ? [] : [required({ msg: 'Required' })]);

const zipValidation = country =>
  ['US', 'USA'].includes(country)
    ? [
        required({ msg: 'Required' }),
        format({
          with: /^\d{5}(-\d{4})?$/i,
          message: { defaultMessage: 'Must be 5 or 9 digits. Ex: 54321, 98765-4321' }
        })
      ]
    : [required({ msg: 'Required' })];

const runFieldValidations = (fieldsToValidate, values, validations) => {
  const errors = {};
  if (fieldsToValidate) {
    fieldsToValidate.forEach(field => {
      const fieldValue = values[field];
      const fieldValidations = validations(field, values);
      const error = fieldValidations.map(fv => fv(fieldValue, values)).find(x => x);
      if (error) errors[field] = error;
    });
  }
  // log.debug('runFieldValidations, fieldsToValidate:', fieldsToValidate, 'values:', values, 'errors:', errors);
  return errors;
};

// based, but not exactly, on the one from  https://www.hanselman.com/blog/InternationalizedRegularExpressions.aspx
const nameRegex = /^[A-Za-z-'.ÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜŸäëïöüŸçÇŒœßØøÅåÆæÞþÐð ]+$/i;

const fieldValidation = (field, values) => {
  switch (field) {
    case 'account_type':
      return [required({ msg: 'Please, provide a valid account type' })];

    case 'amount':
      return [
        required({ msg: 'Required' }),
        numericality({
          int: true,
          '>=': 50,
          msg: { greaterThanOrEqualTo: 'Must be at least 50 swag packs' }
        })
      ];

    case 'billing_address1':
    case 'company':
    case 'ccname':
    case 'cvc':
    case 'how_do_you_plan_to_use_swag_packs':
    case 'shipping_address1':
    case 'name_on_account':
    case 'routing_number':
    case 'account_number':
      return [required({ msg: 'Required' }), length({ max: 100 })];

    case 'billing_city':
    case 'first_name':
    case 'last_name':
    case 'name':
    case 'shipping_city':
    case 'shipping_country':
      return [
        required({ msg: 'Required' }),
        length({ max: 100 }),
        format({
          with: nameRegex,
          message: { defaultMessage: 'Letters only' }
        })
      ];

    case 'billing_state':
      return stateValidation(values.billing_country);

    case 'billing_zip':
      return zipValidation(values.billing_country);

    case 'budget':
      return [
        required({ msg: 'Required' }),
        numericality({
          int: true,
          '>': 0
        })
      ];

    case 'canumberc':
      return [required({ msg: 'Please, provide a valid account number' })];

    case 'ccnumber':
      return [required({ msg: 'Please, provide a payment method' })];

    case 'comments':
    case 'title':
      return [length({ max: 255 })];

    case 'date':
      return [
        date({
          format: 'mm/dd/yyyy',
          '>': 'today',
          allowBlank: true
        })
      ];

    case 'email':
      return [required({ msg: 'Required' }), emailFunc()];

    case 'exdate':
      return [
        required({ msg: 'Please, provide a valid credit card expiration' }),
        date({
          format: 'mm/yy',
          '>': 'today',
          msg: 'date is invalid'
        })
      ];

    case 'message':
    case 'subject':
      return [required(), length({ min: 3 })];

    case 'naccount':
      return [required({ msg: 'Please, provide a valid name for the account' })];

    case 'phone_number':
      return phoneValidation(values.shipping_country);

    case 'rnumber':
      return [required({ msg: 'Please, provide a valid account routing number' })];

    case 'shipping_state':
      return stateValidation(values.shipping_country);

    case 'shipping_international_state':
      return values.shipping_country !== 'US' ? [required({ msg: 'Required' })] : [];

    case 'shipping_zip':
      return zipValidation(values.shipping_country);

    case 'size':
      return [length({ max: 3 })];

    default:
      return undefined;
  }
};

// Don't use the following functions, they are being/should be replaced by the above ones
const commonValidate = (values, validations) => {
  const errors = {};
  Object.keys(validations).forEach(field => {
    const value = values[field];
    errors[field] = validations[field].map(validateField => validateField(value, values)).find(x => x);
  });
  // log.debug('commonValidate errors:', errors);
  return errors;
};

const normalizer = (field, input, values) => {
  const output = input;
  switch (field) {
    case 'first_name':
    case 'last_name':
      output[field] = [
        required({ msg: 'Required' }),
        length({ min: 3 }),
        format({
          with: /^[a-zA-Z\s]*$/i,
          message: { defaultMessage: 'Letters only' }
        })
      ];
      break;
    case 'email':
      output[field] = [
        required({ msg: 'Required' }),
        emailFunc(),
        format({
          with: /^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/,
          message: { defaultMessage: 'Must use corporate email address' }
        })
      ];
      break;
    case 'phone_number':
    case 'company':
    case 'billing_address1':
      output[field] = [required({ msg: 'Required' })];
      break;
    case 'billing_city':
    case 'billing_state':
    case 'shipping_address1':
      output[field] = [required({ msg: 'Required' })];
      break;
    case 'shipping_city':
    case 'shipping_state':
      output[field] = [
        required({ msg: 'Required' }),
        format({
          with: nameRegex,
          message: { defaultMessage: 'Letters only' }
        })
      ];
      break;
    case 'billing_zip':
      output[field] = zipValidation(values.billing_country);
      break;
    case 'shipping_zip':
      output[field] = zipValidation(values.shipping_country);
      break;
    default:
      break;
  }

  return output;
};

const createValidations = (values, exclude = []) => {
  const fields = [
    'first_name',
    'last_name',
    'email',
    'phone_number',
    'company',
    'billing_address1',
    'billing_city',
    'billing_state',
    'shipping_address1',
    'shipping_city',
    'shipping_state',
    'billing_zip',
    'shipping_zip'
  ];
  exclude.forEach(field => delete fields[fields.indexOf(field)]);
  let output = {};
  fields.forEach(field => {
    output = normalizer(field, output, values);
  });
  return output;
};

// Don't use the last two exported functions (commonValidate, createValidations), see previous comment
export { fieldValidation, runFieldValidations, nameRegex, commonValidate, createValidations };
