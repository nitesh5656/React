import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7D6FD",
    // paddingTop: 28,
  },
  headerContainer: {
    backgroundColor: "#33056F",
    borderBottomColor: "transparent",
    height: 100,
  },
  logo: {
    width: 200,
    height: 80,
  },
  footerContainer: {
    width: screenWidth,
    // height: '100%',
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems:'center',
    backgroundColor: 'red',
    margin: 0,
    padding: 0,
  },
});