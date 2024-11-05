// stress-test.js
const { exec } = require('child_process');

function runStressTest() {
    exec('artillery run stress-test.yml', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing stress test: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stress test stderr: ${stderr}`);
            return;
        }
        console.log(`Stress test output: ${stdout}`);
    });
}

runStressTest();
