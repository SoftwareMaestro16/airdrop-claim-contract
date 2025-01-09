import { toNano, Address, Cell, Sender } from '@ton/core';
import { Main } from '../wrappers/Main';
import { compile, NetworkProvider } from '@ton/blueprint';

const MAIN_ADDRESS: string = "EQCxPD4SAfqZCcDZZzWsKEhldMDXZtmFF1LOiqbJC1SbDRmE";

export async function run(provider: NetworkProvider) {
    const main = provider.open(Main.createFromAddress(Address.parse(MAIN_ADDRESS)));
    await main.sendGetTon(provider.sender(), toNano('0.05'));
}
