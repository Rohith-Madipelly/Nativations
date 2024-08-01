import * as Yup from "yup";
const Email = Yup.object().shape({
  email: Yup.string().email("Email must be a valid email").required("Email is a Required Field xx"),
});
export { Email }
