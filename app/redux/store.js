
import {configureStore} from '@reduxjs/toolkit'
import loginReducer from "./reducers/loginReducer";

export const store=configureStore({reducer:loginReducer})

// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import loginReducer from './reducers/loginReducer';
// import NameReducer from './reducers/NameReducer'

// // Combine reducers if you have multiple reducers
// const rootReducer = combineReducers({
//   login: loginReducer,
//   Name:NameReducer,
//   // Add other reducers here
// });

// // Configure the Redux store with the combined reducer
// export const store = configureStore({
//   reducer: rootReducer,
//   // Other store configurations go here
// });
