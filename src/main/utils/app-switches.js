import { app } from 'electron';
import { spawnSync } from 'child_process';
import { existsSync } from 'fs';

// Must match linux.executableName / linux.desktop.StartupWMClass in package.json's
// electron-builder config, so the running window's WM_CLASS (X11/XWayland;
// also read by native Wayland compositors as the app_id) resolves to the
// installed .desktop file (and its icon) instead of falling back to a
// generic placeholder.
const LINUX_WM_CLASS = 'anilibrix-prime'
const RELAUNCH_MARKER = 'ANILIBRIX_LINUX_SWITCHES_APPLIED'

/**
 * NVIDIA's proprietary driver (not Nouveau) has a long-standing bug where
 * Chromium's native Wayland/GBM compositing path never produces a frame —
 * the renderer runs fine (network calls, store fetches all complete) but
 * BrowserWindow's 'ready-to-show' never fires, so the app hangs forever on
 * the splash screen. Confirmed by testing: forcing
 * ELECTRON_OZONE_PLATFORM_HINT=auto correctly resolved --ozone-platform=wayland,
 * and hung; going back to the X11 default (via XWayland, transparent inside
 * the Wayland session) works. /proc/driver/nvidia/version only exists when
 * the proprietary kernel module is loaded — absent for Nouveau/AMD/Intel.
 */
function hasNvidiaProprietaryDriver () {
  return existsSync('/proc/driver/nvidia/version')
}

/**
 * The window's WM_CLASS/app_id and Ozone's platform selection (X11 vs
 * native Wayland) are read by Chromium during native startup, before any of
 * this process's JS runs — app.commandLine.appendSwitch() is called too
 * late to affect either. The only reliable fix is to relaunch the process
 * with them already present in its environment/argv from the start.
 *
 * ELECTRON_OZONE_PLATFORM_HINT=auto lets Ozone pick correctly on its own —
 * native Wayland when the session is Wayland, X11 when it's X11 (e.g. GNOME
 * on X11) — so this isn't a Wayland-only or X11-only fix, both desktops get
 * their native path. The only override is the known-broken NVIDIA case.
 */
function relaunchWithLinuxSwitches () {
  const ozonePlatformHint = hasNvidiaProprietaryDriver() ? 'x11' : 'auto'

  const result = spawnSync(process.execPath, [...process.argv.slice(1), `--class=${LINUX_WM_CLASS}`], {
    stdio: 'inherit',
    env: {
      ...process.env,
      [RELAUNCH_MARKER]: '1',
      ELECTRON_OZONE_PLATFORM_HINT: ozonePlatformHint
    }
  })

  process.exit(result.status ?? 0)
}

export function applyAppSwitches () {
  // WM_CLASS/app_id only matters on Linux, so skip the relaunch elsewhere.
  if (process.platform === 'linux' && !process.env[RELAUNCH_MARKER]) {
    relaunchWithLinuxSwitches()
  }

  app.commandLine.appendSwitch('no-sandbox')
  app.commandLine.appendSwitch('disable-site-isolation-trials')
  app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors')
  app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required')
}
