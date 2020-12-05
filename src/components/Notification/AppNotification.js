import React from "react"
import { useStore } from "react-context-hook"
import { STORE_VALUES, useNotifications } from "../../Store"
import Notification from "./Notification"

export default function AppNotification() {
  const [notifications] = useStore(STORE_VALUES.NOTIFICATIONS, [])
  const { removeNotification } = useNotifications()

  function onNotificationClosed(notification) {
    removeNotification(notification)
  }

  return notifications.map(
    (notification) =>
      notification && (
        <Notification
          key={`${notification.id}-${notification.text}`}
          notification={notification}
          isOpen
          onClose={onNotificationClosed}
        />
      )
  )
}
