import * as Yup from "yup";
const signupSchema = Yup.object().shape({
  Name: Yup.string()
    .trim()
    .required("First name is a required field")
    .matches(/^[a-zA-Z ]*$/, "Name must contain only letters and spaces"),
  
  
    Mobile_Number: Yup.string()
    .trim()
    .required("Mobile number is a required field")
    .matches(/^[0-9]{10}$/, "Mobile number must be a 10-digit number"),
 
 
 
    email: Yup.string().email("Enter a valid email").required("Email is a required field"),

  password: Yup.string()
  .min(8, "Password length is short")
  .max(225, "Password length is too long")
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
export { signupSchema }

