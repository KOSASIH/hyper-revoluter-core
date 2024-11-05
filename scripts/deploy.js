// deploy.js
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Define paths
const buildDir = path.join(__dirname, '../build');
const serverPath = '/var/www/hyper-revoluter-core'; // Example server path

// Upload files to the server
function deployFiles() {
    return new Promise((resolve, reject) => {
        exec(`rsync -avz ${buildDir}/ ${serverPath}/`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error during deployment: ${stderr}`);
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
        await deployFiles();
        console.log('Deployment completed successfully!');
    } catch (error) {
        console.error('Deployment failed:', error);
    }
}

main();
