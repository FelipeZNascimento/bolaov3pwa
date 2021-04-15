import * as ACTIONTYPES from 'store/actiontypes';

const initialState = {
    error: false,
    errorMessage: '',
    loading: false,
    isNotificationOpen: false
};

export default function appReducer(state = initialState, action: any) {
    switch (action.type) {
        case ACTIONTYPES.TOGGLE_NOTIFICATION:
            return {
                ...state,
                isNotificationOpen: action.status !== false,
                errorMessage: action.errorMessage || '',
                error: action.errorMessage || false
            };
        default:
            return state;
    }
}
