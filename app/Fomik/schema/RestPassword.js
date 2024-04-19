import * as Yup from 'yup';


// const RestPasswordschema = Yup.object().shape({
//   password: Yup.string()
//   .min(6, 'Password length is short')
//   .max(225, 'Password length is too long')
//   .required('New password is required')
//   .test(
//     'password-requirements',
//     'Password must meet the following criteria:\n- At least 1 uppercase letter\n- At least 1 lowercase letter\n- At least 1 digit\n- At least 1 special character',
//     (value) => {
//       return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/.test(value);
//     }
//   ),

//   ConfirmPassword: Yup.string()
//   .oneOf([Yup.ref('password'), null], 'Passwords must match')
//   // .test(
//   //   'password-requirements',
//   //   'Password must meet the following criteria:\n- At least 1 uppercase letter\n- At least 1 lowercase letter\n- At least 1 digit\n- At least 1 special character',
//   //   (value) => {
//   //     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/.test(value);
//   //   }
//   // )
//   .required('Confirm password is required'),


//   });

//   export { RestPasswordschema };  


const RestPasswordschema = Yup.object().shape({
  
  password: Yup.string()
  .min(6, 'Password length is short')
  .max(225, 'Password length is too long')
  .required('New password is required')
  .test(
    'password-requirements',
    'Password must meet the following criteria:\n- At least 1 uppercase letter\n- At least 1 lowercase letter\n- At least 1 digit\n- At least 1 special character',
    (value) => {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/.test(value);
    }
  ),


  New_Password: Yup.string()
  .min(6, 'Password length is short')
  .max(225, 'Password length is too long')
  .required('New password is required')
  .test(
    'password-requirements',
    'Password must meet the following criteria:\n- At least 1 uppercase letter\n- At least 1 lowercase letter\n- At least 1 digit\n- At least 1 special character',
    (value) => {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/.test(value);
    }
  ),



    New_Password1: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('New password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 digit'
    )
    .required('Confirm password is required'),
});

export { RestPasswordschema };