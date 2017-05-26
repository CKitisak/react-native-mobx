import { autorun, computed, observable } from 'mobx'

let index = 0

class ObservableListStore {
  @observable list = []
  @observable filter = ''
  @computed get filteredList () {
    var matcherFilter = new RegExp(this.filter, 'i')
    return this.list.filter(item => !this.filter || matcherFilter.test(item.name))
  }

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

const observableListStore = new ObservableListStore
// demo itemList
observableListStore.addListItem('Lorem Ipsum')
observableListStore.addListItem('Testing 2')
// demo items in itemList
observableListStore.addItem({index: 0}, 'Lorem')
observableListStore.addItem({index: 0}, 'Ipsum')
observableListStore.addItem({index: 1}, 'step 1')
observableListStore.addItem({index: 1}, 'step 2')
observableListStore.addItem({index: 1}, 'step 3')

autorun(() => {
  console.log(observableListStore.list)
  console.log(observableListStore.filter)
})

export default observableListStore
