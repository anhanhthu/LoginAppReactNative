
const initialState = {
    token: null,
}
export default (state = initialState, action) =>{
    switch(action.type){
        case 'SET_AUTH_LOGIN':
            return {
                ...state,
                token: action.payload.token,
            }
        case 'LOGOUT':
            return {
                ...state,
                token: null,

            }
        default: 
            return state;
    }
}