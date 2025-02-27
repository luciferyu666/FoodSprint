import { Factory } from "miragejs";

export default Factory.extend({
  status() {
    const statuses = ["準備中", "外送中", "已送達", "已取消"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  },
  total() {
    return (Math.random() * 100 + 10).toFixed(2); // 隨機總額，10-110
  },
  createdAt() {
    return new Date(
      Date.now() - Math.floor(Math.random() * 86400000)
    ).toISOString(); // 隨機一天內時間
  },
  deliveryAddress() {
    return `No. ${Math.floor(Math.random() * 100)}, Sec. ${
      Math.floor(Math.random() * 5) + 1
    }, Zhongshan Rd`;
  },
});
