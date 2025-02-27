import { Factory } from "miragejs";

export default Factory.extend({
  name() {
    const items = ["Pizza", "Burger", "Fries", "Cola"];
    return items[Math.floor(Math.random() * items.length)];
  },
  quantity() {
    return Math.floor(Math.random() * 5) + 1; // 1-5 個
  },
  price() {
    return (Math.random() * 20 + 5).toFixed(2); // 5-25 的隨機價格
  },
});
