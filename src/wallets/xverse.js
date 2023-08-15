import { getAddress, sendBtcTransaction } from 'sats-connect';

export function defaultXVerseLogo() {
  return "https://assets.website-files.com/624b08d53d7ac60ccfc11d8d/64637a04ad4e523a3e07675c_32x32.png";
}

export async function getXVerseWalletAddress(walletType) {
  var addresses = undefined;
  const getAddressOptions = {
    payload: {
      purposes: [walletType],
      message: 'The application will use this to receive your inscriptions and request payments',
      network: {
        type: 'Mainnet'
      },
    },
    onFinish: (response) => {
      addresses = response.addresses;
    },
    onCancel: () => {
      throw 'User declined to provide wallet access';
    }
  }

  await getAddress(getAddressOptions);
  if (!addresses) {
    throw 'Could not retrieve Ordinals wallet address';
  }
  console.log(addresses);
  return addresses[0].address;
}

export async function sendBitcoinFromXverse(amount, address, originator) {
  if (!originator) {
    throw 'XVerse requires an origination (sender) address';
  }
  var txHash = undefined;
  console.log(amount, address);
  const sendBtcOptions = {
    payload: {
      amountSats: amount.toString(),
      senderAddress: originator,
      recipients: [{
        address: address,
        amountSats: amount
      }],
      network: {
        type: 'Mainnet'
      },
    },
    onFinish: (response) => {
      txHash = response;
    },
    onCancel: () => {
      throw 'User declined to provide wallet access';
    }
  }

  await sendBtcTransaction(sendBtcOptions);
  return txHash;
}
