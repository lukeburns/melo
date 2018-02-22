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

setInterval(() => state.time = Date.now(), 1)

document.body = melo`<body>
  Time: ${state.time}
</body>`
```
