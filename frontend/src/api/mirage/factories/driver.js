import { Factory } from "miragejs";

export default Factory.extend({
  name(i) {
    return `Driver ${i + 1}`; // 生成 Driver 1, Driver 2, ...
  },
  phone() {
    return `09${Math.floor(Math.random() * 100000000)}`; // 隨機手機號碼
  },
  vehicle() {
    const vehicles = ["Scooter", "Bicycle", "Car"];
    return vehicles[Math.floor(Math.random() * vehicles.length)];
  },
  currentLocation() {
    return {
      lat: 25.03 + Math.random() * 0.05, // 模擬台北附近經緯度
      lng: 121.5 + Math.random() * 0.05,
    };
  },
});
