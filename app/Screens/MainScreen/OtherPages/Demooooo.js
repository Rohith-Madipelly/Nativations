<CustomPicker
    placeholder={'Refered By'}
    boxWidth={'60%'}
    label={'Practise Regularly'}
    name='Practise Regularly'

    onChangeText={(e) => { handleChange("ReferenceFrom")(e); seterrorFormAPI(); }}
    onBlur={handleBlur("ReferenceFrom")}

    validate={handleBlur("ReferenceFrom")}
    outlined
    borderColor={`${(errors.ReferenceFrom && touched.ReferenceFrom) || (errorFormAPI && errorFormAPI.ReferenceFromForm) ? "red" : "#ccc"}`}
    errorMessage={`${(errors.ReferenceFrom && touched.ReferenceFrom) ? `${errors.ReferenceFrom}` : (errorFormAPI && errorFormAPI.ReferenceFromForm) ? `${errorFormAPI.ReferenceFromForm}` : ``}`}
    // errorColor='magenta'
    value={values.ReferenceFrom}
    items={ReferenceFromData}
    onValueChange={(itemValue) => handleChange("ReferenceFrom")(itemValue)}
    containerStyle={{ width: 200 }}
    labelStyle={{ color: 'blue' }}
    // pickerStyle={{ backgroundColor: '#f0f0f0' }}
    // error="Please select a ReferenceFrom"
/>