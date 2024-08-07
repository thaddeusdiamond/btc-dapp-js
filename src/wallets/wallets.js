import { getHiroWalletAddress, getHiroPaymentAddress, sendBitcoinFromHiro } from "./hiro.js";
import { getOkxAddress, sendBitcoinFromOkx } from "./okx.js";
import { getPhantomAddress } from "./phantom.js";
import { getUnisatWalletAddress, sendBitcoinFromUnisat } from "./unisat.js";
import { getXVerseWalletAddress, sendBitcoinFromXverse, directInscribeForXVerse } from "./xverse.js";

export const HIRO_WALLET = 'hiro';
export const OKX_WALLET = 'okx';
export const PHANTOM_WALLET = 'phantom';
export const UNISAT_WALLET = 'unisat';
export const XVERSE_WALLET = 'xverse';

export const PAYMENT_TYPE = 'payment';
export const ORDINALS_TYPE = 'ordinals';

export const PAYLOAD_TYPES = {
  text: 'PLAIN_TEXT',
  base64: 'BASE_64'
}

export function defaultLogo(walletProvider) {
  switch (walletProvider) {
    case HIRO_WALLET:
      return "https://assets.website-files.com/62cd53cfaed4257f165f6576/632b19335916e41bfcd20268_favicon-32x32.png";
    case OKX_WALLET:
      return "https://www.okx.com/cdn/assets/plugins/2022/01/07104210.png?x-oss-process=image/auto-orient,1/quality,q_90/format,webp";
    case PHANTOM_WALLET:
      return "https://187760183-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-MVOiF6Zqit57q_hxJYp%2Fuploads%2FHEjleywo9QOnfYebBPCZ%2FPhantom_SVG_Icon.svg?alt=media&token=71b80a0a-def7-4f98-ae70-5e0843fdaaec";
    case UNISAT_WALLET:
      return "https://unisat.io/img/favicon.ico";
    case XVERSE_WALLET:
      return "https://assets.website-files.com/624b08d53d7ac60ccfc11d8d/64637a04ad4e523a3e07675c_32x32.png";
    default:
      return undefined;
  }
}

export async function getWalletAddress(walletProvider, walletType) {
  switch (walletProvider) {
    case HIRO_WALLET:
      if (walletType === PAYMENT_TYPE) {
        return await getHiroPaymentAddress();
      } else if (walletType === ORDINALS_TYPE) {
        return await getHiroWalletAddress();
      }
    case OKX_WALLET:
      return await getOkxAddress();
    case PHANTOM_WALLET:
      return await getPhantomAddress(walletType);
    case UNISAT_WALLET:
      return await getUnisatWalletAddress();
    case XVERSE_WALLET:
      return await getXVerseWalletAddress(walletType);
    default:
      return '';
  }
}

export async function signPsbt(walletProvider, psbtHex) {
  switch (walletProvider) {
    case HIRO_WALLET:
      return await window.btc?.request('signPsbt', { hex: psbtHex });
    case OKX_WALLET:
      return await window.okxwallet?.bitcoin.signPsbt(psbtHex);
    case PHANTOM_WALLET:
      return await window?.phantom?.bitcoin.signPSBT(psbtHex);
    case UNISAT_WALLET:
      return await window.unisat?.signPsbt(psbtHex);
    case XVERSE_WALLET:
    default:
      throw `PSBTs not supported for ${walletProvider}`;
  }
}

export async function sendBtc(walletProvider, address, btcAmount, originator) {
  switch (walletProvider) {
    case HIRO_WALLET:
      return await sendBitcoinFromHiro(btcAmount, address);
    case OKX_WALLET:
      return await sendBitcoinFromOkx(btcAmount, address)
    case UNISAT_WALLET:
      return await sendBitcoinFromUnisat(btcAmount, address);
    case XVERSE_WALLET:
      return await sendBitcoinFromXverse(btcAmount, address, originator);
    case PHANTOM_WALLET:
    default:
      throw `Sending BTC not supported for ${walletProvider}`;
  }
}

export async function directInscribe(walletProvider, contentType, payloadType, content, additionalFee, feeRate) {
  switch (walletProvider) {
    case XVERSE_WALLET:
      return await directInscribeForXVerse(contentType, payloadType, content, additionalFee, feeRate);
    case HIRO_WALLET:
    case UNISAT_WALLET:
    case OKX_WALLET: // TODO: OKX does support direct inscribe through its mint endpoint
    case PHANTOM_WALLET:
    default:
      throw `Direct inscriptions not supported for ${walletProvider}`;
  }
}
