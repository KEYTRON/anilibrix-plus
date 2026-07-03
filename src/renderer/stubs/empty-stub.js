let electron = null
let Storage = null
let storage = null

try {
  electron = Function('return require("electron")')()
  Storage = Function('return require("electron-store")')()
  storage = new Storage({
    name: 'anilibrix_safe',
    clearInvalidConfig: true
  })
} catch (error) {
  console.warn('Failed to initialize renderer storage shim', error)
}

export default {}

export const start = () => {}
export const stop = () => {}

export const remove = (prop) => {
  storage?.delete(prop)
}

export const setEncrypted = (prop, string) => {
  if (!storage || !electron?.safeStorage?.isEncryptionAvailable()) {
    return false
  }

  const encryptedString = electron.safeStorage.encryptString(string).toString('base64')
  storage.set(prop, encryptedString)
  return encryptedString
}

export const getEncrypted = (prop) => storage?.get(prop) ?? null

export const getDecrypted = (prop) => {
  if (!storage || !electron?.safeStorage?.isEncryptionAvailable()) {
    return false
  }

  const data = storage.get(prop)

  if (data === undefined) {
    return false
  }

  return electron.safeStorage.decryptString(Buffer.from(data, 'base64'))
}
