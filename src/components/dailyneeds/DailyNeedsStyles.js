import { StyleSheet, } from 'react-native';
import { screenWidth, categoryImgWidth } from '../../utils/Dimensions';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E7D6FD',
      },
      carouselContainer: {
        backgroundColor: 'white',
        // borderRadius: 8,
        width: screenWidth,
        height: 120,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
      },
      image: {
        width: screenWidth,
        height: 120,
      },
      cardTitle: {
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center',
        width: categoryImgWidth,
      },
})