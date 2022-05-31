import React from "react";
import { View, Button , Text} from "react-native";
import { useDispatch } from "react-redux";
import { logOut } from "../store/actions";
const Private = () =>{
    const dispatch = useDispatch();
    
    const handleLogout = () => {
        dispatch(logOut());
    }
    return (

        <View>
        <Text>Private</Text>
        <Button 
            onPress={handleLogout}
            title="Đăng xuất"
            color="#3399FF"
            />
        </View>
    )
}
export default Private;