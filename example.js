let melo = require('./')

let state = melo({ time: Date.now(), clicks: 0 })

let clock = melo`<div id="clock">
  Time: ${state.time}
</div>`

document.body = melo`<body onclick=${() => state.clicks++}>
  <div>Clicks: ${state.clicks}</div>
  ${clock}
</body>`

setInterval(() => state.time = Date.now(), 1)
