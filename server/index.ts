#!/usr/bin/env node

/**
 * Next.js Development Server Launcher
 * 
 * This file redirects the old Express workflow to Next.js
 * The application has been migrated from Express to Next.js 14
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('🚀 Starting Next.js development server...');
console.log('📁 Project root:', projectRoot);

// Start Next.js dev server
const nextProcess = spawn('npx', ['next', 'dev', '--port', '5000'], {
  cwd: projectRoot,
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'development'
  }
});

nextProcess.on('error', (error) => {
  console.error('❌ Failed to start Next.js:', error);
  process.exit(1);
});

nextProcess.on('exit', (code) => {
  console.log(`Next.js exited with code ${code}`);
  process.exit(code || 0);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down Next.js server...');
  nextProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down Next.js server...');
  nextProcess.kill('SIGTERM');
});
