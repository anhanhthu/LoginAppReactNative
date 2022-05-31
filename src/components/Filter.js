import { StylesContext } from '@material-ui/styles';
import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import axios from 'axios';
import { Header } from '@rneui/themed';
import RNPickerSelect from 'react-native-picker-select';
import { Button } from '@rneui/base';

const Filter = () =>{const token = useSelector(state => state.AuthReducer.token);

    const [allReport, setAllRepport] = useState([]);
    const [incidentObject, setIncidentObject] = useState([]);
    const [reportStatus, setReportStatus] = useState([]);
    const [reportType, setReportType] = useState([]);
    const [department, setDepartment] = useState([]);

    const [statusSelected, setStatusSelected] = useState();
    const [typeSelected, setTypeSelected] = useState();
    const [objectSelected, setObjectSelected] = useState();
    const [departmentSelected, setDepartmentSelected] = useState();

    const formData = new FormData();
    formData.append('page', 1);

    const group = new FormData();
    group.append('groups', 'incidentObject, reportStatus, reportType');

    let author = 'Bearer'.concat(' ', token);


    useEffect(()=>{
        // axios({
        //     method: "post",
        //     url: "https://qlsc.maysoft.io/server/api/getAllReports",
        //     data: formData,
        //     headers: { "Content-Type": "multipart/form-data",
        //                 "Authorization": author}
        // }).then(function (response) {
        //     if(response.data.status){
        //         setAllRepport(response.data.data.data);
        //     }
        // }).catch(function (response) {
        //       //handle error
              
        // });

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

        axios({
            method: "post",
            url: "https://qlsc.maysoft.io/server/api/getAllDepartments",
            data: formData,
            headers: { "Content-Type": "multipart/form-data",
                        "Authorization": author}
        }).then(function (response) {
            if(response.data.status){
                setDepartment(response.data.data.data);
            }
        }).catch(function (response) {
              //handle error
              
        });

    }, []);

    const aaa= (timestamp) =>{
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
          <Text>{aaa(item.createTime).day}/{aaa(item.createTime).month}/{aaa(item.createTime).year} &nbsp;&nbsp; {aaa(item.createTime).hour}:{aaa(item.createTime).minute}</Text>
          <Text>{displayReportType(item.reportType)} | <Text>{displayincidentObject(item.incidentObject)}</Text></Text>
          <Text>{item.reporterName}</Text>
          <Text>{item.shortDescription}</Text>
        </View>
      );
    const renderItem = ({ item }) => (
        <Item item={item} />
    );

    const statusFilter = () =>{
        let status = [];
        let i;
        for(i=0;i<reportStatus.length;i++){
            const data = {
                label: reportStatus[i].name,
                value: reportStatus[i].code,
            };
            status.push(data);
        }

        return status;
    }
    const typeFilter = () =>{
        let type = [];
        let i;
        for(i=0;i<reportType.length;i++){
            const data = {
                label: reportType[i].name,
                value: reportType[i].code,
            };
            type.push(data);
        }

        return type;
    }

    const objectFilter = () =>{
        let object = [];
        let i;
        for(i=0;i<incidentObject.length;i++){
            const data = {
                label: incidentObject[i].name,
                value: incidentObject[i].code,
            };
            object.push(data);
        }

        return object;
    }

    const departmentFilter = () =>{
        let departments = [];
        let i;
        for(i=0;i<department.length;i++){
            const data = {
                label: department[i].departmentName,
                value: department[i].id,
            };
            departments.push(data);
        }

        return departments;
    }
    const filter = () =>{

        let multifilter = {
            page: 1,
        };
        if(departmentSelected !== null){
            multifilter.departmentId = departmentSelected;
        }
        if(statusSelected !== null){
            multifilter.status = statusSelected
        }
        if(typeSelected !== null){
            multifilter.reportType = typeSelected;
        }
        if(objectSelected !== null){
            multifilter.incidentObject = objectSelected;
        }

        axios({
            method: "post",
            url: "https://qlsc.maysoft.io/server/api/getAllReports",
            data: multifilter,
            headers: { "Content-Type": "multipart/form-data",
                        "Authorization": author}
        }).then(function (response) {
            if(response.data.status){
                setAllRepport(response.data.data.data);
            }
        }).catch(function (response) {
              //handle error
              
        });

    }
    return (
        <SafeAreaView style={StylesContext.container}>
            <Header style={styles.headers}
            centerComponent={{
                text: "Bộ lọc báo cáo",
                style: { color: "#fff", fontSize: 20 }
            }}
            centerContainerStyle={{}}
            containerStyle={{ width: "100%", backgroundColor: '#3399FF' }}
            placement="center"
            />
            <Text></Text>
            <View style={styles.select} >
            <Text style={styles.selectLabel}>Phòng ban</Text>
            <RNPickerSelect style={styles.selectInput}
                 onValueChange={(value) => setDepartmentSelected(value)}
                 items={departmentFilter()}
             />
            </View>

            <View style={styles.select} >
            <Text style={styles.selectLabel}>Trạng thái</Text>
            <RNPickerSelect style={styles.selectInput}
                 onValueChange={(value) => setStatusSelected(value)}
                 items={statusFilter()}
             />
            </View>

            <View style={styles.select} >
            <Text style={styles.selectLabel}>Loại báo cáo</Text>
            <RNPickerSelect style={styles.selectInput}
                 onValueChange={(value) => setTypeSelected(value)}
                 items={typeFilter()}
             />
            </View>

            <View style={styles.select} >
            <Text style={styles.selectLabel}>Đối tượng</Text>
            <RNPickerSelect style={styles.selectInput}
                 onValueChange={(value) => setObjectSelected(value)}
                 items={objectFilter()}
             />
            </View>

            <Text></Text>

            <View >
                <Button style={styles.buttonFilter} onPress={filter}>Lọc</Button>
            </View>

            {allReport.length > 0 && <Text style={styles.result}>Kết quả: </Text>}

            {allReport.length === 0 && <Text>Không tồn tại kết quả nào!</Text>}

        <FlatList
          data={allReport}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />

        </SafeAreaView>
    )

}
export default Filter;

const styles = StyleSheet.create({
    container: {

    },
    headers: {
        backgroundColor: '#000',
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
    selectLabel: {
        fontSize: 18,
        color: '#000',
    },
    selectInput: {
        borderColor: '#3399FF',
        borderWidth: 0.3,
        borderRadius: 5
    },
    select: {
        borderColor: '#3399FF',
        borderBottomWidth: 0.5,
    },
    status: {
        fontWeight: 'normal',
    },
    title: {
      fontSize: 25,
    },
    result: {
        color: '#000',
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 18,
        marginTop: 10,
        borderTopWidth: 0.5,
        borderColor: '#3399FF',
    },
})