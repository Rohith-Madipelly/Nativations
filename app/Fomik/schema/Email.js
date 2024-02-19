import * as Yup from "yup";
const Email = Yup.object().shape({
  email: Yup.string().email().required("Email is a Required Field "),
});
export { Email }
