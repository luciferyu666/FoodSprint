import { Model, hasMany } from "miragejs";

export default Model.extend({
  // 定義關聯關係
  orders: hasMany("order"), // 外送員配送的多個訂單
});
