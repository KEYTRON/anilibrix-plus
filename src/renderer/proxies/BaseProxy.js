import __get from 'lodash/get'
import axios from '@plugins/axios'
import { getLocale, translate } from '@/i18n'
import { getInternalServerOrigin, getInternalServerUrl } from '@utils/internalServer'
import { meta, version } from '@package'

export default class BaseProxy {
  /**
   * The method used to perform an AJAX-request.
   *
   * @param method
   * @param {string}  url The URL for the request.
   * @param parameters
   *
   * @returns {Promise} The result in a promise.
   */
  async submit (method, url, parameters = {}) {
    // Set headers
    // Add user-agent
    const headers = { ...parameters.headers, ...await this.getRequestHeaders() }

    // Make request
    // eslint-disable-next-line no-return-await
    return await axios.request({
      url,
      method, ...parameters,
      headers,
      timeout: 20000
    })
  }

  /**
   * Parse base response model
   *
   * @param response
   * @return {*}
   */
  handleResponse (response) {
    const data = __get(response, 'data', null)
    const status = __get(response, 'status', false)
    const message = __get(response, 'error.message', translate('errors.requestFailed', {}, getLocale()))

    if (status === true) {
      return data
    } else {
      throw new Error(message)
    }
  }

  /**
   * Get api endpoint url
   *
   * @return {string}
   */
  getApiEndpoint () {
    return getInternalServerUrl('/public/api/index.php')
  }

  getTorrentEndpoint () {
    return `${getInternalServerOrigin()}/`
  }

  getApiLoginEndpoint () {
    return getInternalServerUrl('/public/login.php')
  }

  getApiLogoutEndpoint () {
    return getInternalServerUrl('/public/logout.php')
  }

  /**
   * Get static endpoint url
   *
   * @return {string}
   */
  getStaticEndpoint () {
    return `${getInternalServerUrl('/proxy-static?url=')}`
  }

  /**
   * Get form data from provided data object
   *
   * @param data
   * @return {FormData}
   */
  getFormDataObject (data = null) {
    // Create form data object
    const formData = new FormData()

    // Set data
    Object.keys(data || {})
      .forEach(key => formData.append(key, typeof (data[key]) === 'object' ? JSON.stringify(data[key]) : data[key]))

    // Return form data
    return formData
  }

  /**
   * Get default request headers
   *
   * @return {{}}
   */
  async getRequestHeaders () {
    const headers = {}
    // Note: browsers forbid JS from setting "User-Agent" — let it default.

    // Attach PHPSESSID via X-PHPSESSID custom header.
    // Browsers forbid JS from setting Cookie directly, so the internal
    // server reads X-PHPSESSID and forwards it as the Cookie header upstream.
    // Lazy import to avoid circular dependency: BaseProxy → store → AccountProxy → BaseProxy.
    try {
      const { useAccountStore } = await import('@store/app/account/useAccountStore')
      const session = useAccountStore().session
      if (session && session.length > 0) {
        headers['x-phpsessid'] = session
      }
    } catch (e) { /* store may not be ready yet */ }

    return headers
  }
}
