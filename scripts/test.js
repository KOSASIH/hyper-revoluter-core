// test.js
const { exec } = require('child_process');

// Run tests
function runTests() {
    return new Promise((resolve, reject) => {
        exec('jest --coverage', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error during tests: ${stderr}`);
                return reject(error);
            }
            console.log(stdout);
            resolve();
        });
    });
}

// Main function
async function main() {
    try {
        await runTests();
        console.log('All tests completed successfully!');
    } catch (error) {
        console.error('Tests failed:', error);
    }
}

main();
