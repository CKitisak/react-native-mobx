import React, { Component } from 'react'
import { View, Text, TextInput, ScrollView, TouchableHighlight, StyleSheet } from 'react-native'
import { observer } from 'mobx-react/native'
import appStyles from './styles'

@observer
class Home extends Component {
  static navigationOptions = {
    header: null
  }

  constructor (props) {
    super(props)
    this.state = {
      showInput: false,
      text: ''
    }
  }

  _updateFilter (text) {
    this.props.screenProps.filter = text
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

  render() {
    const { showInput, text } = this.state
    const { list, filteredList, filter } = this.props.screenProps
    const { navigate } = this.props.navigation

    const itemList = filteredList.map(item => (
      <View key={item.index} style={_styles.list}>
        <Text
          style={_styles.listName}
          onPress={() => navigate('Detail', item)}
        >
          {item.name}
        </Text>

        <Text
          style={_styles.listRemoveText}
          onPress={() => this._removeListItem(item)}
        >
          Remove
        </Text>
      </View>
    ))

    const noItemList = () => (
      <Text style={_styles.noListText}>
        No List, Add List To Get Started
      </Text>
    )

    return (
      <View style={appStyles.container}>
        <View>
          <TextInput
            style={_styles.inputSearch}
            onChangeText={(newVal) => this._updateFilter(newVal)}
            value={filter}
            placeholder='search...'
            placeholderTextColor='#fff'
            underlineColorAndroid='transparent'
          />
        </View>

        <ScrollView style={_styles.listBox}>
          {list.length === 0
            ? noItemList
            : itemList
          }
        </ScrollView>

        <View>
          <TouchableHighlight
            underlayColor='transparent'
            style={_styles.buttonNewList}
            onPress={() => {
              text === ''
              ? this._toggleInput()
              : this._addListItem(text)
            }}
          >
            <Text style={_styles.buttonNewListText}>
              {(text === '' && !showInput) && 'New List'}
              {(text === '' && showInput) && 'Close'}
              {text !== '' && 'Add List'}
            </Text>
          </TouchableHighlight>
        </View>

        {showInput &&
          <View>
            <TextInput
              style={_styles.inputItem}
              onChangeText={(newVal) => this._updateText(newVal)}
              value={text}
              placeholder='new list...'
              underlineColorAndroid='transparent'
            />
          </View>
        }
      </View>
    )
  }
}

const _styles = StyleSheet.create({
  inputSearch: {
    backgroundColor: '#888',
    color: '#fff',
    height: 60,
    fontSize: 18,
    padding: 20
  },
  listBox: {
    flex: 1
  },
  list: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  listName: {
    fontSize: 18,
    flex: 4,
    paddingVertical: 20,
    paddingLeft: 20
  },
  listRemoveText: {
    color: 'red',
    flex: 1,
    alignSelf: 'center'
  },
  noListText: {
    color: '#ccc',
    fontSize: 20,
    padding: 20,
    alignSelf: 'center'
  },
  buttonNewList: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc'
  },
  buttonNewListText: {
    fontSize: 20
  },
  inputItem: {
    height: 60,
    fontSize: 18,
    padding: 20,
    backgroundColor: '#eee'
  }
})

export default Home
