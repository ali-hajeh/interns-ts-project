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
    const id = this.nextId;//the first will get id=1, the next will get i=2,...
    //creat a newtodo to add it to todolist(todomanager)
    const newTodo = { ...todo, id} as T;
    //store in the map
    this.todos.set(id, newTodo);
    this.nextId++;
    return newTodo;
  }

  // TODO: Implement this method to delete a todo by ID
  deleteTodo(id: number): void {
    //check if th id is exist in the map
    if (this.todos.has(id))
    {
      this.todos.delete(id);// delete the todo from the map
      console.log(`todo with id ${id} deleted`);
    }
    //if the id is not exists in the map
    else{
      console.log(`id ${id} not found`);
    }
  }

  // TODO: Implement this method to update an existing todo
  updateTodo(id: number, updates: Partial<Omit<T, "id">>): T {
    const existingtodo = this.todos.get(id);
    if (!existingtodo) {
      throw new Error("Todo not found.");
    }
      const newUpdate = { ...existingtodo, ...updates} as T;
      this.todos.set(id, newUpdate);
      return newUpdate;
  }

  // TODO: Implement this method to get a todo by ID
  getTodoById(id: number): T {
    // retrieve the value associated with a given key
    const todo = this.todos.get(id);
    if (todo){
      return todo;
    }
    else{
      throw new Error(`ID ${id} is not found`);
    }
  }

  // TODO: Implement this method to list all todos
  listTodos(): T[] {
    //convert the map to array + hendiling if the map is empty
    if (this.todos.size != 0)
    { 
      return Array.from(this.todos.values());
    }
    else{
      throw new Error("no todos found");
    }
  }

  // TODO: Implement this method to filter todos based on criteria
  filterTodos(filter: TodoFilter): T[] {
    return Array.from(this.todos.values()).filter((todo) => {
      if (filter.priority && todo.priority !== filter.priority) {
        return false;
      }
      if (filter.status && todo.status !== filter.status) {
        return false;
      }
      if (filter.tags && !filter.tags.every((tag) => todo.tags.includes(tag))) {
        return false;
      }
      return true;
    });
  }

  // TODO: Implement this method to search todos by title or description
  searchTodos(searchTerm: string): T[] { 
    
    return Array.from(this.todos.values()).filter((e) => 
      e.title.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      e.description.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );
    // throw new Error("Method not implemented.");
  }

  // Helper method to validate todo object
  private validateTodo(todo: any): todo is T {
    return isTodo(todo);
  }
}
