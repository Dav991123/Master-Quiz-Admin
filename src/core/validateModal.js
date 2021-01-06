export const  validateModal = {
    email: {
        requiredMessage: 'Email is required*',
        regExp:  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        warningMessage: 'Invalid email address'
    },

    password: {
      requiredMessage: 'Password is required*',
      regExp: /^.*(?=.{7,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
      warningMessage: 'Password has to be 7 characters including a number, a lowercase letter and an uppercase letter.'
    }
}
