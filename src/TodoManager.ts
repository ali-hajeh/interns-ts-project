import {
  Todo,
  TodoFilter,
  TodoNotFoundError,
  Priority,
  Status,
  isTodo,
} from "./types/todo";

export class TodoManager<T extends Todo> {
  private todos: Map<number, T>;
  private nextId: number;

  constructor() {
    this.todos = new Map<number, T>();
    this.nextId = 1;
  }

  // Add a new todo
  addTodo(todo: Omit<T, "id">): T {
    const newTodo = { ...todo, id: this.nextId };
    if (this.validateTodo(newTodo)) {
      this.todos.set(this.nextId, newTodo);
      this.nextId++;
      return newTodo;
    }
    throw new Error("Invalid Todo data.");
  }

  // Delete a todo by ID
  deleteTodo(id: number): void {
    if (!this.todos.has(id)) {
      throw new TodoNotFoundError(id);
    }
    this.todos.delete(id);
  }

  // Update an existing todo
  updateTodo(id: number, updates: Partial<Omit<T, "id">>): T {
    const todo = this.todos.get(id);
    if (!todo) {
      throw new TodoNotFoundError(id);
    }

    const updatedTodo = { ...todo, ...updates };

    if (this.validateTodo(updatedTodo)) {
      this.todos.set(id, updatedTodo);
      return updatedTodo;
    }
    throw new Error("Invalid Todo data.");
  }

  // Get a todo by ID
  getTodoById(id: number): T {
    const todo = this.todos.get(id);
    if (!todo) {
      throw new TodoNotFoundError(id);
    }
    return todo;
  }

  // List all todos
  listTodos(): T[] {
    return Array.from(this.todos.values());
  }

  // Filter todos based on criteria
  filterTodos(filter: TodoFilter): T[] {
    return Array.from(this.todos.values()).filter((todo) => {
      let matches = true;
      if (filter.priority && todo.priority !== filter.priority) {
        matches = false;
      }
      if (filter.status && todo.status !== filter.status) {
        matches = false;
      }
      if (filter.tags && !filter.tags.every((tag) => todo.tags.includes(tag))) {
        matches = false;
      }
      return matches;
    });
  }

  // Search todos by title or description
  searchTodos(searchTerm: string): T[] {
    return Array.from(this.todos.values()).filter(
      (todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Helper method to validate todo object
  private validateTodo(todo: any): todo is T {
    return isTodo(todo);
  }
}

