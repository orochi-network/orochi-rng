import fs from 'fs';
import { HardhatUserConfig } from 'hardhat/types';
import { env } from './env';
import '@nomicfoundation/hardhat-toolbox';

if (fs.existsSync('./typechain-types')) {
  const dir = fs.opendirSync(`${__dirname}/tasks`);
  for (let entry = dir.readSync(); entry !== null; entry = dir.readSync()) {
    if (entry.name.toLowerCase().includes('.ts')) {
      // eslint-disable-next-line import/no-dynamic-require
      require(`./tasks/${entry.name.replace(/\.ts$/gi, '')}`);
    }
  }
}

const compilers = ['0.8.7'].map((item: string) => ({
  version: item,
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
}));

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    // Hard hat network
    hardhat: {
      chainId: 911,
      hardfork: 'london',
      blockGasLimit: 30000000,
      initialBaseFeePerGas: 0,
      gas: 25000000,
      accounts: {
        mnemonic: env.OROCHI_MNEMONIC,
        path: "m/44'/60'/0'/0",
      },
      // Are we going to forking mainnet for testing?
      forking: env.OROCHI_FORK
        ? {
            url: env.OROCHI_RPC,
            enabled: true,
          }
        : undefined,
    },
  },
  solidity: {
    compilers,
  },
};

export default config;
