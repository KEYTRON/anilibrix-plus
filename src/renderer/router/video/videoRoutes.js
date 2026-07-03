import { useSettingsStore } from '@store/app/settings/useSettingsStore'
import VideoView from '@views/video'
import VideoLayout from '@layouts/video'

const parseRouteState = (value) => {
  if (!value || typeof value !== 'string') {
    return null
  }

  try {
    return JSON.parse(value)
  } catch (error) {
    console.error('Failed to parse video route state', error)
    return null
  }
}

export default [
  {
    name: 'video',
    path: '/video/:key/:releaseName',
    meta: { layout: { is: VideoLayout } },
    props: route => ({
      key: route.params.key,
      releaseName: route.params.releaseName,
      release: parseRouteState(route.query.release),
      episode: parseRouteState(route.query.episode),
      fromStart: route.query.fromStart === '1'
    }),
    component: VideoView,
    beforeEnter (to, from, next) {
      // Check if it is allowed to show ads
      // Check if not form ads
      const ads = useSettingsStore().system?.ads?.enabled === true
      const adsMaximum = useSettingsStore().system?.ads?.maximum === true

      const fromAds = from && from.name === 'ads'
      const isShownThisTime = Math.random() >= 0.5 || adsMaximum

      // Redirect to ads view or to episode video
      if (ads && isShownThisTime && !fromAds) {
        // Need to show ads this time
        // Push to video
        next({
          name: 'ads',
          query: {
            to: JSON.stringify({
              name: to.name,
              params: to.params,
              query: to.query
            })
          }
        })
      } else {
        // This time without ads
        // Go to video
        next()
      }
    }
  }
]
