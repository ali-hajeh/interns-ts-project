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
  const newadd = {...todo,id: this.nextId} as T;//create new todo,creat a shallow copy of the todo,add new id 
  this.todos.set(this.nextId,newadd);//store in the map add the new add into the todos map
  this.nextId++;//increment prepare for the next todo
  return newadd;//return the new created
  }

  // TODO: Implement this method to delete a todo by ID
  deleteTodo(id: number): void {
    //check if id exists
    if(!this.todos.has(id)){//check if id dosen't exist in the map
    throw new Error("not found");
     }
    //delete
    this.todos.delete(id);// if exists in the map remove it
    
    }

  // TODO: Implement this method to update an existing todo
  updateTodo(id: number, updates: Partial<Omit<T, "id">>): T//unique id,user can provide only some properties to update,omit ensure that the id cannot be update 
  {
//check
if(!this.todos.has(id))// if id dosen't exist
{
  
  throw new Error("not found");
}
//get => create new update not same id
const currentid = this.todos.get(id);//retreive the currect todo
const updatedtodo = {...currentid,...updates} as T;
//save , return
this.todos.set(id,updatedtodo);
return updatedtodo;

  }

  // TODO: Implement this method to get a todo by ID
  getTodoById(id: number): T 
  {//check
    if(!this.todos.get(id))
      {
    throw new Error(`id ${id} not found`);
     }
     //retreive and return
    return(this.todos.get(id) as T);
  }

  // TODO: Implement this method to list all todos
  listTodos(): T[] {//check if there are todos or no 
    if(this.todos.size == 0){//get the number of items
    throw new Error("No todos");}
    return Array.from(this.todos.values());//retreive all stored todo 
  }

  // TODO: Implement this method to filter todos based on criteria
  filterTodos(filter: TodoFilter): T[] {
   
   return Array.from(this.todos.values()).filter(todo =>{
    return (
      (filter.status ? todo.status === filter.status :true) &&
      (filter.priority ? todo.priority === filter.priority : true)  &&
      (filter.tags ? filter.tags.every(tag => todo.tags?.includes(tag)) :true) 
    )
   })

  }

  // TODO: Implement this method to search todos by title or description
  searchTodos(searchTerm: string): T[] {//this string will be used to search within the title or description of the todos
    //first check for the empty searc
    if(!searchTerm){
    throw new Error("Cannot be empty !");}
    return Array.from(this.todos.values()).filter((e) => 
      e.title.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
    e.description.toLowerCase().includes(searchTerm.trim().toLowerCase())

    );
  }

  // Helper method to validate todo object
  private validateTodo(todo: any): todo is T { 
    return isTodo(todo);
  }
}
 