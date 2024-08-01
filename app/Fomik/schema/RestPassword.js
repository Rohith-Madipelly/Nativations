import * as Yup from 'yup';

const RestPasswordschema = Yup.object().shape({
  NewPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).+$/,
      "Password must meet the following criteria:\n- At least 1 uppercase letter\n- At least 1 lowercase letter\n- At least 1 digit\n- At least 1 special character",

    )
    .max(15, 'Password should not be more than 15 characters')
    .required('New password is required'),

    ConfirmPassword: Yup.string()
    .oneOf([Yup.ref('NewPassword'), null], 'Passwords must match')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])(?=.*[^\w\d\s]).+$/,
    "Password must meet the following criteria:\n- At least 1 uppercase letter\n- At least 1 lowercase letter\n- At least 1 digit\n- At least 1 special character",
      
    )
    .max(15, 'Password should not be more than 15 characters')
    .required('Confirm password is required'),


});

export { RestPasswordschema };

