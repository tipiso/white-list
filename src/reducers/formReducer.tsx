interface ResponseData {
    [key: string]: any
}

export type Action =
    |{
        type: 'SET_COMPANY_DATA';
        payload: {
            subject: ResponseData;
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
    subject: {} as any,
    US: '',
    buyerNIP: ''
}

export type FormState = typeof initialState;

export const formReducer = (state: FormState, action: Action): FormState => {
    console.log(action.payload)
    switch (action.type) {
        case 'CHANGE_INPUT':
            return {
                ...state,
                NIP: action.payload.NIP,
                bankAcc: action.payload.bankAcc,
                fromDate: action.payload.fromDate,
                captcha: action.payload.captcha,
            };
        case 'SET_COMPANY_DATA':

            return{
                ...state,
                subject: action.payload.subject
            }
        default:
            return state;
    }
}