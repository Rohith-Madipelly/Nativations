import * as Yup from "yup";
const loginSchema = Yup.object().shape({
  // email: Yup.string().email().required("Email is a Required Field "),
  // emailorPhoneNumber: Yup.string().email("Invalid email format").phone.required("Email or Phone Number is a Required Field "),
  emailorPhoneNumber: Yup.string()
  .test('is-email-or-phone', 'Invalid email or phone number format', value => {
    // Check if the input is a valid email or a valid phone number
    return Yup.string()
      .email()
      .isValidSync(value) || /^[0-9]{10}$/.test(value);
  })
  .required("Email or phone number is a required field"),




  password: Yup.string()
  .min(8, "Password length is short")
  .max(225, "Password length is too Long")
  .required("Password is a required field")

  .test(
    "password-requirements",
    "Password must meet the following criteria:\n- At least 1 uppercase letter\n- At least 1 lowercase letter\n- At least 1 digit\n- At least 1 special character",
    (value) => {
      // Password validation logic here (using a regular expression or other methods)
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/.test(value);
    }
  )

  





});
export { loginSchema }






// import * as Yup from "yup";

// const TestingPage = Yup.object().shape({

//   email: Yup.string().email().required("Email is a Required Field "),


//   password: Yup.string()
//     .min(6, "Password Length is short")
//     .max(225, "Password Length is too Long")
//     .required("Password is a Required Field")

//     .test(
//       "password-requirements",
//       "Password must contain at least:\n1 uppercase letter,\n1 lowercase letter, and\n1 digit",
//       (value) => {
//         // Password validation logic here (using a regular expression or other methods)
//         return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value);
//       }
//     )
// });
// export { TestingPage }



// import * as Yup from "yup";
// const loginSchema = Yup.object().shape({
//   email: Yup.string().email().required("Email is a Required Field"),
//   password: Yup.string()
//     .min(6, "Password Length is short")
//     .max(225, "Password Length is too Long")
//     .required("Password is a Required Field")
//     // .matches(
//     //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
//     //   "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 digit"
//     // )
//     .test(
//       "password-requirements",
//       "Password must contain at least:\n1 uppercase letter,\n1 lowercase letter, and\n1 digit",
//       (value) => {
//         // Password validation logic here (using a regular expression or other methods)
//         return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value);
//       }
//     )
// });
// export { loginSchema }