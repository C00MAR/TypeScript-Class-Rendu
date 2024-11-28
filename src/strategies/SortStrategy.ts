import type { Task } from '@/type/Task'

export interface SortStrategy {
  sort(tasks: Task[]): Task[]
}

export class AlphabeticalSort implements SortStrategy {
  sort(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => a.title.localeCompare(b.title))
  }
}

export class CompletionSort implements SortStrategy {
  sort(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1))
  }
}
