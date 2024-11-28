type NotificationListener = (message: string) => void

export class NotificationSystem {
  private static instance: NotificationSystem
  private listeners: NotificationListener[] = []

  static getInstance(): NotificationSystem {
    if (!this.instance) {
      this.instance = new NotificationSystem()
    }
    return this.instance
  }

  subscribe(listener: NotificationListener) {
    this.listeners.push(listener)
  }

  notify(message: string) {
    this.listeners.forEach((listener) => listener(message))
  }
}
