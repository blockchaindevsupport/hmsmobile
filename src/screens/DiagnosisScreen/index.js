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
import BloodBanksList from '../../components/BloodComponent/BloodBanksList';
import BloodDonorList from '../../components/BloodComponent/BloodDonorList';
import BloodDonationList from '../../components/BloodComponent/BloodDonationList';
import BloodIssueList from '../../components/BloodComponent/BloodIssueList';
import DiagnosisList from '../../components/DiagnosisComponent/DiagnosisList';
import DiagnosisCategoriesList from '../../components/DiagnosisComponent/DiagnosisCategoriesList';
import DiagnosisTestsList from '../../components/DiagnosisComponent/DiagnosisTestsList';
import { onGetCommonApi } from '../../services/Api';

const allData = [
  {
    id: 1,
    report_type: 'CT Scan',
    opo_no: 'EMP0000001',
    date: '22:02:00 2023-05-25',
    document: 'N/A',
    des: 'N/A',
    report: true,
  },
  {
    id: 2,
    report_type: 'Neck Pain',
    opo_no: 'EMP0000002',
    date: '22:02:00 2023-05-25',
    document: 'N/A',
    des: 'Neck stiffness',
    report: false,
  },
  {
    id: 3,
    report_type: 'Blood',
    opo_no: 'EMP0000003',
    date: '22:02:00 2023-05-25',
    document: 'N/A',
    des: 'Blood',
    report: true,
  },
  {
    id: 4,
    report_type: 'Fibrosis',
    opo_no: 'EMP0000004',
    date: '22:02:00 2023-05-25',
    document: 'N/A',
    des: 'N/A',
    report: false,
  },
  {
    id: 5,
    report_type: 'Blood Pressure',
    opo_no: 'EMP0000005',
    date: '22:02:00 2023-05-25',
    document: 'N/A',
    des: 'Blood Pressure',
    report: true,
  },
];

const DiagnosisCategoriesData = [
  {
    id: 1,
    name: 'Allergy',
  },
  {
    id: 2,
    name: 'Neck Pain',
  },
  {
    id: 3,
    name: 'Blood',
  },
  {
    id: 4,
    name: 'Fibrosis',
  },
  {
    id: 5,
    name: 'Blood Pressure',
  },
];

const BloodIssueData = [
  {
    id: 1,
    admission: 'EMP0000001',
    name: 'Joey Tribiyani',
    mail: 'joey@gmail.com',
    date: '01 Feb, 2024',
    discharge: 'Surgery',
  },
  {
    id: 2,
    admission: 'EMP0000002',
    name: 'Monica Geller',
    mail: 'monica@gmail.com',
    date: '9 Sept, 2020',
    discharge: 'X-ray',
  },
  {
    id: 3,
    admission: 'EMP0000003',
    name: 'Ross Geller',
    mail: 'ross@gmail.com',
    date: '12 Dec, 2022',
    discharge: 'Full Body checkup',
  },
  {
    id: 4,
    admission: 'EMP0000004',
    name: 'Monica Geller',
    mail: 'monica@gmail.com',
    date: '12 Dec, 2022',
    discharge: 'MRI',
  },
  {
    id: 5,
    admission: 'EMP0000005',
    name: 'Ross Geller',
    mail: 'ross@gmail.com',
    date: '12 Dec, 2022',
    discharge: 'Dental Implant',
  },
];

export const DiagnosisScreen = ({navigation}) => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const [searchAccount, setSearchAccount] = useState('');
  const [searchPayroll, setSearchPayroll] = useState('');
  const [searchPharmacists, setSearchPharmacists] = useState('');
  const [optionModalView, setOptionModalView] = useState(false);
  const [selectedView, setSelectedView] = useState('Diagnosis');
  const [diagnosisCategory, setDiagnosisCategory] = useState([]);
  const [diagnosis, setDiagnosis] = useState([]);
  const [diagnosisTest, setDiagnosisTest] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [pageCount, setPageCount] = useState('1');
  const [totalPage, setTotalPage] = useState('1');
  const [categoryPage, setCategoryPage] = useState('1');
  const [testPage, setTestPage] = useState('1');

  const animations = useRef(
    [0, 0, 0, 0].map(() => new Animated.Value(300)),
  ).current;
  const opacities = useRef(
    [0, 0, 0, 0].map(() => new Animated.Value(0)),
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

  useEffect(() => {
    onGetAdvancePaymentData();
  }, [searchPayroll, pageCount]);

  const onGetAdvancePaymentData = async () => {
    try {
      const response = await onGetCommonApi(
        `diagnosis-get?search=${searchPayroll}&page=${pageCount}`,
      );
      console.log('GetAccountData>>', response.data.data);
      if (response.data.flag == 1) {
        setDiagnosisCategory(response.data.data);
        setCategoryPage(response.data.recordsTotal);
        setRefresh(!refresh);
      }
    } catch (err) {
      console.log('Get AccountError>', err.response.data);
    }
  };

  useEffect(() => {
    onGetDiagnosisData();
  }, [searchAccount, pageCount]);

  const onGetDiagnosisData = async () => {
    try {
      const response = await onGetCommonApi(
        `patient-diagnosis-get?search=${searchAccount}&page=${pageCount}`,
      );
      console.log('GetAccountData>>', response.data.data);
      if (response.data.flag == 1) {
        setDiagnosis(response.data.data);
        setTotalPage(response.data.recordsTotal);
        setRefresh(!refresh);
      }
    } catch (err) {
      console.log('Get AccountError>', err.response.data);
    }
  };

  useEffect(() => {
    onGetDiagnosisTestData();
  }, [searchPharmacists, pageCount]);

  const onGetDiagnosisTestData = async () => {
    try {
      const response = await onGetCommonApi(
        `patient-test-diagnosis-get?search=${searchPharmacists}&page=${pageCount}`,
      );
      console.log('GetAccountData>>', response.data.data);
      if (response.data.flag == 1) {
        setDiagnosisTest(response.data.data.items);
        setTestPage(response.data.data.pagination.last_page);
        setRefresh(!refresh);
      }
    } catch (err) {
      console.log('Get AccountError>', err.response.data);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.lightColor}]}>
      <View style={styles.headerView}>
        <Header
          title={t('diagnosis')}
          navigation={navigation}
          onPress={() => navigation.openDrawer()}
          moreButtonClick={() => toggleMenu(true)}
        />
      </View>
      <View style={styles.mainView}>
        {selectedView == 'Diagnosis' ? (
          <DiagnosisList
            searchBreak={searchAccount}
            setSearchBreak={setSearchAccount}
            allData={diagnosis}
            onGetData={onGetDiagnosisData}
            pageCount={pageCount}
            setPageCount={setPageCount}
            totalPage={totalPage}
          />
        ) : selectedView == 'Diagnosis Categories' ? (
          <DiagnosisCategoriesList
            searchBreak={searchPayroll}
            setSearchBreak={setSearchPayroll}
            allData={diagnosisCategory}
            onGetData={onGetAdvancePaymentData}
            pageCount={pageCount}
            setPageCount={setPageCount}
            totalPage={categoryPage}
          />
        ) : (
          selectedView == 'Diagnosis Tests' && (
            <DiagnosisTestsList
              searchBreak={searchPharmacists}
              setSearchBreak={setSearchPharmacists}
              allData={diagnosisTest}
              onGetData={onGetDiagnosisTestData}
              category={diagnosisCategory}
              pageCount={pageCount}
              setPageCount={setPageCount}
              totalPage={testPage}
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
              'Diagnosis',
              'Diagnosis Categories',
              'Diagnosis Tests',
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

export default DiagnosisScreen;
