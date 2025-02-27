import { Factory } from "miragejs";

export default Factory.extend({
  name(i) {
    return `User ${i + 1}`; // 生成 User 1, User 2, ...
  },
  email(i) {
    return `user${i + 1}@example.com`; // 生成 user1@example.com, user2@example.com, ...
  },
  phone() {
    return `09${Math.floor(Math.random() * 100000000)}`; // 隨機台灣手機號碼
  },
  createdAt() {
    return new Date().toISOString(); // 當前時間
  },
});
