export function toggleSidebar(res) {
  return {
    type: "TOGGLE_SIDEBAR",
    payload: res
  }
}

export function showNotification(showNotice, message, type) {
  return {
    type: "SHOW_NOTIFICATION",
    payload: {
      showNotice: showNotice,
      message: message,
      type: type
    }
  }
}

export function ShowGameLink(Link) {
  return {
      type: "SHOW_GAME",
      payload: Link
  }
}