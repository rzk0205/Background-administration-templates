import { setItem, getItem } from '@/utils/storage'
export default {
  namespaced: true,
  state: {
    tagsView: getItem('tagsview') || []
  },
  mutations: {
    setTagsview(state, tagsviewVal) {
      const tagsViewStatus = state.tagsView.find(
        (item) => item.path === tagsviewVal.path
      )
      if (!tagsViewStatus) {
        state.tagsView.push(tagsviewVal)
        setItem('tagsview', state.tagsView)
      }
    },
    removeTagItem(state, index) {
      state.tagsView.splice(index, 1)
      setItem('tagsview', state.tagsView)
    }
  },
  actions: {}
}
