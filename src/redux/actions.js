import * as t from './actionTypes';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
export const setLoginState = (loginData) =>{
    return {
        type: 'SET_LOGIN_STATE',
        payload: {
            token: loginData.access_token,
            expiresOn: loginData.expires_at,
        },
    };
};

// export const login = (loginInput) => {
//     const navigation = useNavigation();
//     const {username, password} = loginInput;

//     const data = new FormData();
//     data.append('username', username);
//     data.append('password', password);

//     console.log('DATA: ', data);

//         axios({
//             method: "post",
//             url: "https://qlsc.maysoft.io/server/api/auth/login",
//             data: data,
//             headers: { "Content-Type": "multipart/form-data"}
//           }).then(function (response) {
//               console.log('RESPONSE DATA: ', response.data);
//               //handle success
//               if(response.data.status){
//                 dispatch(setLoginState(response.data))
//                 navigation.navigate('Home');
//               }
//             }).catch(function (response) {
//               //handle error
//               console.log(response);
//             });
// }