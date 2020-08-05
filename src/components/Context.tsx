import React, { createContext } from 'react';
import { formReducer, Action, initialState, FormState } from '../reducers/formReducer';

const AppContext = createContext<{
    state: FormState;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null
});

function AppProvider(props: React.PropsWithChildren<{}>){
    const [state, dispatch] = React.useReducer<React.Reducer<FormState, Action>>(formReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }} {...props} />
    )
}

export { AppContext, AppProvider };