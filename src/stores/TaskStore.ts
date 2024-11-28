import { TaskFactory } from '@/factories/TaskFactory'
import { NotificationSystem } from '@/observers/NotificationSystem'
import { AlphabeticalSort, type SortStrategy } from '@/strategies/SortStrategy'
import type { Task } from '@/type/Task'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],
    currentSortStrategy: new AlphabeticalSort() as SortStrategy,
  }),

  actions: {
    addTask(title: string, description: string) {
      const task = TaskFactory.createTask(title, description)
      this.tasks.push(task)
      NotificationSystem.getInstance().notify(`Tâche "${title}" créée`)
    },

    toggleTask(taskId: string) {
      const task = this.tasks.find((t) => t.id === taskId)
      if (task) {
        task.completed = !task.completed
        NotificationSystem.getInstance().notify(
          `Tâche "${task.title}" ${task.completed ? 'terminée' : 'réouverte'}`,
        )
      }
    },

    deleteTask(taskId: string) {
      const taskIndex = this.tasks.findIndex((t) => t.id === taskId)
      if (taskIndex !== -1) {
        const task = this.tasks[taskIndex]
        this.tasks.splice(taskIndex, 1)
        NotificationSystem.getInstance().notify(`Tâche "${task.title}" supprimée`)
      }
    },

    setSortStrategy(strategy: SortStrategy) {
      this.currentSortStrategy = strategy
    },
  },

  getters: {
    sortedTasks: (state) => state.currentSortStrategy.sort(state.tasks),
  },
})
