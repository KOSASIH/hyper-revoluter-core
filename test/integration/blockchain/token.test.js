const { web3 } = require('../../../src/config/web3');
const TokenContract = require('../../../src/blockchain/contracts/MyToken.json');
const { setupBlockchain } = require('../setup/blockchain');

describe('Token Contract Integration Tests', () => {
    let tokenContract;
    let accounts;

    beforeAll(async () => {
        ({ tokenContract, accounts } = await setupBlockchain());
    });

    describe('Token Operations', () => {
        it('should transfer tokens between accounts', async () => {
            const amount = web3.utils.toWei('1', 'ether');
            const sender = accounts[0];
            const receiver = accounts[1];

            const initialBalance = await tokenContract.methods
                .balanceOf(receiver)
                .call();

            await tokenContract.methods
                .transfer(receiver, amount)
                .send({ from: sender });

            const finalBalance = await tokenContract.methods
                .balanceOf(receiver)
                .call();

            expect(web3.utils.toBN(finalBalance))
                .toEqual(web3.utils.toBN(initialBalance).add(web3.utils.toBN(amount)));
        });
    });
});
