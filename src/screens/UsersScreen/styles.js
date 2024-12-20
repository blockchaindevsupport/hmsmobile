import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../components/Pixel/index';
import {COLORS, Fonts} from '../../utils/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  headerView: {
    flex: 0.1,
    width: '100%',
  },
  textStyle: {
    fontSize: hp(2.8),
    color: COLORS.black,
    fontFamily: Fonts.FONTS.PoppinsBold,
  },
  mainView: {
    flex: 0.9,
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.white,
  },
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: hp(8),
  },
  tab: {
    alignItems: 'center',
    marginHorizontal: wp(2),
    height: hp(4.2),
    paddingHorizontal: wp(3),
    backgroundColor: COLORS.greyColor,
    borderRadius: 5,
    justifyContent: 'center',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: hp(2.2),
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsBold,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  closeButton: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    width: '90%',
  },
  closeButtonText: {
    textAlign: 'center',
    fontSize: hp(2),
    fontFamily: Fonts.FONTS.PoppinsBold,
    color: COLORS.white,
  },
  menuContainer: {
    alignItems: 'center',
    // backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    alignSelf: 'center',
  },
  menuOption: {
    marginBottom: 15,
    backgroundColor: '#ffd6a5',
    borderRadius: 10,
    width: '90%',
    height: hp(6.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionButton: {
    width: '79%',
    height: hp(6.4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItem: {
    textAlign: 'center',
    fontSize: hp(2.2),
    fontFamily: Fonts.FONTS.PoppinsBold,
    color: COLORS.black,
  },
  mainModalView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLogoImage: {
    width: wp(50),
    height: hp(12),
    resizeMode: 'contain',
  },
  nextView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default styles;
