export async function getPhantomAddress(walletType) {
  const bitcoin = window?.phantom?.bitcoin;
  if (!bitcoin?.isPhantom) {
    throw 'Phantom Wallet is not installed';
  }
  try {
    const accounts = await bitcoin.requestAccounts();
    for (const account of accounts) {
      if (account.purpose === walletType) {
        return account.address;
      }
    }
    throw `No wallet of ${walletType} detected.`;
  } catch (error) {
    throw `Could not detect wallet: ${error}`;
  }
}