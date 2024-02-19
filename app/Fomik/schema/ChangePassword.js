import * as Yup from 'yup';


const ChangePassword = Yup.object().shape({
  old_password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).+$/,
      `Password must have at least
      1 uppercase, 
      1 lowercase, 
      1 digit, and 
      include special characters`
    )
    .max(15, 'Password should not be more than 15 characters')
    .required('Old password is required'),

  New_Password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).+$/,
      'Password must have at least 1 uppercase, 1 lowercase, 1 digit, and may include special characters'
    )
    .max(15, 'Password should not be more than 15 characters')
    .required('New password is required'),
});

export { ChangePassword };
