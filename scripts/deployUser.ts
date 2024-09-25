import { Address, toNano } from '@ton/core';
import { User } from '../wrappers/User';
import { Main } from '../wrappers/Main';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const compiledCode = await compile('User');
    const codeBase64 = compiledCode.toBoc().toString('base64');
    console.log('Base64 encoded contract code:', codeBase64);

    const user = provider.open(User.createFromConfig({
        owner: provider.sender().address as Address,
        mainDropAddress: provider.sender().address as Address,
        lastTimeDrop: 0n
    }, await compile('User')));

    await user.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(user.address);

    // run methods on `user`
}
