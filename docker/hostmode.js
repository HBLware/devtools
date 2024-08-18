import { access, appendFileSync, copyFileSync, chmodSync, constants, createReadStream, existsSync, mkdirSync, readdirSync, readFileSync, rmdirSync, statSync, unlink } from 'fs';
import dotenv from 'dotenv';
import path, { resolve } from 'path';
import * as http from 'http';
import { spawn, spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import * as readline from 'node:readline';

dotenv.config();

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/////// Runnign docker compose app ///////////////////////////////
const dockerCompose = spawn('docker-compose', ['-p', 'orkid', 'up', '-d'], {
    cwd: '../', // This sets the working directory to the root folder, where your docker-compose.yml file is located
    stdio: 'inherit' // This makes sure that output from the command is piped to the parent process (your Node.js app)
  });
  
  // Handle the events from the child process
  dockerCompose.on('close', (code) => {
    console.log(`docker-compose process exited with code ${code}`);
    if (code !== 0) {
      console.error('There was an error starting Docker Compose.');
    }
  });
  
  dockerCompose.on('error', (err) => {
    console.error('Failed to start docker-compose:', err);
  });
//////////////////////////////////////////////////////////////////