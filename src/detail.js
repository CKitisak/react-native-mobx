import React, { Component } from 'react'
import { View, Text, TextInput, TouchableHighlight, StyleSheet, FlatList } from 'react-native'
import { observer } from 'mobx-react/native'
import appStyles from './styles'

@observer
class Detail extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.name
  })

  constructor (props) {
    super(props)
    this.state = {
      newItem: ''
    }
  }

  _updateNewItem (newVal) {
    this.setState({
      newItem: newVal
    })
  }

  _addItem (info) {
    if (this.state.newItem === '') return

    this.props.screenProps.addItem(info, this.state.newItem)
    this.setState({
      newItem: ''
    })
  }

  render() {
    const info = this.props.navigation.state.params

    const noItemList = (
      <Text style={_styles.noItemText}>
        No Item, Add Items To Get Started
      </Text>
    )

    const itemList = info.items.map((item, index) => (
      <View key={index} style={_styles.item}>
        <Text
          style={_styles.itemName}
        >
          • {item}
        </Text>
      </View>
    ))

    return (
      <View style={appStyles.container}>
        <View style={_styles.itemsBox}>
          {(info.items.length === 0)
            ? noItemList
            : itemList
          }
        </View>

        <View style={_styles.inputBox}>
          <TextInput
            style={_styles.inputText}
            onChangeText={(newVal) => this._updateNewItem(newVal)}
            value={this.state.newItem}
            placeholder='new item...'
            underlineColorAndroid='transparent'
          />

          <TouchableHighlight
            underlayColor='transparent'
            style={_styles.inputButton}
            onPress={() => this._addItem(info)}
          >
            <Text>
              Add
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const _styles = StyleSheet.create({
  inputBox: {
    flexDirection: 'row'
  },
  inputText: {
    flex: 4,
    height: 70,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    backgroundColor: '#fff'
  },
  inputButton: {
    flex: 1,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff'
  },
  itemsBox: {
    flex: 1
  },
  noItemText:  {
    color: '#ccc',
    fontSize: 20,
    padding: 20,
    alignSelf: 'center'
  },
  item: {
    flexDirection: 'row'
  },
  itemName: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 20
  }
})

export default Detail
