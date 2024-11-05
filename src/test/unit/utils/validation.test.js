const { validateEmail, validatePassword } = require('../../../src/utils/validation');

describe('Validation Utils', () => {
    describe('validateEmail', () => {
        it('should return true for valid email', () => {
            expect(validateEmail('test@example.com')).toBe(true);
        });

        it('should return false for invalid email', () => {
            expect(validateEmail('invalid-email')).toBe(false);
        });
    });

    describe('validatePassword', () => {
        it('should return true for valid password', () => {
            expect(validatePassword('StrongPass123!')).toBe(true);
        });

        it('should return false for weak password', () => {
            expect(validatePassword('weak')).toBe(false);
        });
    });
});
