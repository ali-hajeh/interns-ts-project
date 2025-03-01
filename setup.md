# TypeScript Project

Simple TypeScript project setup.

## Setup Instructions

### 1. Install NVM (Node Version Manager)

#### On macOS/Linux:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

#### On Windows:

Download and run nvm.exe from the provided link: https://github.com/coreybutler/nvm-windows/releases

### 2. Use NVM to install Node.js

```bash
# Install the latest LTS version of Node.js
nvm install --lts

# Use the installed version
nvm use --lts
```

### 3. Install PNPM

```bash
npm install -g pnpm
```

### 4. Project Setup

```bash
# Install dependencies
pnpm install

# OPTION 1: Run in development mode (one-time execution)
pnpm dev

# OPTION 2: Run in development mode with auto-restart on file changes
pnpm dev:watch

# OR

# OPTION 3: Build the project and run the built version
pnpm build
pnpm start
```

### Development Scripts

- `dev`: Runs the application once using ts-node without compiling to JavaScript. Ideal for quick testing or one-time execution.
- `dev:watch`: Runs the application using nodemon and ts-node, which automatically restarts the application whenever you make changes to the source files. Perfect for active development.
- `build`: Compiles TypeScript code to JavaScript in the dist/ directory.
- `start`: Runs the compiled JavaScript code from the dist/ directory.

## Project Structure

- `src/` - Contains all TypeScript source files
  - `index.ts` - Main entry point of the application
- `dist/` - Contains compiled JavaScript files (generated after build)
- `package.json` - Project configuration and dependencies
- `tsconfig.json` - TypeScript compiler configuration
