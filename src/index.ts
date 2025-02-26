/**
 * Basic TypeScript Project
 */

// Example function
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Main execution
function main(): void {
  const message = greet("TypeScript");
  console.log(message);
  console.log("TypeScript project is running!");
}

main();
