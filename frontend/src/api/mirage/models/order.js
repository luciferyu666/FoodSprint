import { Model, belongsTo, hasMany } from "miragejs";

export default Model.extend({
  // 定義關聯關係
  user: belongsTo("user"), // 訂單屬於某個用戶
  restaurant: belongsTo("restaurant"), // 訂單來自某個餐廳
  driver: belongsTo("driver"), // 訂單由某個外送員配送
  items: hasMany("orderItem"), // 訂單包含多個項目（假設有獨立 OrderItem 模型）
});
