import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from 'vee-validate'
import {
  required,
  min,
  max,
  email,
  confirmed,
  alpha_spaces as alphaSpaces,
  min_value as minValue,
  max_value as maxValue,
  not_one_of as excluded
} from '@vee-validate/rules'
export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('email', email)
    defineRule('required', required)
    defineRule('tos', required)
    defineRule('min_value', minValue)
    defineRule('max_value', maxValue)
    defineRule('passwords_mismatch', confirmed)
    defineRule('excluded', excluded)
    defineRule('country_excluded', excluded)
    defineRule('alpha_spaces', alphaSpaces)
    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `the field ${ctx.field} is required`,
          min: `the field ${ctx.field} is too short`,
          max: `the field ${ctx.field} is too long`,
          alpha_spaces: `the field ${ctx.field} may only the alphabetical character`,
          email: `the field ${ctx.field} must be valid email`,
          min_value: `the field ${ctx.field} is too low`,
          max_value: `the field ${ctx.field} is too high`,
          excluded: `you are not allowed to use this value for the field ${ctx.field}`,
          country_excluded: `Due the restrictions we do not accept user from this location,`,
          passwords_mismatch: `the password dont match`,
          tos: `you must accept the Terms of Service `
        }
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `the field ${ctx.field} is invalid`
        return message
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true
    })
  }
}
