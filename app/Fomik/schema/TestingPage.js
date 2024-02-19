import * as Yup from "yup";

const TestingPage = Yup.object().shape({

  email: Yup.string().email().required("Email is a Required Field "),


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
export { TestingPage }