const util = require('@nx-js/observer-util')
const morph = require('nanomorph')
const bel = require('bel')
const { observable, observe, unobserve, isObservable, raw } = util
let index = 0

function melo (strings) {
  if (!(strings instanceof Array) || !strings.raw) return melo.observable(strings)
  let args = Array.from(arguments)
  
  // render initial element
  let id = index++
  const element = bel.apply(bel, args.map(arg => arg.__ ? raw(devirtualize(arg)) : arg))
  element.id = element.id || id
    
  // update via nanomorph on state changes
  const reaction = observe(() => {
    let update = bel.apply(bel, args.map(arg => arg.__ ? arg.__.selector.reduce((prev, next) => prev[next], arg.__.root) : arg))
    update.id = update.id || id
    morph(element, update)
  })
  element.unobserve = () => unobserve(reaction)
  
  return element
}

Object.assign(melo, util)

melo.observable = function (obj) {
  return virtualize(observable(obj))
}

module.exports = melo

// track properties accessed
function virtualize (thing, __) {
  if (thing === undefined) return thing
  return new Proxy(Object(thing), {
    get: function (target, key) {
      if (!__ || __.root == target) __ = { selector: [], root: thing }
      if (key == '__') return __
      __.selector.push(key)
      __.parent = thing
      __.value = thing[key]
      return virtualize(target[key], __)
    },
    set: function (target, key, val) {
      return thing[key] = val
    },
    apply: function (target, thisArg, args) {
      return thing.apply(__.parent, args)
    }
  })
}

function devirtualize (proxy) {
  return proxy.__.value
}