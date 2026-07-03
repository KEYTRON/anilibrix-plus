// Proxy
import BaseProxy from '@proxies/BaseProxy'

// Utils
import __get from 'lodash/get'
import cookieParser from 'set-cookie-parser'
import { getLocale, translate } from '@/i18n'

export default class AccountProxy extends BaseProxy {
  /**
   * Login
   *
   * @param login
   * @param password
   * @return {Promise<*>}
   */
  async login ({
    login,
    password
  }) {
    const data = this.getFormDataObject({
      mail: login,
      passwd: password,
      fa2code: ''
    })
    const params = {
      data
    }

    try {
      const response = await this.submit('POST', this.getApiLoginEndpoint(), params)

      const status = __get(response, 'data.err')

      // Get status
      // If err === 'ok' -> authorization is success
      if (status === 'ok') {
        // Parse header cookies — browsers hide Set-Cookie from JS, so the
        // internal server mirrors it into x-set-cookie-b64 (base64 for safety).
        let headerCookies = __get(response, 'headers.set-cookie', null)
        if (!headerCookies) {
          const b64 = __get(response, 'headers.x-set-cookie-b64', null)
          if (b64) {
            try {
              const decoded = atob(b64)
              headerCookies = decoded.split('\n')
            } catch (_) {}
          }
        }
        const cookies = cookieParser(headerCookies, { map: true })
        const session = __get(cookies, 'PHPSESSID.value', null)

        // Get session
        // If session is not defined -> throw error
        if (session && session.length > 0) {
          return session
        } else {
          throw new Error(translate('errors.sessionUndefined', {}, getLocale()))
        }
      } else {
        throw new Error(__get(response, 'data.mes', translate('errors.serverError', {}, getLocale())))
      }
    } catch (e) {
      // Re throw non http errors
      if (!e.code) {
        throw e
      }

      // System errors line ENOTFOUND
      throw new Error(`${translate('errors.authFailed', {}, getLocale())}: ${e.message}`)
    }
  }

  /**
   * Logout
   *
   * @return {Promise<*>}
   */
  async logout () {
    // eslint-disable-next-line no-return-await
    return await this.submit('POST', this.getApiLogoutEndpoint())
  }

  /**
   * Get profile
   *
   * @return {Promise<*>}
   */
  async getProfile () {
    const data = this.getFormDataObject({ query: 'user' })
    const params = {
      data
    }
    const response = await this.submit('POST', this.getApiEndpoint(), params)

    return this.handleResponse(response.data)
  }

  /**
   * Get profile avatar
   *
   * @param src
   * @return {string|null}
   */
  getAvatarPath (src) {
    return src ? this.getStaticEndpoint() + src : null
  }
}
