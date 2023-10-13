import { getAddress, sendBtcTransaction, createInscription } from 'sats-connect';

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

export async function directInscribeForXVerse(contentType, payloadType, content, additionalFee, feeRate) {
  let txHash = undefined;
  const createInscriptionReq = {
    payload: {
      network: {
        type: 'Mainnet'
      },
      contentType: contentType,
      payloadType: payloadType,
      content: content,
      appFeeAddress: additionalFee?.address,
      appFee: additionalFee?.sats,
      suggestedMinerFeeRate: feeRate
    },
    onFinish: (response) => {
      txHash = response.txId;
    },
    onCancel: () => {
      throw 'User declined to provide wallet access';
    }
  }

  await createInscription(createInscriptionReq);
  return txHash;
}
