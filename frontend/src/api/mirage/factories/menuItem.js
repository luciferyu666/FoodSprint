import { Factory } from "miragejs";

export default Factory.extend({
  name() {
    const items = ["Margherita Pizza", "Cheeseburger", "French Fries", "Soda"];
    return items[Math.floor(Math.random() * items.length)];
  },
  price() {
    return (Math.random() * 30 + 10).toFixed(2); // 10-40 的隨機價格
  },
  available() {
    return Math.random() > 0.2; // 80% 機率為可用
  },
});
