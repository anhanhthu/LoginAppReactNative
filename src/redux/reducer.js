const initialState = {
    isLoggedIn: false,
    token: null,
    expires_at: null,
}

export const loginReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'SET_LOGIN_STATE':
            return {
                ...state,
                token: action.payload.token,
                expiresOn: action.payload.expiresOn,
                isLoggedIn: true,
            };
        default: 
            return state;
    }
};