import * as Yup from 'yup';


const RestPasswordschema = Yup.object().shape({
  password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('New password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 digit'
      ),
     
      ConfirmPassword: Yup.string()
      .oneOf([Yup.ref('New_password'), null], 'Passwords must match')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 digit'
      )
      .required('Confirm password is required'),
  });
  
  export { RestPasswordschema };  