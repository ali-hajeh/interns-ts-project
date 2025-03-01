/**
 * Basic TypeScript Project
 */

import { TodoManager } from "./TodoManager";
import { Todo, Priority, Status } from "./types/todo";
import * as readline from "readline";

const todoManager = new TodoManager<Todo>();

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Helper function to ask questions
function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

// Helper function to display the menu
function displayMenu(): void {
  console.log("\n=== Todo Manager ===");
  console.log("1. Add Todo");
  console.log("2. List All Todos");
  console.log("3. Get Todo by ID");
  console.log("4. Update Todo");
  console.log("5. Delete Todo");
  console.log("6. Filter Todos");
  console.log("7. Search Todos");
  console.log("8. Exit");
  console.log("==================\n");
}

// Helper function to get priority from user input
function getPriority(input: string): Priority {
  switch (input.toUpperCase()) {
    case "LOW":
      return Priority.LOW;
    case "MEDIUM":
      return Priority.MEDIUM;
    case "HIGH":
      return Priority.HIGH;
    default:
      throw new Error("Invalid priority");
  }
}

// Helper function to get status from user input
function getStatus(input: string): Status {
  switch (input.toUpperCase()) {
    case "NOT_STARTED":
      return Status.NOT_STARTED;
    case "IN_PROGRESS":
      return Status.IN_PROGRESS;
    case "COMPLETED":
      return Status.COMPLETED;
    default:
      throw new Error("Invalid status");
  }
}

async function addTodo(): Promise<void> {
  try {
    const title = await ask("Enter todo title: ");
    const description = await ask("Enter todo description: ");
    const dueDateStr = await ask("Enter due date (YYYY-MM-DD): ");
    const priorityStr = await ask("Enter priority (LOW/MEDIUM/HIGH): ");
    const statusStr = await ask(
      "Enter status (NOT_STARTED/IN_PROGRESS/COMPLETED): "
    );
    const tagsStr = await ask("Enter tags (comma-separated): ");

    const newTodo = todoManager.addTodo({
      title,
      description,
      dueDate: new Date(dueDateStr),
      priority: getPriority(priorityStr),
      status: getStatus(statusStr),
      tags: tagsStr.split(",").map((tag) => tag.trim()),
    });

    console.log("\nTodo added successfully:", newTodo);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error adding todo:", error.message);
    }
  }
}

async function main() {
  while (true) {
    displayMenu();
    const choice = await ask("Enter your choice (1-8): ");

    try {
      switch (choice) {
        case "1":
          await addTodo();
          break;
        case "2":
          console.log("\nAll Todos:", todoManager.listTodos());
          break;
        case "3":
          const id = parseInt(await ask("Enter todo ID: "));
          console.log("\nTodo:", todoManager.getTodoById(id));
          break;
        case "4":
          // TODO: Implement update todo
          console.log("Update todo - Not implemented yet");
          break;
        case "5":
          const deleteId = parseInt(await ask("Enter todo ID to delete: "));
          todoManager.deleteTodo(deleteId);
          console.log("\nTodo deleted successfully");
          break;
        case "6":
          const filterType = await ask("Filter by (priority/status): ");
          if (filterType.toLowerCase() === "priority") {
            const priority = await ask("Enter priority (LOW/MEDIUM/HIGH): ");
            console.log(
              "\nFiltered Todos:",
              todoManager.filterTodos({ priority: getPriority(priority) })
            );
          } else if (filterType.toLowerCase() === "status") {
            const status = await ask(
              "Enter status (NOT_STARTED/IN_PROGRESS/COMPLETED): "
            );
            console.log(
              "\nFiltered Todos:",
              todoManager.filterTodos({ status: getStatus(status) })
            );
          }
          break;
        case "7":
          const searchTerm = await ask("Enter search term: ");
          console.log("\nSearch Results:", todoManager.searchTodos(searchTerm));
          break;
        case "8":
          console.log("\nGoodbye!");
          rl.close();
          return;
        default:
          console.log("\nInvalid choice. Please try again.");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("\nError:", error.message);
      }
    }
  }
}

// Start the application
main().catch(console.error);
