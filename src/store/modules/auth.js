import Cookies from 'js-cookie'
import config from '@/config'

export default {
  namespaced: true,
  state: {
    username: null,
    probeUid: {
      u: null,
      c: null
    }
  },
  mutations: {
    changeUsername (state, username) {
      state.username = username
    },
    changeProbeUid (state, uid) {
      state.probeUid.u = Date.now()
      state.probeUid.c = uid
    }
  },
  actions: {
    login ({ commit, dispatch }, { userId, prompted = true }) {
      commit('changeUsername', userId)
      if (prompted) {
        Cookies.set(config.authorization.userId.cookieKey, userId, { expires: 90, path: '/' })
        dispatch('data/refreshPersonalMatrix', null, { root: true })
      }
      // only add true login ones
      if (userId) commit('options/addUserIdHistory', userId, { root: true })
    },
    logout ({ commit }) {
      commit('changeUsername', null)
    }
  },
  getters: {
    loggedIn: state => {
      return !!state.username
    },
    username: state => {
      return state.username || ''
    },
    probeUid: state => state.probeUid
  }
}
