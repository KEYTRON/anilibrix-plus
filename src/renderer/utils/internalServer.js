import remote from '@electron/remote'

function getInternalServerPort () {
  const port = remote.getGlobal('internalServerPort')

  if (!port) {
    throw new Error('Internal server port is not initialized')
  }

  return port
}

export function getInternalServerOrigin () {
  return `http://127.0.0.1:${getInternalServerPort()}`
}

export function getInternalServerUrl (pathname = '') {
  return `${getInternalServerOrigin()}${pathname}`
}

