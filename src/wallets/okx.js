export async function getOkxAddress() {
  const okxwallet = window.okxwallet;
  if (typeof okxwallet === 'undefined') {
    throw 'OKX Wallet is not installed';
  }
  try {
    const accounts = await okxwallet.bitcoin.requestAccounts();
    if (accounts.length < 1) {
      throw `Invalid number of accounts: ${accounts.length} accounts detected`;
    }
    return accounts[0];
  } catch (e) {
    throw `Could not connect to OKX: ${e}`;
  }
}

export async function sendBitcoinFromOkx(btcAmount, address) {
  const response = await window.okxwallet?.bitcoin.sendBitcoin(address, btcAmount);
  return response.txhash;
}