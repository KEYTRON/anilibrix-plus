import { createRouter, createWebHashHistory } from 'vue-router'

import ads from './ads'
import blank from './blank'
import video from './video'
import release from './release'
import catalog from './catalog'
import account from './account'
import releases from './releases'
import favorites from './favorites'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [].concat(
    ads,
    blank,
    video,
    release,
    catalog,
    account,
    releases,
    favorites
  )
})

// Suppress NavigationDuplicated errors
const originalPush = router.push.bind(router)
router.push = (location) => originalPush(location).catch(() => null)

router.beforeEach((to, from, next) => {
  if (to.name === 'release') {
    localStorage.setItem('last_page_release', JSON.stringify(to.params))
    next()
  } else {
    if (from.name && to.name !== 'video' && to.name !== 'ads') {
      localStorage.removeItem('last_page_release')
    }
    next()
  }
})

export default router
