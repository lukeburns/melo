let melo = require('./')

let state = melo({ time: Date.now(), clicks: 0 })

let clock = melo`<div id="clock">
  Time: ${state.time}
</div>`

document.body = melo`<body onclick=${() => state.clicks++}>
  ${clock}
  <div id="clicks">Clicks: ${state.clicks}</div>
</body>`

setInterval(() => state.time = Date.now(), 1)

// note: still need to be thoughtful about caching, so that embedded elements are not clobbered when parent elements are re-rendered using nanomorph. see https://github.com/choojs/nanomorph#caching-dom-elements. Setting ids avoids problems.

// note 2: currently only works for state objects (not arrays). todo: distinguish between tagged template literals, arrays, and objects.