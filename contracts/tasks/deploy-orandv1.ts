/* eslint-disable no-await-in-loop */
import '@nomiclabs/hardhat-ethers';
import { BigNumber } from 'ethers';
import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { Deployer, NATIVE_UNIT, printAllEvents } from '../helpers';
import { OrandECVRF } from '../typechain-types';
import { OrandProviderV1 } from '../typechain-types/OradProvider.sol';

task('deploy:orand', 'Deploy multi signature v1 contract').setAction(
  async (_taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    const accounts = await hre.ethers.getSigners();
    const deployer: Deployer = Deployer.getInstance(hre).connect(accounts[0]);
    const bigOToken = await deployer.contractDeploy('test/BigO', []);
    const orandECVRF = <OrandECVRF>await deployer.contractDeploy('OrandV1/OrandECVRF', []);
    const orandProviderV1 = <OrandProviderV1>await deployer.contractDeploy(
      'OrandV1/OrandProviderV1',
      [],
      // This public key is corresponding to 0x7e9e03a453867a7046B0277f6cD72E1B59f67a0e
      [
        '0x46b01e9550b56f3655dbca90cfe6b31dec3ff137f825561c563444096803531e',
        '0x9d4f6e8329d300483a919b63843174f1fca692fc6d2c07b985f72386e4edc846',
      ],
      // Operator address
      '0x7e9e03a453867a7046B0277f6cD72E1B59f67a0e',
      orandECVRF.address,
      accounts[0].address,
      bigOToken.address,
      BigNumber.from(NATIVE_UNIT).mul(100),
    );

    deployer.printReport();
  },
);

export default {};
