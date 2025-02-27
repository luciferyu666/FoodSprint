import { Factory } from "miragejs";

export default Factory.extend({
  name(i) {
    const names = ["Pizza Hut", "McDonald's", "KFC", "Subway"];
    return `${names[i % names.length]} Store ${i + 1}`;
  },
  location() {
    const locations = ["Taipei", "Kaohsiung", "Taichung", "Tainan"];
    return locations[Math.floor(Math.random() * locations.length)];
  },
  cuisine() {
    const cuisines = ["Fast Food", "Italian", "Chinese", "Japanese"];
    return cuisines[Math.floor(Math.random() * cuisines.length)];
  },
  rating() {
    return (Math.random() * 5).toFixed(1); // 0.0 到 5.0 的隨機評分
  },
  businessHours() {
    return "09:00-21:00"; // 固定營業時間
  },
});
