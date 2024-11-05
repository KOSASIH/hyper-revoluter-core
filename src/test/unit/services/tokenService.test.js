const TokenService = require('../../../src/services/tokenService');
const { web3 } = require('../../../src/config/web3');

describe('TokenService', () => {
    let tokenService;
    
    beforeEach(() => {
        tokenService = new TokenService();
    });

    describe('calculateTokenAmount', () => {
        it('should correctly calculate token amount with decimals', () => {
            const amount = '1.5';
            const decimals = 18;
            const expected = web3.utils.toWei('1.5', 'ether');
            
            const result = tokenService.calculateTokenAmount(amount, decimals);
            
            expect(result).toBe(expected);
        });

        it('should throw error for invalid amount', () => {
            expect(() => {
                tokenService.calculateTokenAmount('invalid', 18);
            }).toThrow('Invalid amount');
        });
    });

    describe('validateAddress', () => {
        it('should return true for valid ethereum address', () => {
            const address = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
            expect(tokenService.validateAddress(address)).toBe(true);
        });

        it('should return false for invalid ethereum address', () => {
            const address = 'invalid-address';
            expect(tokenService.validateAddress(address)).toBe(false);
        });
    });
});
