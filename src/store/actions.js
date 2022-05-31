import AsyncStorage from "@react-native-async-storage/async-storage"

export const Init = () =>{
    return async dispatch => {
        let token = await AsyncStorage.getItem('token');
        if(token !== null){
            let loginData = {
                token: token,
            }
            dispatch({
                type: 'SET_AUTH_LOGIN',
                payload: loginData
            })
        }
    }

}


export const setLoginState = (loginData) =>{
    return async dispatch =>{
        if(loginData.token !== null){
            await AsyncStorage.setItem('token', loginData.token);
        dispatch({
            type: 'SET_AUTH_LOGIN',
            payload: loginData,
        })
        }
    }

}

export const logOut = () =>{
    return async dispatch => {
        await AsyncStorage.removeItem('token');
        dispatch({
            type: 'LOGOUT',
        })

    }
}