import { View, Text } from 'react-native'
import React from 'react'
import Screen from './app/Screens'
import { store } from './app/redux/store'
import { Provider } from 'react-redux'

export default function App() {
  return (
    <Provider store={store}>

    <Screen/>
    </Provider>
  )
}
