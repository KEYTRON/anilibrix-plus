const getQueryValue = (value) => (typeof value === 'string' && value.length > 0 ? value : null)

export default [
  {
    name: 'blank',
    path: '/blank',
    props: route => ({
      message: getQueryValue(route.query.message),
      error: getQueryValue(route.query.error),
      referer: getQueryValue(route.query.referer)
    }),
    meta: {
      layout: {
        hide_scroll: true,
        hide_toolbar: true
      }
    },
    component: () => import('@views/blank')
  }
]
