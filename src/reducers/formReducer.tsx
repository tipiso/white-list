export type Action =
    |{
        type: 'NIP_FOUND';
        payload: {
            response: object;
        }
    }
    | {
        type: "CHANGE_INPUT";
        payload: {
            NIP: string;
            bankAcc: string;
            fromDate: string;
            captcha: boolean;
        }
    };

export const initialState = {
    NIP: '',
    bankAcc: '',
    fromDate: new Date().toISOString().slice(0, 10),
    captcha: false,
    response: {}
}

export type FormState = typeof initialState;

export const formReducer = (state: FormState, action: Action): FormState => {
    console.log(state, action);
    switch (action.type) {
        case 'CHANGE_INPUT':
            return {
                ...state,
                NIP: action.payload.NIP,
                bankAcc: action.payload.bankAcc,
                fromDate: action.payload.fromDate,
                captcha: action.payload.captcha,
            };
        case 'NIP_FOUND':
            return{
                ...state,
                response: action.payload.response
            }
        default:
            return state;
    }
}