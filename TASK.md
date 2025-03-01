## TypeScript Task: Building a Command-Line Todo Manager

### Learning Objectives

- Understanding TypeScript's type system
- Working with interfaces and type definitions
- Using enums for better code organization
- Implementing generics for reusable code
- Using type guards for runtime type checking
- Handling errors properly in TypeScript

### Task Description

Create a command-line Todo Manager that allows users to manage their tasks. The application should demonstrate your understanding of TypeScript's core features.

### Requirements

1. **Data Types**

   - Create an interface `Todo` with the following properties:
     - `id`: unique identifier (number)
     - `title`: task title (string)
     - `description`: task description (string)
     - `dueDate`: due date (Date)
     - `priority`: priority level (enum: LOW, MEDIUM, HIGH)
     - `status`: status of the todo (enum: NOT_STARTED, IN_PROGRESS, COMPLETED)
     - `tags`: array of strings

2. **Task Manager Class**

   - Create a `TodoManager` class that uses generics to manage the todos
   - Implement the following methods:
     - `addTodo`: Add a new todo
     - `deleteTodo`: Remove a todo by ID
     - `updateTodo`: Update an existing todo
     - `getTodoById`: Retrieve a specific todo
     - `listTodos`: List all todos
     - `filterTodos`: Filter todos by status or priority
     - `searchTodos`: Search todos by title or description

3. **Error Handling**

   - Create custom error types for different scenarios
   - Implement proper error handling using try-catch blocks
   - Use type guards to ensure type safety

4. **Storage**
   - Implement in-memory storage using appropriate data structures
   - (Optional) Add persistence by saving to a JSON file

### Bonus Challenges

1. Add sorting functionality (by due date, priority, etc.)
2. Implement undo/redo functionality
3. Add data validation for todo properties
4. Create unit tests for your code

### Example Usage

```typescript
const todoManager = new TodoManager();

// Adding a todo
const newTodo: Todo = {
  id: 1,
  title: "Complete TypeScript Task",
  description: "Implement the todo manager using TypeScript",
  dueDate: new Date("2024-03-10"),
  priority: Priority.HIGH,
  status: Status.NOT_STARTED,
  tags: ["typescript", "learning"],
};

todoManager.addTodo(newTodo);

// Filtering todos
const highPriorityTodos = todoManager.filterTodos({ priority: Priority.HIGH });
```

### Evaluation Criteria

1. Proper use of TypeScript features
2. Code organization and clarity
3. Error handling implementation
4. Type safety
5. Documentation and comments

### Getting Started

1. Create necessary interfaces and enums in separate files
2. Implement the TodoManager class
3. Create a main file to demonstrate the functionality
4. Add proper error handling
5. Test your implementation

### Tips

- Use TypeScript's strict mode
- Leverage IDE features for type checking
- Write clear documentation for your code
- Follow TypeScript best practices
