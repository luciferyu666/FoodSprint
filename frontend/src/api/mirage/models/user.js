import { Model, hasMany } from "miragejs";

export default Model.extend({
  // 定義關聯關係
  orders: hasMany("order"), // 用戶擁有多個訂單
  favorites: hasMany("restaurant"), // 用戶收藏的餐廳
});
