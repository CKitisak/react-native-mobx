import React, { Component } from 'react'
import { View, Text, TextInput, TouchableHighlight } from 'react-native'
import { observer } from 'mobx-react/native'
import styles from './styles'

@observer
class Home extends Component {
  static navigationOptions = {
    title: 'Home'
  }

  constructor () {
    super()
    this.state = {
      showInput: false,
      text: ''
    }
  }

  _toggleInput () {
    this.setState({
      showInput: !this.state.showInput
    })
  }

  _updateText (text) {
    this.setState({ text })
  }

  _addListItem () {
    this.props.screenProps.addListItem(this.state.text)
    this.setState({
      text: ''
    })
  }

  _removeListItem (item) {
    this.props.screenProps.removeListItem(item)
  }

  _addItemToList () {
    console.log(this.props)
  }

  render() {
    let { showInput, text } = this.state
    let { list } = this.props.screenProps

    return (
      <View>
        <View style={styles.headingText}>
          <Text>
            Item List
          </Text>
        </View>

        <View style={styles.itemWraper}>
          {list.map((item, index) => {
            return (
              <View key={index} style={styles.itemContainer}>
                <Text
                  style={styles.itemName}
                  onPress={this._addItemToList.bind(this, item)}
                >
                  {item.name.toUpperCase()}
                </Text>
                <Text
                  style={styles.itemRemoveText}
                  onPress={this._removeListItem.bind(this, item)}
                >
                  Remove
                </Text>
              </View>
            )
          })}
        </View>
        {list.length === 0 &&
          <View style={styles.noList}>
            <Text style={styles.noListText}>
              No List, Add List To Get Started
            </Text>
          </View>
        }

        <View>
          <TouchableHighlight
            underlayColor='transparent'
            style={styles.button}
            onPress={text === ''
              ? this._toggleInput.bind(this)
              : this._addListItem.bind(this, text)
            }
          >
            <Text style={styles.buttonText}>
              {(text === '' && !showInput) && '+ New List'}
              {(text === '' && showInput) && '+ Close'}
              {text !== '' && '+ Add New List Item'}
            </Text>
          </TouchableHighlight>
          {showInput &&
            <TextInput
              style={styles.input}
              onChangeText={(newVal) => this._updateText(newVal)}
              value={text}
            />
          }
        </View>
      </View>
    )
  }
}

export default Home
