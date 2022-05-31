import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ReportContext = createContext();

const ReportContextProvider = ({children}) =>{
    const token = useSelector(state => state.AuthReducer.token);
    const formData = new FormData();
    formData.append('page', 1);

    const group = new FormData();
    group.append('groups', 'incidentObject, reportStatus, reportType');

    let author = 'Bearer'.concat(' ', token);

    const [allReports, setAllReports] = useState([]);
    useEffect(()=>{

        axios({
            method: "post",
            url: "https://qlsc.maysoft.io/server/api/getAllReports",
            data: formData,
            headers: { "Content-Type": "multipart/form-data",
                        "Authorization": author}
        }).then(function (response) {
            if(response.data.status){
                setAllReports(response.data.data.data);
            }
        }).catch(function (response) {
              //handle error
              
        });
    }, []);

    const ReportContextData = {allReports}
    return(
        <ReportContext.Provider value={ReportContextData}>
            {children}
        </ReportContext.Provider>
    )

}

export default ReportContextProvider;