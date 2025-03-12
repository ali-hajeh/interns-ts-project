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
    const newTodo = { ...todo, id: this.nextId++ } as T;
    this.todos.set(newTodo.id, newTodo);
    return newTodo;
  }

  // TODO: Implement this method to delete a todo by ID
  deleteTodo(id: number): void {
    if (!this.todos.has(id)) {
      throw new TodoNotFoundError(id);
    }
    this.todos.delete(id);
  }

  // TODO: Implement this method to update an existing todo
  updateTodo(id: number, updates: Partial<Omit<T, "id">>): T {
    if (!this.todos.has(id)) {
      throw new TodoNotFoundError(id);
    }
    const updatedTodo = { ...this.todos.get(id)!, ...updates } as T;
    this.todos.set(id, updatedTodo);
    return updatedTodo;
  }

  // TODO: Implement this method to get a todo by ID
  getTodoById(id: number): T {
    const todo = this.todos.get(id);
    if (!todo) {
      throw new TodoNotFoundError(id);
    }
    return todo;
  }

  // TODO: Implement this method to list all todos
  listTodos(): T[] {
    return Array.from(this.todos.values());
  }

  // TODO: Implement this method to filter todos based on criteria
  filterTodos(filter: TodoFilter): T[] {
    return Array.from(this.todos.values()).filter(todo =>
      Object.keys(filter).every((key) => 
        filter[key as keyof TodoFilter] === todo[key as keyof T]
      )
    )
};

  

  // TODO: Implement this method to search todos by title or description
  searchTodos(searchTerm: string): T[] {
    return Array.from(this.todos.values()).filter(todo =>
      todo.title.includes(searchTerm) || todo.description.includes(searchTerm)
    );
  }

  // Helper method to validate todo object
  private validateTodo(todo: any): todo is T {
    return isTodo(todo);
  }
}
