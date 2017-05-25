import { observable } from 'mobx'

let index = 0

class ObservableListStore {
  @observable list = []

  addListItem (item) {
    this.list.push({
      name: item,
      items: [],
      index
    })
    index++
  }

  removeListItem (item) {
    this.list = this.list.filter((li) => {
      return li.index !== item.index
    })
  }

  addItem (item, name) {
    this.list.forEach((li) => {
      if (li.index === item.index) {
        li.items.push(name)
      }
    })
  }
}

const observableListStore = new ObservableListStore()

export default observableListStore
