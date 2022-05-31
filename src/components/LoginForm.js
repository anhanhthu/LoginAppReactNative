import {View, Image, Text, TextInput, Button, StyleSheet} from 'react-native';
import React from 'react';
import { useState } from 'react/cjs/react.development';
import axios from 'axios';
import Home from './Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setLoginState } from '../store/actions';
const Stack = createNativeStackNavigator();
const LoginForm = ()=>{
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const [errorUsername, setErrorUsername] = useState('');
    const [showErrorUsername, setShowErrorUsername] = useState(false);

    const [errorPassword, setErroPassword] = useState('');
    const [showErrorPassword, setShowErrorPassword] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = () =>{


        // Check username;
        if(username === ''){
            setShowErrorUsername(true);
            setErrorUsername('Vui lòng nhập tên đăng nhập!');
        }//Check password
        else if(password.length <5 ){
            setShowErrorPassword(true);
            setErroPassword('Mật khẩu phải có ít nhất 5 kí tự!');
        }
        else{
            const data = new FormData();
            data.append('username', username);
            data.append('password', password);

        axios({
            method: "post",
            url: "https://qlsc.maysoft.io/server/api/auth/login",
            data: data,
            headers: { "Content-Type": "multipart/form-data"}
          }).then(function (response) {
              if(response.data.status){
                let loginData = {
                  token: response.data.data.access_token,
                }
                dispatch(setLoginState(loginData));
              }
              else{
                setErrorUsername(response.data.errors[0])

              }
            }).catch(function (response) {
              //handle error
            });

          }

        // const data = new FormData();
        // data.append('username', username);
        // data.append('password', password);


        // axios({
        //     method: "post",
        //     url: "https://qlsc.maysoft.io/server/api/auth/login",
        //     data: data,
        //     headers: { "Content-Type": "multipart/form-data", "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiMWM4ZGU3YTNjMjI2M2QzYjYzNzM3NTJiMWEzOTFiNzU4ZjdlMjRiNzVjZjdlYjc0ODgzYTkyZWNjYjIxZTE3M2NmZjEwNjRiNzhmY2U0ODYiLCJpYXQiOjE2NTM4NDYwNzgsIm5iZiI6MTY1Mzg0NjA3OCwiZXhwIjoxNjg1MzgyMDc4LCJzdWIiOiJoR2I1R0NUbjJPOWhpWE5tNVdLUSIsInNjb3BlcyI6W119.czyeOiZ6S1c62AiexFVrzowvzDfnuWZkpaCTuZ_HbFooEO6mB-JuXRwRLvvpGwjqTsnuQOm-OLVD4zoFQ_YyxdBBUvXd9S2rjEXm3kDXZx0IKYfXRmxT2MDC_EI7KXkfckn0BIXLU4d8GUmUeKEIXNGZiN6vprMf9rZnn9NWCjeSZh8dNw5SpZ419QibfvHhIHtS0QZZbhumkaJ__0ghyutDh1ewmulqkxIgiHE-HJgRBt9TIOzbs8-JM9y72RDPUFHcqHayDsT-KYowDJzSgOQ32pZYbcPxtii_gD6U8RqthdezyW9QVNLvem4dpiOwR09xj-ar4m_Rm--wqpSLgL2-_iQFFO_y8UDCruMnoC0Pde-dgF6Rd3PouG7zgLLtfvMnzcQWagvlEWUVWV2yojtHBYw-QvVq_2UgSsPk4cTkT9A8uWldv4CmzHBhbpyfSUSZwluGf0jorruxWtthNmDYn8Vaqy-cV52nq7AHisac5-UOBwUUeI-uXPvbA49WwS7LEY8YaB0XuOGD0p_kWGAPciLikROY5PZBkPVy6fKJeb3m7BylMuU4yGHmAsi0jE8ok0hzD-R3HLKFzzZARiVU1lzRQnKdGkL1GnM8N_JTxurQ3c_o9t1WqajcyjxkWUTSMk3uNX1AnXSZwgbl5rWA_8LeVoTaoODBFIzukKM" },
        //   }).then(function (response) {
        //       //handle success
        //       if(response.data.status){
        //         navigation.navigate('Home');
        //       }
        //     }).catch(function (response) {
        //       //handle error
        //     });
    }
    return(
        <View style={styles.container}>
            <Image 
            source={require('../../public/images/small-logo.png')}
            />
            <View style={styles.formGroup}>
                <Text style={styles.label}>Tên đăng nhập</Text>
                <TextInput style={styles.input} placeholder='Nhập tên đăng nhập' value={username} onChangeText={setUsername}></TextInput>
                {showErrorUsername && <Text style={styles.error}>{errorUsername}</Text>}
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Mật khẩu</Text>
                <TextInput style={styles.input} placeholder='Nhập mật khẩu' secureTextEntry={true} value={password} onChangeText={setPassword}></TextInput>
                {showErrorPassword && <Text style={styles.error}>{errorPassword}</Text>}
            </View>

            <View style={styles.formGroup}>
                <Button style={styles.button}
                onPress={handleSubmit}
                title="Đăng nhập"
                color="#3399FF"
                />
            </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    formGroup: {
      width: '90%',
      marginTop: 25
    },
    label: {
      fontWeight: 'bold',
    },
    input: {
      borderRadius: 5,
      borderColor: 'black',
      borderWidth: 1,
      height: 40,
    },
    button: {
        borderRadius: 10
    },
    error:{
        color: 'red',
        fontSize: 14,
        fontStyle: 'italic',
    }
  });
  

export default LoginForm;