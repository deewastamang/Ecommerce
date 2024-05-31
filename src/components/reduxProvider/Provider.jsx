"use client";
import { persistor, store } from "@/lib/reduxStore";
import { Provider } from "react-redux";
import {PersistGate} from "redux-persist/integration/react";

const ReduxProvider = ({children}) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {children}

      </PersistGate>
    </Provider>
  )
}

export default ReduxProvider