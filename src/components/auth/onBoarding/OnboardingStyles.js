import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 28,
      },
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch' if you want to stretch the image
      },
      imageOverlay: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'rgba(0,0,0,0.85)',
      },
      submitButtonContainer: {
        // width: '80%',
        height: 50,
        justifyContent:'center',
        alignItems:'center',
        marginTop: 20,
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
})