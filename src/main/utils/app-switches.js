import { app } from 'electron';

export function applyAppSwitches () {
  app.commandLine.appendSwitch('no-sandbox')
  app.commandLine.appendSwitch('disable-site-isolation-trials')
  app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors')
  app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required')

  // Linux: prefer native Wayland, fall back to X11 if not available.
  // No-op on macOS/Windows (Electron ignores ozone flags there).
  if (process.platform === 'linux') {
    app.commandLine.appendSwitch('ozone-platform-hint', 'auto')
    app.commandLine.appendSwitch('enable-features', 'WaylandWindowDecorations,UseOzonePlatform')
  }
}
