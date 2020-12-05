const RESTAURANT_IMAGES = {
  "1": {
    url: "anna-pelzer-IGfIGP5ONV0-unsplash.jpg",
    credit:
      "https://unsplash.com/photos/IGfIGP5ONV0?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
  },
  "2": {
    url: "carissa-gan-_0JpjeqtSyg-unsplash.jpg",
    credit:
      "https://unsplash.com/photos/_0JpjeqtSyg?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
  },
  "3": {
    url: "kelvin-zyteng-Z5tSnuGuTTw-unsplash.jpg",
    credit:
      "https://unsplash.com/photos/Z5tSnuGuTTw?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
  }
}

export function getRestaurantImage(id) {
  return `/images/${RESTAURANT_IMAGES[id].url}`
}
export function getRestaurantImageCredit(id) {
  return RESTAURANT_IMAGES[id].credit
}
