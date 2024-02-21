import * as Yup from "yup";
const signupSchema = Yup.object().shape({
  Name: Yup.string()
    .trim()
    .required("First Name is a Required Field")
    .matches(/^[a-zA-Z ]*$/, "Name must contain only letters and spaces"),
  Mobile_Number: Yup.string()
    .trim()
    .required("Mobile Number is a Required Field")
    .matches(/^[0-9]{10}$/, "Mobile Number must be a 10-digit number"),
  email: Yup.string().email().required("Email is a Required Field"),

  password: Yup.string()
  .min(6, "Password Length is short")
  .max(225, "Password Length is too Long")
  .required("Password is a Required Field")

  .test(
    "password-requirements",
    "Password must contain at least:\n1 uppercase letter,\n1 lowercase letter, and\n1 digit",
    (value) => {
      // Password validation logic here (using a regular expression or other methods)
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value);
    }
  )

});
export { signupSchema }

