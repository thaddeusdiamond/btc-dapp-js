import { getHiroWalletAddress, getHiroPaymentAddress, sendBitcoinFromHiro } from "./hiro.js";
import { getUnisatWalletAddress, sendBitcoinFromUnisat } from "./unisat.js";
import { getXVerseWalletAddress, sendBitcoinFromXverse, directInscribeForXVerse } from "./xverse.js";

export const HIRO_WALLET = 'hiro';
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
    case UNISAT_WALLET:
      return await sendBitcoinFromUnisat(btcAmount, address);
    case XVERSE_WALLET:
      return await sendBitcoinFromXverse(btcAmount, address, originator);
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
    default:
      throw `Direct inscriptions not supported for ${walletProvider}`;
  }
}
