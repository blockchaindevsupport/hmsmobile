import React, {useState, useRef} from 'react';
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
import AccountList from '../../components/BillingComponent/AccountList';
import PayrollList from '../../components/BillingComponent/PayrollList';
import InvoicesList from '../../components/BillingComponent/InvoicesList';
import ManualList from '../../components/BillingComponent/ManualList';
import BedTypeList from '../../components/BedComponent/BedTypeList';
import BedList from '../../components/BedComponent/BedList';
import BedAssignList from '../../components/BedComponent/BedAssignList';
import BloodBanksList from '../../components/BloodComponent/BloodBanksList';
import BloodDonorList from '../../components/BloodComponent/BloodDonorList';

const allData = [
  {
    id: 1,
    blood: 'O+',
    bag: 5,
  },
  {
    id: 2,
    blood: 'A+',
    bag: 2,
  },
  {
    id: 3,
    blood: 'B+',
    bag: 2,
  },
  {
    id: 4,
    blood: 'AB+',
    bag: 10,
  },
  {
    id: 5,
    blood: 'O-',
    bag: 12,
  },
];

const BloodDonorData = [
  {
    id: 1,
    name: 'joey Tribiyani',
    age: '48',
    gender: 'Male',
    blood_group: 'O+',
    date: '22:02:00\n2023-05-25',
  },
  {
    id: 2,
    name: 'Monica Geller',
    age: '43',
    gender: 'Female',
    blood_group: 'B+',
    date: '22:02:00\n2023-05-25',
  },
  {
    id: 3,
    name: 'joey Tribiyani',
    age: '49',
    gender: 'Male',
    blood_group: 'O+',
    date: '22:02:00\n2023-05-25',
  },
  {
    id: 4,
    name: 'joey Tribiyani',
    age: '45',
    gender: 'Female',
    blood_group: 'A-',
    date: '22:02:00\n2023-05-25',
  },
  {
    id: 5,
    name: 'joey Tribiyani',
    age: '41',
    gender: 'Female',
    blood_group: 'B-',
    date: '22:02:00\n2023-05-25',
  },
];

const BedAssignData = [
  {
    id: 1,
    invoice: 'N2JY0SK7',
    name: 'Joey Tribiyani',
    mail: 'joey@gmail.com',
    invoice_date: '26th May, 2024',
    bed: 'General ward',
    discharge: 'N/A',
    status: true,
  },
  {
    id: 2,
    invoice: 'N2JY0SK5',
    name: 'Monica Geller',
    mail: 'monica@gmail.com',
    invoice_date: '21th May, 2024',
    bed: 'VIP',
    discharge: 'N/A',
    status: true,
  },
  {
    id: 3,
    invoice: 'N2JY0SK0',
    name: 'Ross Geller',
    mail: 'ross@gmail.com',
    invoice_date: '20th Dec, 2023',
    bed: 'Delux',
    discharge: 'N/A',
    status: true,
  },
  {
    id: 4,
    invoice: 'N2JY0SL3',
    name: 'Monica Geller',
    mail: 'monica@gmail.com',
    invoice_date: '28th May, 2024',
    bed: 'General ward',
    discharge: 'N/A',
    status: true,
  },
  {
    id: 5,
    invoice: 'N2JY0SK8',
    name: 'Ross Geller',
    mail: 'ross@gmail.com',
    invoice_date: '24th May, 2024',
    bed: 'General ward',
    discharge: 'N/A',
    status: true,
  },
];

const ManualData = [
  {
    id: 1,
    name: 'Joey Tribiyani',
    mail: 'joey@gmail.com',
    approved: 'Approved',
    amount: '$1,500.00',
    status: 'Paid',
  },
  {
    id: 2,
    name: 'Monica Geller',
    mail: 'monica@gmail.com',
    approved: 'Approved',
    amount: '$1,000.00',
    status: 'Paid',
  },
  {
    id: 3,
    name: 'Ross Geller',
    mail: 'ross@gmail.com',
    approved: 'N/A',
    amount: '$500.00',
    status: 'Unpaid',
  },
  {
    id: 4,
    name: 'Monica Geller',
    mail: 'monica@gmail.com',
    approved: 'Approved',
    amount: '$1,000.00',
    status: 'Unpaid',
  },
  {
    id: 5,
    name: 'Ross Geller',
    mail: 'ross@gmail.com',
    approved: 'N/A',
    amount: '$1,000.00',
    status: 'Paid',
  },
];

export const BloodBankScreen = ({navigation}) => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const [searchAccount, setSearchAccount] = useState('');
  const [searchPayroll, setSearchPayroll] = useState('');
  const [searchInvoice, setSearchInvoice] = useState('');
  const [searchPharmacists, setSearchPharmacists] = useState('');
  const [optionModalView, setOptionModalView] = useState(false);
  const [selectedView, setSelectedView] = useState('Blood Banks');

  const animations = useRef(
    [0, 0, 0, 0, 0].map(() => new Animated.Value(300)),
  ).current;
  const opacities = useRef(
    [0, 0, 0, 0, 0].map(() => new Animated.Value(0)),
  ).current;

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

  return (
    <View style={[styles.container, {backgroundColor: theme.lightColor}]}>
      <View style={styles.headerView}>
        <Header
          title={t('blood_bank')}
          navigation={navigation}
          onPress={() => navigation.openDrawer()}
          moreButtonClick={() => toggleMenu(true)}
        />
      </View>
      <View style={styles.mainView}>
        {selectedView == 'Blood Banks' ? (
          <BloodBanksList
            searchBreak={searchAccount}
            setSearchBreak={setSearchAccount}
            allData={allData}
          />
        ) : selectedView == 'Blood Donors' ? (
          <BloodDonorList
            searchBreak={searchPayroll}
            setSearchBreak={setSearchPayroll}
            allData={BloodDonorData}
          />
        ) : selectedView == 'Blood Donations' ? (
          <BedAssignList
            searchBreak={searchInvoice}
            setSearchBreak={setSearchInvoice}
            allData={BedAssignData}
          />
        ) : (
          selectedView == 'Blood Issues' && (
            <ManualList
              searchBreak={searchPharmacists}
              setSearchBreak={setSearchPharmacists}
              allData={ManualData}
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
            {[
              'Logo',
              'Blood Banks',
              'Blood Donors',
              'Blood Donations',
              'Blood Issues',
            ].map((option, index) => (
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

export default BloodBankScreen;
