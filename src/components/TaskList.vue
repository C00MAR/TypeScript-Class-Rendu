<template>
  <div class="task-manager p-4">
    <div class="mb-4">
      <h2 class="text-2xl font-bold mb-4">Gestionnaire de Tâches</h2>

      <form @submit.prevent="addTask" class="mb-4">
        <input
          v-model="newTask.title"
          class="border p-2 mr-2 rounded text-black"
          placeholder="Titre"
          required
        />
        <input
          v-model="newTask.description"
          class="border p-2 mr-2 rounded text-black"
          placeholder="Description"
          required
        />
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Ajouter</button>
      </form>

      <div class="mb-4">
        <button
          @click="setSortStrategy(new AlphabeticalSort())"
          class="bg-gray-200 px-3 py-1 rounded mr-2 text-black"
        >
          Tri Alphabétique
        </button>
        <button
          @click="setSortStrategy(new CompletionSort())"
          class="bg-gray-200 px-3 py-1 rounded mr-2 text-black"
        >
          Tri par État
        </button>
      </div>

      <div class="space-y-2">
        <div
          v-for="task in store.sortedTasks"
          :key="task.id"
          class="border p-3 rounded flex items-center justify-between"
          :class="{ 'bg-gray-100 text-gray-600': task.completed }"
        >
          <div>
            <h3 class="font-bold" :class="{ 'line-through': task.completed }">
              {{ task.title }}
            </h3>
            <p class="text-sm text-gray-600">{{ task.description }}</p>
          </div>
          <div>
            <button @click="toggleTask(task.id)" class="text-blue-500 mr-2">
              {{ task.completed ? 'Réouvrir' : 'Terminer' }}
            </button>
            <button @click="deleteTask(task.id)" class="text-red-500">Supprimer</button>
          </div>
        </div>
      </div>
    </div>

    <div class="fixed bottom-4 right-4">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="bg-green-500 text-white p-3 rounded mb-2"
      >
        {{ notification.message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTaskStore } from '../stores/TaskStore'
import { NotificationSystem } from '../observers/NotificationSystem'
import { AlphabeticalSort, CompletionSort } from '../strategies/SortStrategy'

const store = useTaskStore()
const notifications = ref<{ id: number; message: string }[]>([])
const newTask = ref({ title: '', description: '' })

onMounted(() => {
  NotificationSystem.getInstance().subscribe((message) => {
    const notification = { id: Date.now(), message }
    notifications.value.push(notification)
    setTimeout(() => {
      notifications.value = notifications.value.filter((n) => n.id !== notification.id)
    }, 3000)
  })
})

const addTask = () => {
  store.addTask(newTask.value.title, newTask.value.description)
  newTask.value = { title: '', description: '' }
}

const toggleTask = (taskId: string) => {
  store.toggleTask(taskId)
}

const deleteTask = (taskId: string) => {
  store.deleteTask(taskId)
}

const setSortStrategy = (strategy: AlphabeticalSort | CompletionSort) => {
  store.setSortStrategy(strategy)
}
</script>
