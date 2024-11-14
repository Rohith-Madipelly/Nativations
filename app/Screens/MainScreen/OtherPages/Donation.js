import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import BackIcons from '../../../assets/SVGS/Navigation/BackIcons';
import { TouchableOpacity } from 'react-native';
import { Colors } from '../../../Contants/Colors';
import LoadingImage from '../../../Components/ImageConatiners/LoadingImage';

const Donation = ({ navigation }) => {

  return (
    <ScrollView style={styles.container}>

      <View style={{ marginBottom: 10 }}>
        <Text style={{ textAlign: 'justify', fontSize: 14, fontFamily: 'Gabarito-VariableFont' }}>
          सत्य साधना केंद्र, नाल-बीकानेर व खेयादा-कोलकाता में सत्य साधना शिविरों के निःशुल्क संचालन, प्रबंधन और आवास, भोजन आदि
          मूलभूत सुविधाएँ आपकी सेवा और दान से संभव होती है | सत्य साधना जैसी
          महान विधि का लाभ पूरा विश्व ले सके इसके लिए आप भी योगदान दे सकते
          हैं, ताकि जन-जन को इसका लाभ मिल सकें | आपके द्वारा दिया गया हर
          छोटा-बड़ा दान उन समस्त साधक-साधिकाओं के मन की शुद्धि और स्व-
          स्वरूप की प्राप्ति में सहयोगी होता है जो इस ध्यान कला को सीख रहे हैं
          | अथवा सीखना चाहते हैं |
        </Text>
      </View>

      <View>
        <Text style={[styles.TextStyleA1, { color: '#030370', }]}>
          संस्थान की गतिविधियों को संचालित करने एवं रखरखाव खर्च के लिए
          12000/ प्रति वर्ष का सहयोग प्रार्थित है
        </Text>
      </View>


      <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
        <View style={{ flex: 0.5 }}>
          <Text style={styles.TextStyleA2}>Jain Yati Gurukul Sansthan</Text>
          <Text style={styles.TextStyleA3}>
            State Bank of India{"\n"}
            Gogagate Branch{"\n"}
            Rangadi Chowk,{"\n"}
            Bikaner-334001{"\n"}
            <Text style={{ fontWeight: 700, color: '#8B8BA9' }}>
              A/c No. 51012402958{"\n"}
            </Text>
            <Text style={{ fontWeight: 700, color: '#8B8BA9' }}>
              IFSC code: SBIN0031393{"\n"}
            </Text>
            MICR code: 334002032
          </Text>

          <LoadingImage
            source={require('../../../assets/image/Donation/Donation1.png')}
            style={{ width: '90%', height: 120, marginTop: 10 }}
            resizeMode={'contain'}
          />

        </View>
        <View style={{ flex: 0.5 }}>
          <Text style={styles.TextStyleA2}>Satya Sadhana Kendra</Text>
          <Text style={styles.TextStyleA3}>
            Union Bank{"\n"}
            Bhowanipur Branch{"\n"}
            227 A.J.C. Bose Road,{"\n"}
            Kolkata-700017{"\n"}
            <Text style={{ fontWeight: 700, color: '#8B8BA9' }}>
              A/c No. 520101199969521{"\n"}
            </Text>
            <Text style={{ fontWeight: 700, color: '#8B8BA9' }}>
              IFSC code: UBIN0907294{"\n"}
            </Text>
            MICR code: 700026157
          </Text>

          <LoadingImage
            source={require('../../../assets/image/Donation/Donation2.png')}
            style={{ width: '90%', height: 120, marginTop: 10 }}
            resizeMode={'contain'}
          />

        </View>
      </View>


      <View style={{ marginTop: 15 }}>


        <Text style={[styles.TextStyleA1, { color: '#030370', }]}>*80-G </Text>

        <Text style={styles.TextStyleA3}>
        Note:- Send your deposit slip to the WhatsApp 9829169991
        दान जमा करवाने के बाद अपना नाम, पता, PAN, अपना फोन नंबर और दान की स्लिप Whatsapp अवश्य करें |
          </Text>
      </View>




    </ScrollView>
  )
}

export default Donation

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: 'white', padding: 15
  },
  TextStyleA1: {
    textAlign: 'justify',
    fontSize: 14,
    fontFamily: 'Gabarito-VariableFont',
    width: '99%',
    color: Colors.gray800
  },
  TextStyleA2: {
    fontSize: 13,
    fontFamily: 'Gabarito-VariableFont',
    color: Colors.primaryColorApp,
    fontWeight: '400',
    width: '99%',
    textDecorationLine: 'underline',
    marginBottom: 7
  },
  TextStyleA3: {
    fontSize: 12,
    fontFamily: 'Gabarito-VariableFont',
    color: Colors.gray700,
    fontWeight: '500',
    width: '99%',
    lineHeight: 16.8,
  }

})