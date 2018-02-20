# melo

composable, reactive dom elements using tagged template literals

```js
npm install melo
```

powered by [bel](https://github.com/shama/bel), [nanomorph](https://github.com/choojs/nanomorph), and [observer-util](https://github.com/nx-js/observer-util)

## example

```js
const melo = require('melo')

let state = melo({ time: Date.now(), clicks: 0 })

let clock = melo`<div>
  Time: ${state.time}
</div>`

document.body = melo`<body onclick=${() => state.clicks++}>
  <div>Clicks: ${state.clicks}</div>
  ${clock}
</body>`

setInterval(() => state.time = Date.now(), 1)
```