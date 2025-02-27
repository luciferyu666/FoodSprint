import { Model, hasMany } from "miragejs";

export default Model.extend({
  // 定義關聯關係
  orders: hasMany("order"), // 餐廳接收的訂單
  menuItems: hasMany("menuItem"), // 餐廳的菜單項目（假設有獨立 MenuItem 模型）
});
