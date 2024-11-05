// build.js
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Define paths
const srcDir = path.join(__dirname, '../src');
const buildDir = path.join(__dirname, '../build');

// Clean the build directory
function cleanBuildDir() {
    if (fs.existsSync(buildDir)) {
        fs.rmdirSync(buildDir, { recursive: true });
    }
    fs.mkdirSync(buildDir);
}

// Build the application
function buildApp() {
    return new Promise((resolve, reject) => {
        exec('webpack --config webpack.prod.js', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error during build: ${stderr}`);
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
        cleanBuildDir();
        await buildApp();
        console.log('Build completed successfully!');
    } catch (error) {
        console.error('Build failed:', error);
    }
}

main();
