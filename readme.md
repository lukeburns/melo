# melo

composable, reactive dom elements

```js
npm install melo
```

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