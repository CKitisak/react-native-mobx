import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

class Detail extends Component {
  static navigationOptions = {
    title: 'Detail'
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Detail
        </Text>
      </View>
    )
  }
}

export default Detail
