import { createServer } from "miragejs";
import userModel from "./models/user";
import restaurantModel from "./models/restaurant";
import orderModel from "./models/order";
import driverModel from "./models/driver";
import orderItemModel from "./models/orderItem";
import menuItemModel from "./models/menuItem";
import userFactory from "./factories/user";
import restaurantFactory from "./factories/restaurant";
import orderFactory from "./factories/order";
import driverFactory from "./factories/driver";
import orderItemFactory from "./factories/orderItem";
import menuItemFactory from "./factories/menuItem";

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,
    models: {
      user: userModel,
      restaurant: restaurantModel,
      order: orderModel,
      driver: driverModel,
      orderItem: orderItemModel,
      menuItem: menuItemModel,
    },
    factories: {
      user: userFactory,
      restaurant: restaurantFactory,
      order: orderFactory,
      driver: driverFactory,
      orderItem: orderItemFactory,
      menuItem: menuItemFactory,
    },
    seeds(server) {
      // 使用 Factories 生成數據
      server.createList("user", 5); // 5 個用戶
      server.createList("restaurant", 10); // 10 個餐廳
      server.createList("driver", 3); // 3 個外送員

      const users = server.schema.users.all();
      const restaurants = server.schema.restaurants.all();
      const drivers = server.schema.drivers.all();

      restaurants.models.forEach((restaurant) => {
        server.createList("menuItem", 5, { restaurant }); // 每個餐廳 5 個菜單項目
      });

      server.createList("order", 20, {
        user: () => users.models[Math.floor(Math.random() * users.length)],
        restaurant: () =>
          restaurants.models[Math.floor(Math.random() * restaurants.length)],
        driver: () =>
          drivers.models[Math.floor(Math.random() * drivers.length)],
        items: () =>
          server.createList("orderItem", Math.floor(Math.random() * 3) + 1),
      }); // 20 個訂單，隨機關聯
    },
    routes() {
      this.namespace = "/api";
      this.get("/users", (schema) => schema.users.all());
      this.get("/restaurants", (schema) => schema.restaurants.all());
      this.get("/orders", (schema) => schema.orders.all());
      this.get("/drivers", (schema) => schema.drivers.all());
    },
  });
}
