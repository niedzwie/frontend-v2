import Vue from 'vue'
import store from '@/store'
import itemsManager from '@/models/managers/items'
import stagesManager from '@/models/managers/stages'
import zonesManager from '@/models/managers/zones'
import trendsManager from '@/models/managers/trends'
import periodManager from '@/models/managers/period'
import statsManager from '@/models/managers/stats'
import globalMatrixManager from '@/models/managers/matrices/globalMatrix'
import personalMatrixManager from '@/models/managers/matrices/personalMatrix'
import globalPatternMatrixManager from '@/models/managers/matrices/globalPatternMatrix'
import personalPatternMatrixManager from '@/models/managers/matrices/personalPatternMatrix'
import strings from '@/utils/strings'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    meta: {
      // current version
      v: 2
    },
    data: {}
  },
  mutations: {
    storeData: (state, { name, value, server }) => {
      // this server has not stored any data, thus there's no such object. create one
      if (!state.data[server]) Vue.set(state.data, server, {})

      // store data into the corresponding object, keyed by the server ID
      Vue.set(state.data[server], name, {
        /** The data object last updated at time */
        upd: Date.now(),
        /** The content of the data object */
        c: value
      })
    },
    clearData: (state) => {
      Vue.set(state, 'data', {})
    }
  },
  actions: {
    // eslint-disable-next-line
    async fetch({commit}, refresh = false) {
      if (refresh) commit('clearData')
      itemsManager.refresh(refresh)
      stagesManager.refresh(refresh)
      zonesManager.refresh(refresh)
      globalMatrixManager.refresh(refresh)
      globalPatternMatrixManager.refresh(refresh)
      if (router.currentRoute.matched.find(el => el.name === 'Stats') && store.getters['dataSource/source'] === 'personal') {
        personalMatrixManager.refresh(refresh)
        personalPatternMatrixManager.refresh(refresh)
      }
      trendsManager.refresh(refresh)
      periodManager.refresh(refresh)
      statsManager.refresh(refresh)
    },
    async refreshPersonalMatrix () {
      await Promise.all([
        personalMatrixManager.refresh(true),
        personalPatternMatrixManager.refresh(true)
      ])
    }
  },
  getters: {
    byDataId: (state) => ({ id, server = store.getters['dataSource/server'] }) => {
      if ('_shared' in state.data && id in state.data._shared) return state.data._shared[id]
      if (!(server in state.data) || !(id in state.data[server])) return {}

      return state.data[server][id]
    },
    content: (_, getters) => (query) => {
      return getters.byDataId(query).c
    },
    updated: (_, getters) => (query) => {
      return getters.byDataId(query).upd
    },
    stats: (state) => {
      return {
        size: strings.fileSize(JSON.stringify(state.data).length, true),
        keys: Object.keys(state.data)
      }
    }
  }
}
