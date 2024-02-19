import { StyleSheet, Text, View } from 'react-native';
import AuthComponent from './AuthComponent';
import CustomButton from '../../Components/UI/Button/ButtonC1';

export default function Onboard() {
    return (
        <AuthComponent NameUnderLogo={"Let’s Onboard"} titleUnder={"Sign in to the app using any of given login  types for better experience"} screenName={""}>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CustomButton onPress={() => { console.log(" Sign in with Google") }} icon={"eye"}> Sign in with Google</CustomButton>
                <CustomButton onPress={() => { console.log(" Sign in with Email") }} icon={"mail"} style={{}}>Sign in with Email</CustomButton>
                <View style={{ width: '65%', textAlign: 'center' }}>
                    <Text style={[styles.paragraphy, { marginTop: 30, textAlign: 'center', color: '#2E0366', fontWeight: '400' }]}>By Signing in you are agreeing to our
                        Terms of Use and <Text style={styles.underline}>Privacy Policy</Text></Text>

                </View>
            </View>
        </AuthComponent>
    );
}

const styles = StyleSheet.create({


    paragraphy: {
        // fontFamily: 'Jost',
        fontSize: 14,
        fontWeight: '300',
    },
    underline: {
        textDecorationLine: 'underline',
    }

})