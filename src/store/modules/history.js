import { getHistory } from '@/api'
import * as types from './../mutation-types'

// init state
const state = {
  data: {
    per_page: 20,
    data: [],
    current_page: -1
  }
}

// getters
const getters = {
  histories: state => state.data
}

// actions
const actions = {
  getHistory ({ commit, state }, payload = {}) {
    return new Promise((resolve, reject) => {
      if (!payload.page) {
        payload.page = parseInt(state.data.current_page, 10)
      }
      payload.size = parseInt(state.data.per_page, 10)
      getHistory(payload)
        .then(result => {
          commit(types.HISTORY_UPDATE, result.data)
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  updateSizeHistory ({ commit, dispatch }, size) {
    commit(types.HISTORY_UPDATE_SIZE, size)
    dispatch('getHistory')
  },
  updatePageHistory ({ commit, dispatch }, page) {
    commit(types.HISTORY_UPDATE_PAGE, page)
    dispatch('getHistory')
  }
}
// mutation
const mutations = {
  [types.HISTORY_UPDATE] (state, payload) {
    state.data = payload
  },
  [types.HISTORY_UPDATE_SIZE] (state, size) {
    state.data.per_page = size
  },
  [types.HISTORY_UPDATE_PAGE] (state, page) {
    state.data.current_page = page
  },
  [types.HISTORY_REMOVE_ITEMS] (state, ids) {
    let datanew
    ids.map(cur => {
      datanew = state.data.data.filter(item => item.id !== cur)
    })
    state.data.data = datanew
  }
}
export default {
  state, getters, actions, mutations
}
