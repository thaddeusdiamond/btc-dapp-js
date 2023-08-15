import { getHiroWalletAddress, getHiroPaymentAddress, sendBitcoinFromHiro } from "./hiro.js";
import { getUnisatWalletAddress, sendBitcoinFromUnisat } from "./unisat.js";
import { getXVerseWalletAddress, sendBitcoinFromXverse } from "./xverse.js";

export const HIRO_WALLET = 'hiro';
export const UNISAT_WALLET = 'unisat';
export const XVERSE_WALLET = 'xverse';

export const PAYMENT_TYPE = 'payment';
export const ORDINALS_TYPE = 'ordinals';

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
