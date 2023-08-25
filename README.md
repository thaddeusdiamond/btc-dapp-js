<p align="center">
  <h1 align="center">btc-dapp-js</h1>
  <p align="center">A library for convenient functions to use in BTC/Ordinals dApps</p>
  <p align="center">
    <img src="https://img.shields.io/github/commit-activity/m/thaddeusdiamond/btc-dapp-js?style=for-the-badge" />
    <a href="https://www.npmjs.com/package/btc-dapp-js">
      <img src="https://img.shields.io/npm/v/btc-dapp-js?style=for-the-badge" />
    </a>
    <a href="https://www.npmjs.com/package/btc-dapp-js">
      <img src="https://img.shields.io/npm/dw/btc-dapp-js?style=for-the-badge" />
    </a>
    <img src="https://img.shields.io/npm/l/btc-dapp-js?style=for-the-badge" />
    <a href="https://twitter.com/wildtangz">
      <img src="https://img.shields.io/twitter/follow/wildtangz?style=for-the-badge&logo=twitter" />
    </a>
  </p>
</p>

## Quickstart

Recommend prerequisites for running a local NPM webapp:

* [node](https://nodejs.org/en/download/)>=16.15.1
* [npm](https://www.npmjs.com/package/npm)>=8.12.0

### Installation

Please link `btc-dapp-js` at the latest version in your `package.json` file
and then run:

```
npm i btc-dapp-js
```

### Static Javascript Linkage

A compiled version of this library is generated with each release using webpack.  To link it directly from your HTML code, please use (and optionally include the integrity attribute):
```html
<script src="https://cdn.jsdelivr.net/npm/btc-dapp-js@latest/dist/btc-dapp-js.js" crossorigin="anonymous" type="text/javascript"></script>
```

### API Samples

From your React app or JavaScript client-side application, you can retrieve a user's Ordinals address with:
```js
const ordinalsAddr = await Wallets.getWalletAddress(walletProvider, Wallets.ORDINALS_TYPE);
```

Note that the `getWalletAddress` parameters are `walletProvider` and `addressType`.  See `wallets.js` in `src/wallets/` for the full list (e.g., hiro, unisat, xverse).

Then, to initiate spending for the user, your JS app would call:
```js
const txid = await Wallets.sendBtc(walletProvider, destAddr, amountSats, fromAddr);
```

## Testing

TBA

## Documentation

All documentation is provided herein in the README.
