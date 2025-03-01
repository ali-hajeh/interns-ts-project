export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum Status {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  priority: Priority;
  status: Status;
  tags: string[];
}

export interface TodoFilter {
  priority?: Priority;
  status?: Status;
  tags?: string[];
}

// Custom error types
export class TodoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TodoError";
  }
}

export class TodoNotFoundError extends TodoError {
  constructor(id: number) {
    super(`Todo with id ${id} not found`);
    this.name = "TodoNotFoundError";
  }
}

// Type guard example
export function isTodo(obj: any): obj is Todo {
  return (
    typeof obj === "object" &&
    typeof obj.id === "number" &&
    typeof obj.title === "string" &&
    typeof obj.description === "string" &&
    obj.dueDate instanceof Date &&
    Object.values(Priority).includes(obj.priority) &&
    Object.values(Status).includes(obj.status) &&
    Array.isArray(obj.tags) &&
    obj.tags.every((tag: any) => typeof tag === "string")
  );
}
