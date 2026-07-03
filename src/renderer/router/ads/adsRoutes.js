import AdsView from '@views/ads'

const parseRouteState = (value) => {
  if (!value || typeof value !== 'string') {
    return null
  }

  try {
    return JSON.parse(value)
  } catch (error) {
    console.error('Failed to parse ads route state', error)
    return null
  }
}

export default [
  {
    name: 'ads',
    path: '/ads',
    props: route => ({
      to: parseRouteState(route.query.to)
    }),
    meta: { layout: { is_on_black: true } },
    component: AdsView
  }
]
