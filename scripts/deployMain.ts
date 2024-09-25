import { toNano, Address, Cell } from '@ton/core';
import { Main } from '../wrappers/Main';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const compiledCode = await compile('Main');
    const codeBase64 = compiledCode.toBoc().toString('base64');
    console.log('Base64 encoded contract code:', codeBase64);

    const main = provider.open(Main.createFromConfig({
        owner: provider.sender().address as Address,
        userDropCode: Cell.fromBase64("te6cckEBCAEAoQABFP8A9KQT9LzyyAsBAgFiAgMAatBsIiDHAJFb4AHQ0wMwcbCRMODTHzDtRNDTHwH4YfpAAfhi+kAB+GPRghBIxnGwutyEE/LwAgFIBAUAL7uaXtRNDTHwH4YfpAAfhi+kAB+GPR+EOAIBagYHAC+uMPaiaGmPgPww/SAA/DF9IAD8Mej8IMAAL60FdqJoaY+A/DD9IAD8MX0gAPwx6PwhQJ5AlUc="),
        isLocked: 0
    }, await compile('Main')));

    await main.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(main.address);

    // run methods on `main`
}