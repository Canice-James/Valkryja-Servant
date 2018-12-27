import { reduce } from 'lodash';

const state = {
  API_KEY: '',
  API_TOKEN: '',
  tasks: []
}

const getters = {
  getBoards () {
    
  }
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  }
}

const actions = {

  makeApiRequest(){
    
  },

  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  mutations,
  actions
}
