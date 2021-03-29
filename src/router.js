import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import ReportLayout from './layouts/ReportLayout'
import RecognitionReport from './views/Report/RecognitionReport'
import Report from './views/Report/Report'
import StatsLayout from './layouts/StatsLayout'
import StatsByStage from './views/Stats/Stage'
import StatsByItem from './views/Stats/Item'

import AboutLayout from './layouts/AboutLayout'
import AboutContribute from './views/About/Contribute'
import AboutContact from './views/About/Contact'
import AboutDonate from './views/About/Donate'
import AboutLinks from './views/About/Links'

import NotFound from '@/views/NotFound'
import SiteStats from '@/views/SiteStats'
import Planner from '@/views/Planner'
import Search from '@/views/Search'
import store from '@/store'
import helmet from "@/utils/helmet";

// import DataDebugger from "@/components/debug/DataDebugger";

// this is to fix error named something like DuplicatedRoute
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const routerChildrenNull = {
  path: '',
  name: 'RouterChildrenNull',
  meta: {
    icon: 'mdi-close',
    i18n: 'meta.notfound',
    hide: true
  },
  beforeEnter(to, from, next) {
    return next({
      name: "Home",
      replace: true
    })
  }
}

Vue.use(Router)
const router = new Router({
  mode: 'history',
  scrollBehavior () { // params: (to, from, savedPosition)
    return { x: 0, y: 0 }
  },
  routes: [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      icon: 'mdi-home',
      i18n: 'menu.home'
    }
  },
  {
    path: '/report',
    name: 'Report',
    component: ReportLayout,
    meta: {
      icon: 'mdi-upload',
      i18n: 'menu.report._name',
      active: true
    },
    children: [
      routerChildrenNull,
      {
        path: 'stage',
        name: 'ReportByZone',
        component: Report,
        meta: {
          icon: 'mdi-cursor-default-click',
          i18n: 'menu.report.stage'
        },
        children: [
          {
            path: ':zoneId/:stageId',
            name: 'ReportByZone_Selected',
            component: Report,
            props: true,
            meta: {
              i18n: 'menu.report.stage'
            }
          }
        ]
      },
      {
        path: 'recognition',
        name: 'RecognitionReport',
        component: RecognitionReport,
        meta: {
          icon: 'mdi-image-filter-center-focus',
          i18n: 'menu.report.recognition',
          beta: true
        }
      },
      {
        path: ':zoneId/:stageId',
        name: 'ReportByZoneLegacy',
        meta: {
          hide: true,
          icon: 'mdi-cursor-default-click',
          i18n: 'menu.report.stage'
        },
        beforeEnter(to, from, next) {
          if (to.params.zoneId && to.params.stageId) {
            return next({
              name: "ReportByZone_Selected",
              params: to.params,
              replace: true
            })
          } else {
            return next({
              name: "ReportByZone",
              replace: true
            })
          }
        }
      },
    ]
  },
  {
    path: '/result',
    name: 'Stats',
    component: StatsLayout,
    meta: {
      icon: 'mdi-chart-pie',
      i18n: 'menu.stats._name',
      active: true
    },
    children: [
      routerChildrenNull,
      {
        path: 'stage',
        name: 'StatsByStage',
        component: StatsByStage,
        props: true,
        meta: {
          icon: 'mdi-cube',
          i18n: 'menu.stats.stage'
        }
      },
      {
        path: 'stage/:zoneId/:stageId',
        name: 'StatsByStage_Selected',
        component: StatsByStage,
        props: true,
        meta: {
          hide: true,
          i18n: 'menu.stats.stage'
        }
      },
      {
        path: 'item',
        name: 'StatsByItem',
        component: StatsByItem,
        props: true,
        meta: {
          icon: 'mdi-treasure-chest',
          i18n: 'menu.stats.item'
        }
      },
      {
        path: 'item/:itemId',
        name: 'StatsByItem_SelectedItem',
        component: StatsByItem,
        props: true,
        meta: {
          hide: true,
          i18n: 'menu.stats.item'
        }
      }
    ]
  },
  {
    path: '/planner',
    name: 'Planner',
    component: Planner,
    meta: {
      icon: 'mdi-directions-fork',
      i18n: 'menu.planner',
      twoLine: 'menu.overline.planner'
    }
  },
  {
    path: '/advanced',
    name: 'AdvancedQuery',
    component: () => import(/* webpackChunkName: "advancedQuery" */ './views/AdvancedQuery'),
    props: route => ({ stage: route.query.stage, items: route.query.items }),
    meta: {
      async: true,
      icon: 'mdi-database-search',
      i18n: 'menu.stats.advanced'
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    props: route => ({ query: route.query.q }),
    meta: {
      icon: 'mdi-magnify',
      i18n: 'menu.search',
      hide: true
    }
  },
  {
    path: '/statistics',
    name: 'SiteStats',
    component: SiteStats,
    meta: {
      icon: 'mdi-poll-box',
      i18n: 'menu.siteStats'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: AboutLayout,
    meta: {
      icon: 'mdi-account-group',
      i18n: 'menu.about._name',
      active: true
    },
    children: [
      routerChildrenNull,
      {
        path: 'members',
        name: 'AboutMembers',
        component: () => import(/* webpackChunkName: "about" */ './views/About/Members'),
        props: true,
        meta: {
          async: true,
          icon: 'mdi-account-multiple',
          i18n: 'menu.about.members'
        }
      },
      {
        path: 'contribute',
        name: 'AboutContribute',
        component: AboutContribute,
        props: true,
        meta: {
          icon: 'mdi-hammer',
          i18n: 'menu.about.contribute',
          hide: true
        }
      },
      {
        path: 'changelog',
        name: 'AboutChangelog',
        component: () => import(/* webpackChunkName: "about" */ './views/About/Changelog'),
        props: true,
        meta: {
          async: true,
          icon: 'mdi-timeline',
          i18n: 'menu.about.changelog'
        }
      },
      {
        path: 'contact',
        name: 'AboutContact',
        component: AboutContact,
        props: true,
        meta: {
          icon: 'mdi-account-card-details',
          i18n: 'menu.about.contact',
          hide: true
        }
      },
      {
        path: 'donate',
        name: 'AboutDonate',
        component: AboutDonate,
        props: true,
        meta: {
          icon: 'mdi-gift',
          i18n: 'menu.about.donate',
          hide: true
        }
      },
      {
        path: 'links',
        name: 'AboutLinks',
        component: AboutLinks,
        props: true,
        meta: {
          icon: 'mdi-link-variant',
          i18n: 'menu.about.links'
        }
      },
      {
        path: 'credits',
        name: 'AboutCredits',
        component: () => import(/* webpackChunkName: "about" */ './views/About/Credits'),
        props: true,
        meta: {
          async: true,
          icon: 'mdi-license',
          i18n: 'menu.about.credits'
        }
      }
    ]
  },
  {
    path: '*',
    name: 'ErrorNotFound',
    component: NotFound,
    meta: {
      i18n: 'meta.notfound',
      hide: true
    }
  }
  ]
})

router.beforeEach((to, from, next) => {
  // If this isn't an initial page load and is an async route
  if (to.meta.async && to.name) store.commit('ui/setLoadingRoute', true)
  return next()
})

router.afterEach((to) => {
  helmet.title.update(to)
  store.commit('ui/setLoadingRoute', false)
})

export default router
