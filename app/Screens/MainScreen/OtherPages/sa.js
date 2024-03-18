<CustomTextInput
    placeholder={'Your course Name'}
    asterisksymbol={true}
    boxWidth={'80%'}
    label={'course Name'}
    name='courseName'
    value={`${courseData.courseDuration || values.courseName} Days`}
    // leftIcon={<FontAwesome name="user" size={20} color="black" />}
    // bgColor='#e1f3f8'
    // bgColor="#B1B1B0"
    onChangeText={(e) => { handleChange("courseName")(e); seterrorFormAPI(); }}
    onBlur={handleBlur("courseName")}

    validate={handleBlur("courseName")}
    outlined
    borderColor={`${(errors.courseName && touched.courseName) || (errorFormAPI && errorFormAPI.courseNameForm) ? "red" : "#ccc"}`}
    errorMessage={`${(errors.courseName && touched.courseName) ? `${errors.courseName}` : (errorFormAPI && errorFormAPI.courseNameForm) ? `${errorFormAPI.courseNameForm}` : ``}`}
    // errorColor='magenta'
    editable={false}
/>