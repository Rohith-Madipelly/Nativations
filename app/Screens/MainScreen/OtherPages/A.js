<CustomDropdown
boxWidth={'60%'}
label={"Gender"}
// placeholder={'Select'}
name='gender'
DropDownData={genderData}
DropDownHeigth={200}
value={values.gender}
// bgColor='#e1f3f8'
// onChange={setCategoriesData}

onChange={(e) => {
  handleChange("gender")(e);
  seterrorFormAPI();
}}
outlined
borderColor={`${(errors.gender && touched.gender) || (errorFormAPI && errorFormAPI.genderForm) ? "red" : "#ccc"}`}
errorMessage={`${(errors.gender && touched.gender) ? `${errors.gender}` : (errorFormAPI && errorFormAPI.genderForm) ? `${errorFormAPI.genderForm}` : ``}`}
// errorColor='magenta'
/>