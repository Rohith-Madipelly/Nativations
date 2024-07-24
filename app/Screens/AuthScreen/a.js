<CustomTextInput
    boxWidth={'80%'}
    placeholder={'Enter new password'}
    label={'New password'}
    name='Password'
    value={values.password}
    leftIcon={<Entypo name="lock" size={20} color="black" />}
    // bgColor='#e1f3f8'


    onChangeText={(e) => { handleChange("password")(e); seterrorFormAPI(); setShow({ ...setShow, password: false }); }}
    onBlur={handleBlur("password")}

    rightIcon={<Pressable onPress={() => setShow({ ...setShow, password: !show?.password })}>

        {!show?.password ? (
            <Entypo name="eye-with-line" size={20} color="black" />) : (

            <Entypo name="eye" size={20} color="black" />)
        }

    </Pressable>
    }

    secure={!show?.password} //default to true
    validate={handleBlur("password")}
    borderColor={`${(errors.password && touched.password) || (errorFormAPI && errorFormAPI.PasswordForm) ? "red" : "#ccc"}`}
    errorMessage={`${(errors.password && touched.password) ? `${errors.password}` : (errorFormAPI && errorFormAPI.PasswordForm) ? `${errorFormAPI.PasswordForm}` : ``}`}
    // errorColor='magenta'
    outlined
/>