import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const categoryImgWidth = screenWidth/3-10;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 28,
      },
      pincode: {
        color:'#33056F',
        fontSize:15,
        height: 35,
        fontWeight: '700',
      },
      pincodePressed: {
        backgroundColor:"#fff",
        color:"#33056F",
        fontSize:15,
        height: 35,
      },
      cardTitle: {
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center',
        width: categoryImgWidth,
      },
      itemContainer: {
        backgroundColor: 'gray',
        borderRadius: 5,
        padding: 10,
        width: Dimensions.get('window').width,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
      },
      carouselContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        width: screenWidth,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
      },
      carouselImage: {
        width: screenWidth,
        height: screenWidth/3,
      },
})