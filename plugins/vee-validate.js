import { defineRule, configure } from 'vee-validate';
import { required, email, min, confirmed } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import en from '@vee-validate/i18n/dist/locale/en.json';

// Define validation rules
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('confirmed', confirmed);

// Configure VeeValidate
configure({
  generateMessage: localize({ en }), // Load English locale
  validateOnInput: true // Validate on input
});
