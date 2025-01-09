import { toNano, Address, Cell, Sender } from '@ton/core';
import { Main } from '../wrappers/Main';
import { compile, NetworkProvider } from '@ton/blueprint';

const MAIN_ADDRESS: string = "EQDNNAGgNRY0WRxzyP-_u7xfpZwzo8RBqebM95F97ApB6e5T";

export async function run(provider: NetworkProvider) {
    const main = provider.open(Main.createFromAddress(Address.parse(MAIN_ADDRESS)));
    await main.sendGetTon(provider.sender(), toNano('0.05'));
}
