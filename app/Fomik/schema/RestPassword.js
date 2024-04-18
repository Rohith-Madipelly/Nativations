import * as Yup from 'yup';


const RestPasswordschema = Yup.object().shape({
  NewPassword: Yup.string()
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

ConfirmPassword: Yup.string()
  .oneOf([Yup.ref('NewPassword'), null], 'Passwords must match')
  .test(
    'password-requirements',
    'Password must meet the following criteria:\n- At least 1 uppercase letter\n- At least 1 lowercase letter\n- At least 1 digit\n- At least 1 special character',
    (value) => {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/.test(value);
    }
  )
  .required('Confirm password is required'),


  });
  
  export { RestPasswordschema };  