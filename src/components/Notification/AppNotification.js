import React from "react"
import { useStore } from "react-context-hook"
import { STORE_VALUES } from "../../Store"
import Notification from "./Notification"

export default function AppNotification() {
  const [notifications] = useStore(STORE_VALUES.NOTIFICATIONS, [])
  return notifications.map((notification) => (
    <Notification
      key={`${notification.id}-${notification.text}`}
      notification={notification}
      isOpen
    />
  ))
}
