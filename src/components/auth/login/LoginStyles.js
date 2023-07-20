import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 28,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' if you want to stretch the image
  },
  imageOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  headingText: {
    color: '#f5f5f5',
    textAlign: 'center',
    // fontFamily: 'Pacifico-Regular',
    // fontFamily: 'KaushanScript-Regular',
    // fontFamily: 'BreeSerif-Regular',
    fontFamily: 'Amaranth-Regular',
    // fontFamily: 'Amaranth-Bold',
    fontSize: 40,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    height: 60,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 7,
  },
  loginButtonContainer: {
    width: '80%',
    height: 60,
  },
  loginButtonTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  buttonContainer: {
    width: '100%',
    height: '100%',
    backgroundColor:'pink',
    padding: 0,
    margin: 0,
    borderRadius: 7,
  },
  loginButton: {
    backgroundColor: '#F37130',
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0,
    borderRadius: 7,
  },
  bottomSheetContainer: {
    // backgroundColor: 'red',
  },
  verifyOTPContainer: {
    backgroundColor: 'white',
    height:350,
    padding: 10,
  },
  verificationHeading: {
    color: '#F37130',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
    marginTop: 10,
  },
  verifyOTPText: {
    fontWeight: '700',
    opacity: 0.6,
    textAlign: 'center',
    marginTop: 20,
  },
  verificationNumber: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  verificationNumberText: {
    fontSize: 16,
    fontWeight: '700',
  },
  submitButtonContainer: {
    // width: '80%',
    height: 60,
    justifyContent:'center',
    alignItems:'center',
    marginTop: 10,
  },
  submitButton: {
    width:'90%',
  },
});
