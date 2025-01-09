import { toNano, Address, Cell } from '@ton/core';
import { Main } from '../wrappers/Main';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const compiledCode = await compile('Main');
    const codeBase64 = compiledCode.toBoc().toString('base64');
    console.log('Base64 encoded contract code:', codeBase64);

    const main = provider.open(Main.createFromConfig({
        owner: provider.sender().address as Address,
        userDropCode: await compile("User"),
        toClaim: BigInt(0.03 * 10**9),
        isLocked: 0
    }, await compile('Main')));

    await main.sendDeploy(provider.sender(), toNano('0.05'));
    await provider.waitForDeploy(main.address);
}
