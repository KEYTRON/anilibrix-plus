import { c as commonjsGlobal, j as requireElectron, g as getDefaultExportFromCjs, i as app, k as catchTorrentParse, l as catchTorrentStart, n as catchTorrentDestroy, e as electronExports, o as sendTorrentServer, p as sendTorrentDownload, q as sendTorrentClear, t as sendTorrentError } from "./torrents-handler-BtK2vzG6.js";
import parseTorrentData from "parse-torrent";
import http from "http";
import require$$0__default from "path";
import { rimraf } from "rimraf";
import WebTorrent from "webtorrent";
import { SubtitleParser } from "matroska-subtitles";
import "fs";
import "stream";
import "util";
const { parse: $parse, stringify: $stringify } = JSON;
const { keys } = Object;
const Primitive = String;
const primitive = "string";
const ignore = {};
const object = "object";
const noop = (_, value) => value;
const primitives = (value) => value instanceof Primitive ? Primitive(value) : value;
const Primitives = (_, value) => typeof value === primitive ? new Primitive(value) : value;
const resolver = (input, lazy, parsed, $) => (output) => {
  for (let ke = keys(output), { length } = ke, y = 0; y < length; y++) {
    const k = ke[y];
    const value = output[k];
    if (value instanceof Primitive) {
      const tmp = input[+value];
      if (typeof tmp === object && !parsed.has(tmp)) {
        parsed.add(tmp);
        output[k] = ignore;
        lazy.push({ o: output, k, r: tmp });
      } else
        output[k] = $.call(output, k, tmp);
    } else if (output[k] !== ignore)
      output[k] = $.call(output, k, value);
  }
  return output;
};
const set = (known, input, value) => {
  const index = Primitive(input.push(value) - 1);
  known.set(value, index);
  return index;
};
const parse = (text, reviver) => {
  const input = $parse(text, Primitives).map(primitives);
  const $ = noop;
  let value = input[0];
  if (typeof value === object && value) {
    const lazy = [];
    const revive = resolver(input, lazy, /* @__PURE__ */ new Set(), $);
    value = revive(value);
    let i = 0;
    while (i < lazy.length) {
      const { o, k, r } = lazy[i++];
      o[k] = $.call(o, k, revive(r));
    }
  }
  return $.call({ "": value }, "", value);
};
const stringify = (value, replacer, space) => {
  const $ = noop;
  const known = /* @__PURE__ */ new Map();
  const input = [];
  const output = [];
  let i = +set(known, input, $.call({ "": value }, "", value));
  let firstRun = !i;
  while (i < input.length) {
    firstRun = true;
    output[i] = $stringify(input[i++], replace, space);
  }
  return "[" + output.join(",") + "]";
  function replace(key, value2) {
    if (firstRun) {
      firstRun = !firstRun;
      return value2;
    }
    const after = $.call(this, key, value2);
    switch (typeof after) {
      case object:
        if (after === null) return after;
      case primitive:
        return known.get(after) || set(known, input, after);
    }
    return after;
  }
};
var renderer$1 = {};
var remote = {};
var callbacksRegistry = {};
var hasRequiredCallbacksRegistry;
function requireCallbacksRegistry() {
  if (hasRequiredCallbacksRegistry) return callbacksRegistry;
  hasRequiredCallbacksRegistry = 1;
  Object.defineProperty(callbacksRegistry, "__esModule", { value: true });
  callbacksRegistry.CallbacksRegistry = void 0;
  class CallbacksRegistry {
    constructor() {
      this.nextId = 0;
      this.callbacks = {};
      this.callbackIds = /* @__PURE__ */ new WeakMap();
      this.locationInfo = /* @__PURE__ */ new WeakMap();
    }
    add(callback) {
      let id = this.callbackIds.get(callback);
      if (id != null)
        return id;
      id = this.nextId += 1;
      this.callbacks[id] = callback;
      this.callbackIds.set(callback, id);
      const regexp = /at (.*)/gi;
      const stackString = new Error().stack;
      if (!stackString)
        return id;
      let filenameAndLine;
      let match;
      while ((match = regexp.exec(stackString)) !== null) {
        const location = match[1];
        if (location.includes("(native)"))
          continue;
        if (location.includes("(<anonymous>)"))
          continue;
        if (location.includes("callbacks-registry.js"))
          continue;
        if (location.includes("remote.js"))
          continue;
        if (location.includes("@electron/remote/dist"))
          continue;
        const ref = /([^/^)]*)\)?$/gi.exec(location);
        if (ref)
          filenameAndLine = ref[1];
        break;
      }
      this.locationInfo.set(callback, filenameAndLine);
      return id;
    }
    get(id) {
      return this.callbacks[id] || function() {
      };
    }
    getLocation(callback) {
      return this.locationInfo.get(callback);
    }
    apply(id, ...args) {
      return this.get(id).apply(commonjsGlobal, ...args);
    }
    remove(id) {
      const callback = this.callbacks[id];
      if (callback) {
        this.callbackIds.delete(callback);
        delete this.callbacks[id];
      }
    }
  }
  callbacksRegistry.CallbacksRegistry = CallbacksRegistry;
  return callbacksRegistry;
}
var typeUtils = {};
var hasRequiredTypeUtils;
function requireTypeUtils() {
  if (hasRequiredTypeUtils) return typeUtils;
  hasRequiredTypeUtils = 1;
  Object.defineProperty(typeUtils, "__esModule", { value: true });
  typeUtils.deserialize = typeUtils.serialize = typeUtils.isSerializableObject = typeUtils.isPromise = void 0;
  const electron_1 = requireElectron();
  function isPromise(val) {
    return val && val.then && val.then instanceof Function && val.constructor && val.constructor.reject && val.constructor.reject instanceof Function && val.constructor.resolve && val.constructor.resolve instanceof Function;
  }
  typeUtils.isPromise = isPromise;
  const serializableTypes = [
    Boolean,
    Number,
    String,
    Date,
    Error,
    RegExp,
    ArrayBuffer
  ];
  function isSerializableObject(value) {
    return value === null || ArrayBuffer.isView(value) || serializableTypes.some((type) => value instanceof type);
  }
  typeUtils.isSerializableObject = isSerializableObject;
  const objectMap = function(source, mapper) {
    const sourceEntries = Object.entries(source);
    const targetEntries = sourceEntries.map(([key, val]) => [key, mapper(val)]);
    return Object.fromEntries(targetEntries);
  };
  function serializeNativeImage(image) {
    const representations = [];
    const scaleFactors = image.getScaleFactors();
    if (scaleFactors.length === 1) {
      const scaleFactor = scaleFactors[0];
      const size = image.getSize(scaleFactor);
      const buffer = image.toBitmap({ scaleFactor });
      representations.push({ scaleFactor, size, buffer });
    } else {
      for (const scaleFactor of scaleFactors) {
        const size = image.getSize(scaleFactor);
        const dataURL = image.toDataURL({ scaleFactor });
        representations.push({ scaleFactor, size, dataURL });
      }
    }
    return { __ELECTRON_SERIALIZED_NativeImage__: true, representations };
  }
  function deserializeNativeImage(value) {
    const image = electron_1.nativeImage.createEmpty();
    if (value.representations.length === 1) {
      const { buffer, size, scaleFactor } = value.representations[0];
      const { width, height } = size;
      image.addRepresentation({ buffer, scaleFactor, width, height });
    } else {
      for (const rep of value.representations) {
        const { dataURL, size, scaleFactor } = rep;
        const { width, height } = size;
        image.addRepresentation({ dataURL, scaleFactor, width, height });
      }
    }
    return image;
  }
  function serialize(value) {
    if (value && value.constructor && value.constructor.name === "NativeImage") {
      return serializeNativeImage(value);
    }
    if (Array.isArray(value)) {
      return value.map(serialize);
    } else if (isSerializableObject(value)) {
      return value;
    } else if (value instanceof Object) {
      return objectMap(value, serialize);
    } else {
      return value;
    }
  }
  typeUtils.serialize = serialize;
  function deserialize(value) {
    if (value && value.__ELECTRON_SERIALIZED_NativeImage__) {
      return deserializeNativeImage(value);
    } else if (Array.isArray(value)) {
      return value.map(deserialize);
    } else if (isSerializableObject(value)) {
      return value;
    } else if (value instanceof Object) {
      return objectMap(value, deserialize);
    } else {
      return value;
    }
  }
  typeUtils.deserialize = deserialize;
  return typeUtils;
}
var moduleNames = {};
var getElectronBinding = {};
var hasRequiredGetElectronBinding;
function requireGetElectronBinding() {
  if (hasRequiredGetElectronBinding) return getElectronBinding;
  hasRequiredGetElectronBinding = 1;
  Object.defineProperty(getElectronBinding, "__esModule", { value: true });
  getElectronBinding.getElectronBinding = void 0;
  const getElectronBinding$1 = (name) => {
    if (process._linkedBinding) {
      return process._linkedBinding("electron_common_" + name);
    } else if (process.electronBinding) {
      return process.electronBinding(name);
    } else {
      return null;
    }
  };
  getElectronBinding.getElectronBinding = getElectronBinding$1;
  return getElectronBinding;
}
var hasRequiredModuleNames;
function requireModuleNames() {
  if (hasRequiredModuleNames) return moduleNames;
  hasRequiredModuleNames = 1;
  (function(exports$1) {
    var _a, _b;
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.browserModuleNames = exports$1.commonModuleNames = void 0;
    const get_electron_binding_1 = requireGetElectronBinding();
    exports$1.commonModuleNames = [
      "clipboard",
      "nativeImage",
      "shell"
    ];
    exports$1.browserModuleNames = [
      "app",
      "autoUpdater",
      "BaseWindow",
      "BrowserView",
      "BrowserWindow",
      "contentTracing",
      "crashReporter",
      "dialog",
      "globalShortcut",
      "ipcMain",
      "inAppPurchase",
      "Menu",
      "MenuItem",
      "nativeTheme",
      "net",
      "netLog",
      "MessageChannelMain",
      "Notification",
      "powerMonitor",
      "powerSaveBlocker",
      "protocol",
      "pushNotifications",
      "safeStorage",
      "screen",
      "session",
      "ServiceWorkerMain",
      "ShareMenu",
      "systemPreferences",
      "TopLevelWindow",
      "TouchBar",
      "Tray",
      "utilityProcess",
      "View",
      "webContents",
      "WebContentsView",
      "webFrameMain"
    ].concat(exports$1.commonModuleNames);
    const features = get_electron_binding_1.getElectronBinding("features");
    if (((_a = features === null || features === void 0 ? void 0 : features.isDesktopCapturerEnabled) === null || _a === void 0 ? void 0 : _a.call(features)) !== false) {
      exports$1.browserModuleNames.push("desktopCapturer");
    }
    if (((_b = features === null || features === void 0 ? void 0 : features.isViewApiEnabled) === null || _b === void 0 ? void 0 : _b.call(features)) !== false) {
      exports$1.browserModuleNames.push("ImageView");
    }
  })(moduleNames);
  return moduleNames;
}
var hasRequiredRemote;
function requireRemote() {
  if (hasRequiredRemote) return remote;
  hasRequiredRemote = 1;
  (function(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.createFunctionWithReturnValue = exports$1.getGlobal = exports$1.getCurrentWebContents = exports$1.getCurrentWindow = exports$1.getBuiltin = void 0;
    const callbacks_registry_1 = requireCallbacksRegistry();
    const type_utils_1 = requireTypeUtils();
    const electron_1 = requireElectron();
    const module_names_1 = requireModuleNames();
    const get_electron_binding_1 = requireGetElectronBinding();
    const { Promise: Promise2 } = commonjsGlobal;
    const callbacksRegistry2 = new callbacks_registry_1.CallbacksRegistry();
    const remoteObjectCache = /* @__PURE__ */ new Map();
    const finalizationRegistry = new FinalizationRegistry((id) => {
      const ref = remoteObjectCache.get(id);
      if (ref !== void 0 && ref.deref() === void 0) {
        remoteObjectCache.delete(id);
        electron_1.ipcRenderer.send("REMOTE_BROWSER_DEREFERENCE", contextId, id, 0);
      }
    });
    const electronIds = /* @__PURE__ */ new WeakMap();
    const isReturnValue = /* @__PURE__ */ new WeakSet();
    function getCachedRemoteObject(id) {
      const ref = remoteObjectCache.get(id);
      if (ref !== void 0) {
        const deref = ref.deref();
        if (deref !== void 0)
          return deref;
      }
    }
    function setCachedRemoteObject(id, value) {
      const wr = new WeakRef(value);
      remoteObjectCache.set(id, wr);
      finalizationRegistry.register(value, id);
      return value;
    }
    function getContextId() {
      const v8Util = get_electron_binding_1.getElectronBinding("v8_util");
      if (v8Util) {
        return v8Util.getHiddenValue(commonjsGlobal, "contextId");
      } else {
        throw new Error("Electron >=v13.0.0-beta.6 required to support sandboxed renderers");
      }
    }
    const contextId = process.contextId || getContextId();
    process.on("exit", () => {
      const command = "REMOTE_BROWSER_CONTEXT_RELEASE";
      electron_1.ipcRenderer.send(command, contextId);
    });
    const IS_REMOTE_PROXY = Symbol("is-remote-proxy");
    function wrapArgs(args, visited = /* @__PURE__ */ new Set()) {
      const valueToMeta = (value) => {
        if (visited.has(value)) {
          return {
            type: "value",
            value: null
          };
        }
        if (value && value.constructor && value.constructor.name === "NativeImage") {
          return { type: "nativeimage", value: type_utils_1.serialize(value) };
        } else if (Array.isArray(value)) {
          visited.add(value);
          const meta = {
            type: "array",
            value: wrapArgs(value, visited)
          };
          visited.delete(value);
          return meta;
        } else if (value instanceof Buffer) {
          return {
            type: "buffer",
            value
          };
        } else if (type_utils_1.isSerializableObject(value)) {
          return {
            type: "value",
            value
          };
        } else if (typeof value === "object") {
          if (type_utils_1.isPromise(value)) {
            return {
              type: "promise",
              then: valueToMeta(function(onFulfilled, onRejected) {
                value.then(onFulfilled, onRejected);
              })
            };
          } else if (electronIds.has(value)) {
            return {
              type: "remote-object",
              id: electronIds.get(value)
            };
          }
          const meta = {
            type: "object",
            name: value.constructor ? value.constructor.name : "",
            members: []
          };
          visited.add(value);
          for (const prop in value) {
            meta.members.push({
              name: prop,
              value: valueToMeta(value[prop])
            });
          }
          visited.delete(value);
          return meta;
        } else if (typeof value === "function" && isReturnValue.has(value)) {
          return {
            type: "function-with-return-value",
            value: valueToMeta(value())
          };
        } else if (typeof value === "function") {
          return {
            type: "function",
            id: callbacksRegistry2.add(value),
            location: callbacksRegistry2.getLocation(value),
            length: value.length
          };
        } else {
          return {
            type: "value",
            value
          };
        }
      };
      return args.map(valueToMeta);
    }
    function setObjectMembers(ref, object2, metaId, members) {
      if (!Array.isArray(members))
        return;
      for (const member of members) {
        if (Object.prototype.hasOwnProperty.call(object2, member.name))
          continue;
        const descriptor = { enumerable: member.enumerable };
        if (member.type === "method") {
          const remoteMemberFunction = function(...args) {
            let command;
            if (this && this.constructor === remoteMemberFunction) {
              command = "REMOTE_BROWSER_MEMBER_CONSTRUCTOR";
            } else {
              command = "REMOTE_BROWSER_MEMBER_CALL";
            }
            const ret = electron_1.ipcRenderer.sendSync(command, contextId, metaId, member.name, wrapArgs(args));
            return metaToValue(ret);
          };
          let descriptorFunction = proxyFunctionProperties(remoteMemberFunction, metaId, member.name);
          descriptor.get = () => {
            descriptorFunction.ref = ref;
            return descriptorFunction;
          };
          descriptor.set = (value) => {
            descriptorFunction = value;
            return value;
          };
          descriptor.configurable = true;
        } else if (member.type === "get") {
          descriptor.get = () => {
            const command = "REMOTE_BROWSER_MEMBER_GET";
            const meta = electron_1.ipcRenderer.sendSync(command, contextId, metaId, member.name);
            return metaToValue(meta);
          };
          if (member.writable) {
            descriptor.set = (value) => {
              const args = wrapArgs([value]);
              const command = "REMOTE_BROWSER_MEMBER_SET";
              const meta = electron_1.ipcRenderer.sendSync(command, contextId, metaId, member.name, args);
              if (meta != null)
                metaToValue(meta);
              return value;
            };
          }
        }
        Object.defineProperty(object2, member.name, descriptor);
      }
    }
    function setObjectPrototype(ref, object2, metaId, descriptor) {
      if (descriptor === null)
        return;
      const proto = {};
      setObjectMembers(ref, proto, metaId, descriptor.members);
      setObjectPrototype(ref, proto, metaId, descriptor.proto);
      Object.setPrototypeOf(object2, proto);
    }
    function proxyFunctionProperties(remoteMemberFunction, metaId, name) {
      let loaded = false;
      const loadRemoteProperties = () => {
        if (loaded)
          return;
        loaded = true;
        const command = "REMOTE_BROWSER_MEMBER_GET";
        const meta = electron_1.ipcRenderer.sendSync(command, contextId, metaId, name);
        setObjectMembers(remoteMemberFunction, remoteMemberFunction, meta.id, meta.members);
      };
      return new Proxy(remoteMemberFunction, {
        set: (target, property, value) => {
          if (property !== "ref")
            loadRemoteProperties();
          target[property] = value;
          return true;
        },
        get: (target, property) => {
          if (property === IS_REMOTE_PROXY)
            return true;
          if (!Object.prototype.hasOwnProperty.call(target, property))
            loadRemoteProperties();
          const value = target[property];
          if (property === "toString" && typeof value === "function") {
            return value.bind(target);
          }
          return value;
        },
        ownKeys: (target) => {
          loadRemoteProperties();
          return Object.getOwnPropertyNames(target);
        },
        getOwnPropertyDescriptor: (target, property) => {
          const descriptor = Object.getOwnPropertyDescriptor(target, property);
          if (descriptor)
            return descriptor;
          loadRemoteProperties();
          return Object.getOwnPropertyDescriptor(target, property);
        }
      });
    }
    function metaToValue(meta) {
      if (!meta)
        return {};
      if (meta.type === "value") {
        return meta.value;
      } else if (meta.type === "array") {
        return meta.members.map((member) => metaToValue(member));
      } else if (meta.type === "nativeimage") {
        return type_utils_1.deserialize(meta.value);
      } else if (meta.type === "buffer") {
        return Buffer.from(meta.value.buffer, meta.value.byteOffset, meta.value.byteLength);
      } else if (meta.type === "promise") {
        return Promise2.resolve({ then: metaToValue(meta.then) });
      } else if (meta.type === "error") {
        return metaToError(meta);
      } else if (meta.type === "exception") {
        if (meta.value.type === "error") {
          throw metaToError(meta.value);
        } else {
          throw new Error(`Unexpected value type in exception: ${meta.value.type}`);
        }
      } else {
        let ret;
        if ("id" in meta) {
          const cached = getCachedRemoteObject(meta.id);
          if (cached !== void 0) {
            return cached;
          }
        }
        if (meta.type === "function") {
          const remoteFunction = function(...args) {
            let command;
            if (this && this.constructor === remoteFunction) {
              command = "REMOTE_BROWSER_CONSTRUCTOR";
            } else {
              command = "REMOTE_BROWSER_FUNCTION_CALL";
            }
            const obj = electron_1.ipcRenderer.sendSync(command, contextId, meta.id, wrapArgs(args));
            return metaToValue(obj);
          };
          ret = remoteFunction;
        } else {
          ret = {};
        }
        setObjectMembers(ret, ret, meta.id, meta.members);
        setObjectPrototype(ret, ret, meta.id, meta.proto);
        if (ret.constructor && ret.constructor[IS_REMOTE_PROXY]) {
          Object.defineProperty(ret.constructor, "name", { value: meta.name });
        }
        electronIds.set(ret, meta.id);
        setCachedRemoteObject(meta.id, ret);
        return ret;
      }
    }
    function metaToError(meta) {
      const obj = meta.value;
      for (const { name, value } of meta.members) {
        obj[name] = metaToValue(value);
      }
      return obj;
    }
    function hasSenderId(input) {
      return typeof input.senderId === "number";
    }
    function handleMessage(channel, handler) {
      electron_1.ipcRenderer.on(channel, (event, passedContextId, id, ...args) => {
        if (hasSenderId(event)) {
          if (event.senderId !== 0 && event.senderId !== void 0) {
            console.error(`Message ${channel} sent by unexpected WebContents (${event.senderId})`);
            return;
          }
        }
        if (passedContextId === contextId) {
          handler(id, ...args);
        } else {
          electron_1.ipcRenderer.send("REMOTE_BROWSER_WRONG_CONTEXT_ERROR", contextId, passedContextId, id);
        }
      });
    }
    const enableStacks = process.argv.includes("--enable-api-filtering-logging");
    function getCurrentStack() {
      const target = { stack: void 0 };
      if (enableStacks) {
        Error.captureStackTrace(target, getCurrentStack);
      }
      return target.stack;
    }
    handleMessage("REMOTE_RENDERER_CALLBACK", (id, args) => {
      callbacksRegistry2.apply(id, metaToValue(args));
    });
    handleMessage("REMOTE_RENDERER_RELEASE_CALLBACK", (id) => {
      callbacksRegistry2.remove(id);
    });
    exports$1.require = (module) => {
      const command = "REMOTE_BROWSER_REQUIRE";
      const meta = electron_1.ipcRenderer.sendSync(command, contextId, module, getCurrentStack());
      return metaToValue(meta);
    };
    function getBuiltin(module) {
      const command = "REMOTE_BROWSER_GET_BUILTIN";
      const meta = electron_1.ipcRenderer.sendSync(command, contextId, module, getCurrentStack());
      return metaToValue(meta);
    }
    exports$1.getBuiltin = getBuiltin;
    function getCurrentWindow() {
      const command = "REMOTE_BROWSER_GET_CURRENT_WINDOW";
      const meta = electron_1.ipcRenderer.sendSync(command, contextId, getCurrentStack());
      return metaToValue(meta);
    }
    exports$1.getCurrentWindow = getCurrentWindow;
    function getCurrentWebContents() {
      const command = "REMOTE_BROWSER_GET_CURRENT_WEB_CONTENTS";
      const meta = electron_1.ipcRenderer.sendSync(command, contextId, getCurrentStack());
      return metaToValue(meta);
    }
    exports$1.getCurrentWebContents = getCurrentWebContents;
    function getGlobal(name) {
      const command = "REMOTE_BROWSER_GET_GLOBAL";
      const meta = electron_1.ipcRenderer.sendSync(command, contextId, name, getCurrentStack());
      return metaToValue(meta);
    }
    exports$1.getGlobal = getGlobal;
    Object.defineProperty(exports$1, "process", {
      enumerable: true,
      get: () => exports$1.getGlobal("process")
    });
    function createFunctionWithReturnValue(returnValue) {
      const func = () => returnValue;
      isReturnValue.add(func);
      return func;
    }
    exports$1.createFunctionWithReturnValue = createFunctionWithReturnValue;
    const addBuiltinProperty = (name) => {
      Object.defineProperty(exports$1, name, {
        enumerable: true,
        get: () => exports$1.getBuiltin(name)
      });
    };
    module_names_1.browserModuleNames.forEach(addBuiltinProperty);
  })(remote);
  return remote;
}
var hasRequiredRenderer$1;
function requireRenderer$1() {
  if (hasRequiredRenderer$1) return renderer$1;
  hasRequiredRenderer$1 = 1;
  (function(exports$1) {
    var __createBinding = renderer$1 && renderer$1.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = renderer$1 && renderer$1.__exportStar || function(m, exports$12) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$12, p)) __createBinding(exports$12, m, p);
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    if (process.type === "browser")
      throw new Error(`"@electron/remote" cannot be required in the browser process. Instead require("@electron/remote/main").`);
    __exportStar(requireRemote(), exports$1);
  })(renderer$1);
  return renderer$1;
}
var renderer;
var hasRequiredRenderer;
function requireRenderer() {
  if (hasRequiredRenderer) return renderer;
  hasRequiredRenderer = 1;
  renderer = requireRenderer$1();
  return renderer;
}
var rendererExports = requireRenderer();
const remoteRenderer = /* @__PURE__ */ getDefaultExportFromCjs(rendererExports);
const torrentClient = new WebTorrent();
const store = {
  servers: {},
  // servers instances for torrents
  vttServers: {},
  torrents: {},
  // torrents instances
  handlers: {}
  // update handlers
};
const torrentPath = require$$0__default.join(remoteRenderer.app.getPath("temp"), app.build.appId);
const startTorrent = async ({
  torrentId,
  fileIndex = 0
} = {}) => {
  console.log("Start Torrent", {
    torrentId,
    fileIndex
  });
  if (torrentClient) {
    if (store.torrents[torrentId]) store.torrents[torrentId].destroy();
    const t = await electronExports.ipcRenderer.invoke("getTorrent", torrentId);
    console.log("Torrent", t);
    torrentClient.add(t.magnet, { path: torrentPath }, async (torrent) => {
      try {
        torrent.files.sort((a, b) => a.name.localeCompare(b.name));
        const file = torrent.files[fileIndex];
        torrent.files.forEach((file2) => file2.deselect());
        torrent.deselect(0, torrent.pieces.length - 1, false);
        if (file) torrent.select(file._startPiece, file._endPiece, false);
        if (!file) throw "Requested torrent file index was not found";
        store.torrents[torrentId] = torrent;
        const result = await _startServer({
          torrentId,
          torrent
        });
        sendTorrentServer({
          ...result,
          torrentId
        });
        if (store.handlers[torrentId]) clearInterval(store.handlers[torrentId]);
        store.handlers[torrentId] = setInterval(() => {
          sendTorrentDownload({
            torrentId,
            speed: torrent.downloadSpeed,
            seeding: torrent.uploadSpeed,
            files: (torrent.files || []).map((file2) => {
              return {
                name: file2.name,
                progress: file2.progress,
                downloaded: file2.downloaded
              };
            })
          });
          console.log("Torrent Download:", {
            torrentId,
            fileIndex,
            name: file.name,
            path: file.path,
            speed: torrent.downloadSpeed,
            length: file.length,
            seeding: torrent.uploadSpeed,
            progress: file.progress,
            downloaded: file.downloaded
          });
        }, 2e3);
      } catch (error) {
        _sendError({
          torrentId,
          message: "An error occurred while initializing the torrent file",
          error
        });
      }
    });
  } else {
    _sendError({
      torrentId,
      message: "Torrent not found"
    });
  }
};
const destroyTorrent = async ({ torrentId }) => {
  try {
    if (store.servers[torrentId]) {
      console.log("Destroy Server", {
        torrentId,
        server: parse(stringify(store.servers[torrentId]))
      });
      console.log("Destroy VTT Server", {
        torrentId,
        server: parse(stringify(store.vttServers[torrentId]))
      });
      store.servers[torrentId].close();
      store.servers[torrentId] = null;
      if (store.vttServers[torrentId]) {
        store.vttServers[torrentId].close();
        store.vttServers[torrentId] = null;
      }
    }
    if (store.handlers[torrentId]) {
      clearInterval(store.handlers[torrentId]);
    }
    if (store.torrents[torrentId]) {
      const torrentFilePath = store.torrents[torrentId].path;
      await rimraf(torrentFilePath);
      console.log("Destroy Torrent", { torrentId, path: torrentFilePath });
      store.torrents[torrentId].destroy();
      store.torrents[torrentId] = null;
      sendTorrentClear({ torrentId });
    }
  } catch (error) {
    _sendError({
      torrentId,
      message: "An error occurred while stopping and destroying the torrent file",
      error
    });
  }
};
const _startServer = ({
  torrentId,
  torrent
}) => {
  return new Promise((resolve, reject) => {
    try {
      const parser = new SubtitleParser();
      const server = torrent.createServer();
      const vttServer = http.createServer(async (req, res) => {
        const url = req.url.slice(1, -4);
        const {
          host,
          fileName,
          fileIndex
        } = JSON.parse(decodeURIComponent(url));
        const fileUrl = `${host}/${fileIndex}/${fileName}`;
        parser.on("subtitle", (subtitle, trackNumber) => console.log("Track " + trackNumber + ":", subtitle));
        http.get(fileUrl, (stream) => stream.pipe(parser).pipe(res));
      });
      store.servers[torrentId] = server;
      store.vttServers[torrentId] = vttServer;
      server.listen(0, () => {
        vttServer.listen(0, () => {
          const url = `http://localhost:${server.address().port}`;
          const vttUrl = `http://localhost:${vttServer.address().port}`;
          console.log("Start Server", {
            torrentId,
            server: parse(stringify(server)),
            url
          });
          console.log("Start VTT Server", {
            server: parse(stringify(vttServer)),
            vttUrl
          });
          resolve({
            url,
            server,
            vttUrl,
            vttServer,
            torrentId
          });
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};
const _sendError = ({
  torrentId,
  message = null,
  error = null
} = {}) => {
  console.log("Torrent Error", {
    torrentId,
    error,
    message
  });
  sendTorrentError({
    torrentId,
    error,
    message
  });
};
(() => {
  catchTorrentParse((payload) => parseTorrentData(payload));
  catchTorrentStart((payload) => startTorrent(payload));
  catchTorrentDestroy((payload) => destroyTorrent(payload));
})();
