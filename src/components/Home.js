import axios from "axios";
import {Button, Text, View, SafeAreaView, StyleSheet, StatusBar, FlatList, TextInput} from 'react-native';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../store/actions";
import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-neat-date-picker';

const Home = () =>{

    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [dataValue, setDateValue] = useState();
    
    // Xử lý ngày
    const [showDatePicker, setShowDatePicker] = useState(false);
    const openDatePicker = () => {
        setShowDatePicker(true);
      }
    const onCancel = () => {
        setShowDatePicker(false);
    }
    const onConfirm = (output) => {
        setShowDatePicker(false);
        const {startDate, startDateString, endDate, endDateString} = output;
        setStartTime(startDate.getTime()/1000);
        setEndTime(endDate.getTime()/1000);
        let aa = startDateString.concat('  -  ',endDateString);
        setDateValue(aa);

        let reportFilters = [];

        axios({
            method: "post",
            url: "https://qlsc.maysoft.io/server/api/getAllReports",
            data: {page: 1},
            headers: { "Content-Type": "multipart/form-data",
                        "Authorization": author}
        }).then(function (response) {
            
            if(response.data.status){
                const reports = response.data.data.data;
                let i;
                for(i=0;i<reports.length;i++){
                    console.log(reports[i].createTime);
                    if(reports[i].createTime>startTime && reports[i].createTime<endTime){
                        reportFilters.push(reports[i]);
                    }
                }
                setAllRepport(reportFilters);
            }
        }).catch(function (response) {
              //handle error
              
        });

      }
    
    
    const navigation = useNavigation();
    
    const token = useSelector(state => state.AuthReducer.token);

    const [allReport, setAllRepport] = useState([]);
    const [incidentObject, setIncidentObject] = useState([]);
    const [reportStatus, setReportStatus] = useState([]);
    const [reportType, setReportType] = useState([]);

    const formData = new FormData();
    formData.append('page', 1);

    const group = new FormData();
    group.append('groups', 'incidentObject, reportStatus, reportType');

    let author = 'Bearer'.concat(' ', token);


    useEffect(()=>{
        axios({
            method: "post",
            url: "https://qlsc.maysoft.io/server/api/getAllReports",
            data: formData,
            headers: { "Content-Type": "multipart/form-data",
                        "Authorization": author}
        }).then(function (response) {
            if(response.data.status){
                setAllRepport(response.data.data.data);
            }
        }).catch(function (response) {
              //handle error
              
        });

        axios({
            method: "post",
            url: "https://qlsc.maysoft.io/server/api/getCommon",
            data: group,
            headers: { "Content-Type": "multipart/form-data",
                        "Authorization": author}
        }).then(function (response) {
              if(response.data.status){
                  setIncidentObject(response.data.data.incidentObject);
                  setReportStatus(response.data.data.reportStatus);
                  setReportType(response.data.data.reportType);
              }
        }).catch(function (response) {
              //handle error
        });
    }, [])



    const handleDate= (timestamp) =>{
        let date = new Date(timestamp * 1000);

        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();

        const newDate = {
            day,
            month,
            year, 
            hour,
            minute
        }
        return newDate;

    }
    

    const displayReportStatus = (statusItem) =>{
        let i ;
        for(i=0;i<reportStatus.length;i++){
            if(statusItem === reportStatus[i].code){
                return reportStatus[i].name;
            }
        }
    }

    const displayReportType = (reportTypeItem) =>{
        let i ;
        for(i=0;i<reportType.length;i++){
            if(reportTypeItem === reportType[i].code){
                return reportType[i].name;
            }
        }
    }

    const displayincidentObject = (incidentObjectItem) =>{
        let i;
        for(i=0;i<incidentObject.length;i++){
            if(incidentObjectItem === incidentObject[i].code){
                return incidentObject[i].name;
            }
        }
    }

    const Item = ({ item }) => (
        <View style={styles.item}>
          <Text style={styles.label}>{item.reportNo} &nbsp;&nbsp;<Text style={styles.status}>{displayReportStatus(item.status)}</Text></Text>
          <Text>{handleDate(item.reportTime).day}/{handleDate(item.reportTime).month}/{handleDate(item.reportTime).year} &nbsp;&nbsp; {handleDate(item.reportTime).hour}:{handleDate(item.reportTime).minute}</Text>
          <Text>{displayReportType(item.reportType)} | <Text>{displayincidentObject(item.incidentObject)}</Text></Text>
          <Text>{item.reporterName}</Text>
          <Text>{item.shortDescription}</Text>
        </View>
      );
    const renderItem = ({ item }) => (
        <Item item={item} />
      );
    const filter = () =>{
       navigation.navigate('filter');
    }
    return (
        <SafeAreaView style={styles.container}>
            
        <View style={styles.headers}>
            <View style={styles.calendarInput}>
                <TextInput style={styles.displayDateValue} value={dataValue}/>
                <Icon name="calendar" color="#3399FF" onPress={openDatePicker} size={32} />
                <DatePicker
                    isVisible={showDatePicker}
                    mode={'range'}
                    onCancel={onCancel}
                    onConfirm={onConfirm}
                />
            </View>
            {/* Lọc dữ liệu */}
            <View style={styles.filter}>
            <Icon name="filter" color="#3399FF"  onPress={filter} size={32} />
            </View>
        </View>

        <FlatList
          data={allReport}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
       
        </SafeAreaView>
        
    )

}
export default Home;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    headers: {
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 5,
    },
    calendarInput: {
        width: '80%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 50,
        borderWidth: 1,
        borderColor: '#3399FF',
        borderRadius: 15,
        padding: 5
    },
    displayDateValue: {
        width: '80%',
        marginRight: 5
    },
    filter: {
        width: '20%',
        textAlign: 'center',
        marginLeft: 15,
        marginTop: 8
    },
    item: {
        padding: 5,
        marginVertical: 5,
        marginHorizontal: 5,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    label: {
        fontWeight: "bold",
        color: '#000'
    },
    status: {
        fontWeight: 'normal',
    },
    title: {
      fontSize: 25,
    },
  });