import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
import ListStore from './mobx/listStore'

import Home from './home'
// import Detail from './detail'

const Navigator = StackNavigator({
  Home: { screen: Home },
  // Detail: { screen: Detail }
})

class App extends Component {
  render () {
    return (
      <Navigator
        screenProps={ListStore}
      />
    )
  }
}

export default App
