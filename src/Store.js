import { useGetAndSet } from "react-context-hook"

export const STORE_VALUES = {
  NOTIFICATIONS: "app.notifications"
}

export function useNotifications() {
  const [notifications, setNotifications] = useGetAndSet(
    STORE_VALUES.NOTIFICATIONS,
    []
  )

  function addNotification(text) {
    console.log("add notifications", notifications)
    notifications.push({ text, id: notifications.length })
    setNotifications([...notifications])
  }

  function removeNotification(notification) {
    const index = notifications.findIndex((n) => n.id === notification.id)
    notifications.splice(index, 1)
    setNotifications([...notifications])
  }

  return { addNotification, removeNotification }
}
