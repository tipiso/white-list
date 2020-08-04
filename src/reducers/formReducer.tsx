export type Action =
    | {
        type: "CHANGE_INPUT";
        payload: {
            NIP: number;
            bankAcc: number;
            fromDate: Date;
            captcha: boolean;
        }
    };

export const initialState = {
    NIP: 0,
    bankAcc: 0,
    fromDate: new Date(),
    captcha: false
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
            }
        default:
            return state;
    }
}