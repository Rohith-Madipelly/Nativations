import * as Yup from "yup";

const OTPSchema = Yup.object().shape({

    otp: Yup.string()
      .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
      // .max(6,"vdfs")
      .required("OTP is required"),
  });
export { OTPSchema };
