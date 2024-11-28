import type { Task } from '@/type/Task'

export class TaskFactory {
  static createTask(title: string, description: string): Task {
    return {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      createdAt: new Date(),
    }
  }
}
