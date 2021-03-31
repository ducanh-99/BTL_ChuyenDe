

let dataUser = null;
if (localStorage.getItem("dataUser") !== null) {
    try {
        if (JSON.parse(localStorage.getItem("dataUser")).accessToken) {
            dataUser = JSON.parse(localStorage.getItem("dataUser"));
        } else {
            localStorage.removeItem("dataUser");
        }
    } catch(e) {
        localStorage.removeItem("dataUser");
    }
}
const initialState = {
    isShow: false,
    dataUser: dataUser
};

export default function demoReducer(state = initialState, action) {
    switch (action.type) {
        // case 'GETTING':
        //     return 'hello world success';
        // case 'GET_SUCCESS':
        //     return 'hello world' + action.data;
        // case 'GET_FAILED':
        //     return 'hello world failed';
        case 'SET_DATA_USER':
            if (action.dataUser !== null && action.dataUser.accessToken) {
                localStorage.setItem("dataUser", JSON.stringify(action.dataUser));
            } else {
                localStorage.removeItem("dataUser");
            }
            return {
                ...state,
                dataUser: action.dataUser
            }
        default:
            return state;
    }
}
