export function getSwiperImages() {
  return fetch('https://randomfox.ca/floof/').then((res) => res.json())
}
