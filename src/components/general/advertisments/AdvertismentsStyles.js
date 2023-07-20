import { StyleSheet, } from 'react-native';
import { screenWidth } from '../../../utils/Dimensions';

export const styles = StyleSheet.create({
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
})