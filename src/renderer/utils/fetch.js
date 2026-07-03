// DNS lookup is Node.js-only. In the renderer (browser context), we skip the
// wwnd.space IP workaround and rely on native fetch with redirect following.

const DOMAIN = 'wwnd.space'
const OLD_IP = '78.46.255.254'
const NEW_IP = '31.184.217.238'

let fixWwndChecked = false
let fixWwwdNeeded = false

function isSelfSignedCertificateError (error) {
  return error?.cause?.code === 'DEPTH_ZERO_SELF_SIGNED_CERT' ||
    error?.code === 'DEPTH_ZERO_SELF_SIGNED_CERT'
}

function canTemporarilyDisableTlsValidation () {
  if (typeof process === 'undefined' || !process.versions?.node) {
    return false
  }

  return typeof process.env === 'object'
}

async function checkWwnd () {
  if (fixWwndChecked) return
  try {
    // Use DNS-over-HTTPS to resolve the domain without Node.js dns module
    const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${DOMAIN}&type=A`, {
      headers: { Accept: 'application/dns-json' }
    })
    const data = await res.json()
    const answer = data?.Answer?.find(a => a.type === 1)
    if (answer?.data === OLD_IP) {
      fixWwwdNeeded = true
      console.log('EU IP OF WWND.SPACE FOUND, ENABLE REWRITE')
    }
  } catch (e) {
    // Ignore DNS check failure — proceed without rewrite
  }
  fixWwndChecked = true
}

export async function catGirlFetch (url, init = {}) {
  await checkWwnd()

  const u = new URL(url)
  if (fixWwwdNeeded && u.host === DOMAIN) {
    url = url.replace(DOMAIN, NEW_IP)
    if (!init.headers) init.headers = {}
    init.headers.Host = DOMAIN
    console.log('FIX WWND.SPACE REQUEST')
  }

  init.redirect = 'follow'

  try {
    return await fetch(url, init)
  } catch (error) {
    if (isSelfSignedCertificateError(error) && canTemporarilyDisableTlsValidation()) {
      const previousValue = process.env.NODE_TLS_REJECT_UNAUTHORIZED

      try {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
        console.warn('Retrying request with certificate checks disabled', url)
        return await fetch(url, init)
      } finally {
        if (previousValue === undefined) {
          delete process.env.NODE_TLS_REJECT_UNAUTHORIZED
        } else {
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = previousValue
        }
      }
    }

    throw error
  }
}
