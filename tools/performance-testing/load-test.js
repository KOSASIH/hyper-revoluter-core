// load-test.js
const { exec } = require('child_process');

function runLoadTest() {
    exec('artillery run load-test.yml', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing load test: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Load test stderr: ${stderr}`);
            return;
        }
        console.log(`Load test output: ${stdout}`);
    });
}

runLoadTest();
