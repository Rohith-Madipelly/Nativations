import * as Yup from "yup";
const ForgotSchema = Yup.object().shape({
    email: Yup.string().email().required(),

  });
export {ForgotSchema}