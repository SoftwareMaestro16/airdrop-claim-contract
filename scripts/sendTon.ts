import { toNano, Address, Cell, Sender } from '@ton/core';
import { User } from '../wrappers/User';
import { compile, NetworkProvider } from '@ton/blueprint';

const MAIN_ADDRESS: string = "kQBNrsNuYIB-KHuHfsSGTQlDx99fAvWDdLjOcfmL55lgPv1W";

export async function run(provider: NetworkProvider) {
    const main = provider.open(User.createFromAddress(Address.parse(MAIN_ADDRESS)));
    await main.sendTon(provider.sender(), toNano('0.15'));
}
