import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../components/Pixel/index';
import {COLORS, Fonts} from '../../utils/index';

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 0.9,
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: hp(2.2),
    fontFamily: Fonts.FONTS.PoppinsBold,
    color: COLORS.black,
  },
  headerView: {
    flex: 0.1,
  },
  settingView: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp(6.5),
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: wp(4),
    borderRadius: wp(2),
    marginBottom: 15,
  },
  menuOption: {
    marginBottom: 15,
    backgroundColor: '#ffd6a5',
    borderRadius: 10,
    width: '100%',
    height: hp(6.5),
    alignItems: 'center',
    paddingHorizontal: wp(4),
    justifyContent: 'space-between',
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  closeButton: {
    marginBottom: 10,
    width: '100%',
    height: hp(6.5),
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: wp(4),
    justifyContent: 'space-between',
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  closeButtonText: {
    fontSize: hp(2.2),
    fontFamily: Fonts.FONTS.PoppinsBold,
    color: COLORS.white,
  },
  dropdownItemTxtStyle: {
    color: COLORS.black,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: hp(1.8),
    marginLeft: wp(2),
  },
  dropdownView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(4),
    borderBottomWidth: 0,
  },
  dropdown2BtnStyle2: {
    width: wp(37),
    height: hp(4.2),
    backgroundColor: COLORS.white,
    borderRadius: 7,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    alignItems: 'center',
    flexDirection: 'row',
  },
  dropdown2BtnTxtStyle: {
    color: COLORS.black,
    fontFamily: Fonts.FONTS.PoppinsRegular,
    fontSize: hp(1.8),
  },
  dropdown2DropdownStyle: {
    backgroundColor: COLORS.white,
    borderRadius: 4,
    height: hp(25),
    // borderRadius: 12,
  },
  dropdown2RowTxtStyle: {
    color: '#000',
    fontFamily: Fonts.FONTS.PoppinsMedium,
    fontSize: hp(1.8),
    textAlign: 'left',
    paddingLeft: wp(1),
  },
  colorBox: {
    width: wp(9),
    height: hp(3),
    marginHorizontal: wp(2),
  },
});

export default styles;
