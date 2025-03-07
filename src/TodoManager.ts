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

  //  add a new todo
  addTodo(todo: Omit<T, "id">): T {
    const id = this.nextId;
    const newTodo = { ...todo, id};
    if (this.validateTodo(newTodo))
    {
      this.todos.set(id, newTodo);
      this.nextId ++;
      return newTodo;
    }

    throw new Error("Invalid Input");
  }

  //  delete a todo by ID
  deleteTodo(id: number): void {
    if (this.todos.has(id))
    {
      this.todos.delete(id);
      return;
    }
    throw new Error(`id = ${id} is not found.`);
  }

  //  update an existing todo
  updateTodo(id: number, updates: Partial<Omit<T, "id">>): T {
    const todo = this.todos.get(id);
    if (!(this.todos.has(id)))
      throw new Error(`id = ${id} is not found.`);
    const upTodo = { ...todo, ...updates};
    if (this.validateTodo(upTodo)) {
      this.todos.set(id, upTodo);
      return upTodo;
    }

    throw new Error("Invalid input.");
  }

  // get a todo by ID
  getTodoById(id: number): T {
    const todo = this.todos.get(id);
    if(todo)
      return todo;
    throw new TodoNotFoundError(id);
  }

  //  list all todos
  listTodos(): T[] {
    return [...this.todos.values()];
  }

  //  filter todos based on criteria
  filterTodos(filter: TodoFilter): T[] {
      if (!filter.priority && !filter.status && !filter.tags) {
        return Array.from(this.todos.values());
      }
    
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
  

  // search todos by title or description
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
