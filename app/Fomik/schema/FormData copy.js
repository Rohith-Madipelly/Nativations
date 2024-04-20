import * as Yup from "yup";
const FormDataChecker = Yup.object().shape({

  inPastTwo: Yup.string(),
  inPresentTwo: Yup.string(),

  // working for Single
  // FitnessCertificate: Yup.string()
  //   .when('inPresentTwo', ([inPresentTwo], schema) => {
  //     console.log(inPresentTwo, "<> ")
  //     if (inPresentTwo === "true")
  //       return schema
  //         .required('Fitness certificate is required 123').oneOf(["Yes", "No"], "Invalid value for FitnessCertificate123")
  //     return
  //   }),


// Should Work with two
  FitnessCertificate: Yup.string()
  .when(['inPastTwo','inPresentTwo'], ([inPastTwo, inPresentTwo], schema) => {
    console.log(inPresentTwo, "<> ",inPastTwo)
    if (inPresentTwo === "Yes"||inPastTwo==="Yes")
      return schema
        .required('Fitness certificate is required 123').oneOf(["Yes", "No"], "Invalid value for FitnessCertificate123")
    return
  }),


});
export { FormDataChecker }
