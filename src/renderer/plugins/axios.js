/* ============
 * Axios
 * ============
 *
 * Promise based HTTP client for the browser and node.js.
 * Because Vue Resource has been retired, Axios will now been used
 * to perform AJAX-requests.
 *
 * @see https://github.com/mzabriskie/axios
 *
 */
import Axios from 'axios'
import { clone, cloneDeep } from 'lodash'

// Set cookies
Axios.defaults.withCredentials = true
Axios.defaults.timeout = 5000

// Create axios — force XHR adapter so nodeIntegration:true doesn't trigger Node.js http adapter
// (Node.js http adapter calls data.getHeaders() on FormData, which native FormData doesn't have)
const axios = Axios.create({ adapter: 'xhr' })

function filterUnderscoredKeys (data) {
  return Object.keys(data).reduce((result, key) => {
    if (key.indexOf('_') !== 0) {
      result[key] = data[key]
    }
    return result
  }, {})
}

function isSilentProfileProbeRequest (error) {
  const url = error?.config?.url || ''
  const status = error?.response?.status
  const data = error?.config?.data

  if (!url.includes('/public/api/index.php') || ![400, 401].includes(status)) {
    return false
  }

  return data instanceof FormData && typeof data.get === 'function' && data.get('query') === 'user'
}

/**
 * Error handler function
 *
 * @param error
 * @return {Promise<never>}
 */
const responseErrorHandler = async error => {
  if (error && error.response) {
    const isSilentProfileProbe = isSilentProfileProbeRequest(error)

    if (error.response.status !== 401 && !isSilentProfileProbe) {

      let headersList = {}
      if (error.config.headers) {
        const headers = clone(error.config.headers)
        if (headers.Cookie) {
          headers.Cookie = headers.Cookie
            .replace(/PHPSESSID=[^;]+;/g, 'PHPSESSID=REDACTED');
        }
        headersList = headers
      }

      console.error('Request failed', {
        message: error.message,
        url: error.config.url,
        headers: headersList,
        data: error.response.data,
        status: error.response.status
      });
    }
  } else if (error.request) {
    const req = filterUnderscoredKeys(cloneDeep(error.config))

    if (error.config.headers) {
      const headers = clone(error.config.headers)
      if (headers.Cookie) {
        headers.Cookie = headers.Cookie
          .replace(/PHPSESSID=[^;]+;/g, 'PHPSESSID=REDACTED');
      }
      req.headers.headers = headers
    }

    console.error('Request failed with no response', error.message, req)


    //
    // let dataObject = ''
    // const data = clone(error.config.data)
    // if (data && data instanceof FormData) {
    //   dataObject = data.getBuffer().toString('utf8')
    // } else if (data) {
    //   dataObject = JSON.stringify(data)
    // }
    //
    // console.error('Request error:', {
    //   message: error.message,
    //   url: error.config.url,
    //   headers: headersList,
    //   data: dataObject
    // })
  } else {
    console.error('Error while making request', error);
  }

  if (error && error.response) {
    // If server responded with not authorized:
    if (error.response.status === 401 || isSilentProfileProbeRequest(error)) {
      const { useAccountStore } = await import('@store/app/account/useAccountStore')
      const accountStore = useAccountStore()
      accountStore.setSession(null)
      accountStore.setProfile(null)
    }
  }

  return Promise.reject(error)
}

// Add request && response interceptors
axios.interceptors.response.use(request => request, responseErrorHandler)

export default axios;
