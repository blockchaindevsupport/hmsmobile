import React, {useState, useRef, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Modal,
  Animated,
  Image,
} from 'react-native';
import {useTheme} from '../../utils/ThemeProvider';
import styles from './styles';
import Header from '../../components/Header';
import {useTranslation} from 'react-i18next';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../components/Pixel';
import headerLogo from '../../images/headerLogo.png';
import {BlurView} from '@react-native-community/blur';
import ChargeCategoriesList from '../../components/HospitalChargesComponent/ChargeCategoriesList';
import ChargesComponent from '../../components/HospitalChargesComponent/ChargesComponent';
import DoctorChargesList from '../../components/HospitalChargesComponent/DoctorChargesList';
import ItemCategoriesList from '../../components/InventoryComponent/ItemCategoriesList';
import ItemsList from '../../components/InventoryComponent/ItemsList';
import IssuedItemsList from '../../components/InventoryComponent/IssuedItemsList';
import ItemStocksList from '../../components/InventoryComponent/ItemStocksList';
import PathologyCategories from '../../components/PathologyComponent/PathologyCategories';
import PathologyParameter from '../../components/PathologyComponent/PathologyParameter';
import PathologyTest from '../../components/PathologyComponent/PathologyTest';
import PathologyUnit from '../../components/PathologyComponent/PathologyUnit';
import {onGetCommonApi} from '../../services/Api';
import SMSList from '../../components/SMSComponent/SMSList';

const allData = [
  {
    id: 1,
    chargeCategory: 'Consultation',
    description: 'N/A',
    chargeTime: 'Operation Theatre',
  },
  {
    id: 2,
    chargeCategory: 'Online Consulation',
    description: 'demo',
    chargeTime: 'Procedures',
  },
  {
    id: 3,
    chargeCategory: 'Fee',
    description: 'N/A',
    chargeTime: 'Investigations',
  },
  {
    id: 4,
    chargeCategory: 'Other',
    description: 'N/A',
    chargeTime: 'Others',
  },
  {
    id: 5,
    chargeCategory: 'op',
    description: 'N/A',
    chargeTime: 'Operation Theatre',
  },
];

const BloodDonorData = [
  {
    id: 1,
    code: '76571',
    chargeCategory: 'Consultation',
    chargeType: 'Operation Theatre',
    standard_charge: '$100.00',
  },
  {
    id: 2,
    code: '76572',
    chargeCategory: 'Online Consultation',
    chargeType: 'Procedures',
    standard_charge: '$1,000.00',
  },
  {
    id: 3,
    code: '76573',
    chargeCategory: 'Fee',
    chargeType: 'Investigations',
    standard_charge: '$343,442.00',
  },
  {
    id: 4,
    code: '76574',
    chargeCategory: 'Other',
    chargeType: 'Others',
    standard_charge: '$5,000.00',
  },
  {
    id: 5,
    code: '76575',
    chargeCategory: 'op',
    chargeType: 'Operation Theatre',
    standard_charge: '$5,000.00',
  },
];

const BloodIssueData = [
  {
    id: 1,
    name: 'Joey Tribiyani',
    mail: 'joey@gmail.com',
    standard_charge: '$600.00',
  },
  {
    id: 2,
    name: 'Monica Geller',
    mail: 'monica@gmail.com',
    standard_charge: '$600.00',
  },
  {
    id: 3,
    name: 'Ross Geller',
    mail: 'ross@gmail.com',
    standard_charge: '$500.00',
  },
  {
    id: 4,
    name: 'Monica Geller',
    mail: 'monica@gmail.com',
    standard_charge: '$500.00',
  },
  {
    id: 5,
    name: 'Ross Geller',
    mail: 'ross@gmail.com',
    standard_charge: '$400.00',
  },
];

export const SMSScreen = ({navigation}) => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const [searchAccount, setSearchAccount] = useState('');
  const [searchPayroll, setSearchPayroll] = useState('');
  const [searchUnit, setSearchUnit] = useState('');
  const [searchPharmacists, setSearchPharmacists] = useState('');
  const [optionModalView, setOptionModalView] = useState(false);
  const [selectedView, setSelectedView] = useState('SMS');
  const [pathologyCategories, setPathologyCategories] = useState([]);
  const [parameter, setParameter] = useState([]);
  const [unit, setUnit] = useState([]);
  const [test, setTest] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const animations = useRef(
    [0, 0, 0].map(() => new Animated.Value(300)),
  ).current;
  const opacities = useRef([0, 0, 0].map(() => new Animated.Value(0))).current;

  const toggleMenu = open => {
    const toValue = open ? 0 : 300; // For closing, move down
    const opacityValue = open ? 1 : 0; // For fading

    if (open) {
      // Start opening animations
      setOptionModalView(true); // Show modal first
      setTimeout(() => {
        Animated.stagger(
          150,
          animations.map((anim, index) =>
            Animated.parallel([
              Animated.timing(anim, {
                toValue,
                duration: 300,
                useNativeDriver: true,
              }),
              Animated.timing(opacities[index], {
                toValue: opacityValue,
                duration: 300,
                useNativeDriver: true,
              }),
            ]),
          ),
        ).start();
      }, 100);
    } else {
      // Start closing animations
      Animated.stagger(
        140,
        animations.map((anim, index) =>
          Animated.parallel([
            Animated.timing(anim, {
              toValue,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(opacities[index], {
              toValue: opacityValue,
              duration: 300,
              useNativeDriver: true,
            }),
          ]),
        ),
      ).start(() => {
        setOptionModalView(false); // Hide modal after animations complete
      });
    }
  };

  useEffect(() => {
    onGetPathologyCategoriesData();
  }, [searchAccount]);

  const onGetPathologyCategoriesData = async () => {
    try {
      const response = await onGetCommonApi(`pathology-category-get?search=${searchAccount}`);
      console.log('get Response:', response.data.data);
      if (response.data.flag === 1) {
        setPathologyCategories(response.data.data.items);
        setRefresh(!refresh);
      }
    } catch (err) {
      console.log('Error>>', err);
    }
  };

  useEffect(() => {
    onGetTestData();
  }, [searchPharmacists]);

  const onGetTestData = async () => {
    try {
      const response = await onGetCommonApi(`pathology-test-get?search=${searchPharmacists}`);
      console.log('get Response:', response.data.data);
      if (response.data.flag === 1) {
        setTest(response.data.data.items);
        setRefresh(!refresh);
      }
    } catch (err) {
      console.log('Error>>', err);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.lightColor}]}>
      <View style={styles.headerView}>
        <Header
          title={t('sms')}
          navigation={navigation}
          onPress={() => navigation.openDrawer()}
          moreButtonClick={() => toggleMenu(true)}
        />
      </View>
      <View style={styles.mainView}>
        {selectedView == 'SMS' ? (
          <SMSList
            searchBreak={searchAccount}
            setSearchBreak={setSearchAccount}
            allData={pathologyCategories}
            onGetData={onGetPathologyCategoriesData}
          />
        ) : (
          selectedView == 'Mail' && (
            <PathologyTest
              searchBreak={searchPharmacists}
              setSearchBreak={setSearchPharmacists}
              allData={test}
              onGetData={onGetTestData}
              category={pathologyCategories}
              parameter={parameter}
            />
          )
        )}
      </View>
      <Modal
        visible={optionModalView}
        transparent={true}
        animationType="fade"
        onRequestClose={() => toggleMenu(false)}>
        {/* Background blur */}
        <BlurView
          style={styles.absolute}
          blurType="light" // You can use 'light', 'dark', or 'extraDark' for the blur effect.
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />

        <View style={styles.mainModalView}>
          <View style={styles.menuContainer}>
            {['Logo', 'SMS', 'Mail'].map((option, index) => (
              <>
                {option == 'Logo' ? (
                  <Animated.View
                    key={index}
                    style={[
                      {
                        transform: [{translateY: animations[index]}],
                        opacity: opacities[index],
                        marginBottom: hp(1),
                      },
                    ]}>
                    <Image source={headerLogo} style={styles.headerLogoImage} />
                  </Animated.View>
                ) : (
                  <Animated.View
                    key={index}
                    style={[
                      styles.menuOption,
                      {
                        transform: [{translateY: animations[index]}],
                        opacity: opacities[index],
                        backgroundColor: theme.headerColor,
                      },
                    ]}>
                    <TouchableOpacity
                      style={styles.optionButton}
                      onPress={() => {
                        setSelectedView(option), toggleMenu(false);
                      }}>
                      <Text style={styles.menuItem}>{option}</Text>
                    </TouchableOpacity>
                  </Animated.View>
                )}
              </>
            ))}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => toggleMenu(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SMSScreen;
