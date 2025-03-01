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

  // TODO: Implement this method to add a new todo
  addTodo(todo: Omit<T, "id">): T {
    throw new Error("Method not implemented.");
  }

  // TODO: Implement this method to delete a todo by ID
  deleteTodo(id: number): void {
    throw new Error("Method not implemented.");
  }

  // TODO: Implement this method to update an existing todo
  updateTodo(id: number, updates: Partial<Omit<T, "id">>): T {
    throw new Error("Method not implemented.");
  }

  // TODO: Implement this method to get a todo by ID
  getTodoById(id: number): T {
    throw new Error("Method not implemented.");
  }

  // TODO: Implement this method to list all todos
  listTodos(): T[] {
    throw new Error("Method not implemented.");
  }

  // TODO: Implement this method to filter todos based on criteria
  filterTodos(filter: TodoFilter): T[] {
    throw new Error("Method not implemented.");
  }

  // TODO: Implement this method to search todos by title or description
  searchTodos(searchTerm: string): T[] {
    throw new Error("Method not implemented.");
  }

  // Helper method to validate todo object
  private validateTodo(todo: any): todo is T {
    return isTodo(todo);
  }
}
