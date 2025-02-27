export default function routes() {
  // 設置 API 前綴
  this.namespace = "/api";

  // 用戶相關路由
  this.get("/users", (schema) => {
    return schema.users.all(); // 返回所有用戶
  });

  this.get("/users/:id", (schema, request) => {
    const user = schema.users.find(request.params.id);
    return user || new Response(404, {}, { error: "User not found" });
  });

  this.post("/auth/login", (schema, request) => {
    const { email, password } = JSON.parse(request.requestBody);
    const user = schema.users.findBy({ email });
    if (user && password === "password123") {
      // 簡單模擬密碼驗證
      return { token: `fake-token-${user.id}`, user };
    }
    return new Response(401, {}, { error: "Invalid credentials" });
  });

  this.post("/auth/register", (schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    const user = schema.users.create(attrs);
    return { token: `fake-token-${user.id}`, user };
  });

  // 餐廳相關路由
  this.get("/restaurants", (schema, request) => {
    const { location, cuisine } = request.queryParams;
    let restaurants = schema.restaurants.all();
    if (location) {
      restaurants = restaurants.filter((r) => r.location === location);
    }
    if (cuisine) {
      restaurants = restaurants.filter((r) => r.cuisine === cuisine);
    }
    return restaurants;
  });

  this.get("/restaurants/:id", (schema, request) => {
    const restaurant = schema.restaurants.find(request.params.id);
    return (
      restaurant || new Response(404, {}, { error: "Restaurant not found" })
    );
  });

  this.post("/restaurants/:id/menu", (schema, request) => {
    const restaurant = schema.restaurants.find(request.params.id);
    if (!restaurant) {
      return new Response(404, {}, { error: "Restaurant not found" });
    }
    const attrs = JSON.parse(request.requestBody);
    const menuItem = schema.menuItems.create({ ...attrs, restaurant });
    return menuItem;
  });

  // 訂單相關路由
  this.get("/orders", (schema, request) => {
    const { role, userId, restaurantId, driverId } = request.queryParams;
    let orders = schema.orders.all();

    if (role === "customer" && userId) {
      orders = orders.filter((order) => order.user.id === userId);
    } else if (role === "restaurant" && restaurantId) {
      orders = orders.filter((order) => order.restaurant.id === restaurantId);
    } else if (role === "driver" && driverId) {
      orders = orders.filter((order) => order.driver.id === driverId);
    }
    return orders;
  });

  this.get("/orders/:id", (schema, request) => {
    const order = schema.orders.find(request.params.id);
    return order || new Response(404, {}, { error: "Order not found" });
  });

  this.post("/orders", (schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    const user = schema.users.find(attrs.userId);
    const restaurant = schema.restaurants.find(attrs.restaurantId);
    if (!user || !restaurant) {
      return new Response(400, {}, { error: "Invalid user or restaurant" });
    }
    const order = schema.orders.create({
      ...attrs,
      user,
      restaurant,
      status: "準備中",
      createdAt: new Date().toISOString(),
    });
    attrs.items.forEach((item) => {
      schema.orderItems.create({ ...item, order });
    });
    return order;
  });

  this.patch("/orders/:id/status", (schema, request) => {
    const order = schema.orders.find(request.params.id);
    if (!order) {
      return new Response(404, {}, { error: "Order not found" });
    }
    const { status } = JSON.parse(request.requestBody);
    order.update({ status });
    return order;
  });

  // 外送員相關路由
  this.get("/drivers", (schema) => {
    return schema.drivers.all(); // 返回所有外送員
  });

  this.get("/drivers/:id", (schema, request) => {
    const driver = schema.drivers.find(request.params.id);
    return driver || new Response(404, {}, { error: "Driver not found" });
  });

  this.post("/drivers/:id/orders/:orderId/accept", (schema, request) => {
    const driver = schema.drivers.find(request.params.id);
    const order = schema.orders.find(request.params.orderId);
    if (!driver || !order) {
      return new Response(404, {}, { error: "Driver or order not found" });
    }
    order.update({ driver, status: "外送中" });
    return order;
  });

  // 模擬路徑優化（靜態數據）
  this.get("/drivers/:id/route", (schema, request) => {
    const driver = schema.drivers.find(request.params.id);
    if (!driver) {
      return new Response(404, {}, { error: "Driver not found" });
    }
    const orders = schema.orders.where({
      driverId: driver.id,
      status: "外送中",
    });
    return {
      driver,
      route: orders.models.map((order) => ({
        orderId: order.id,
        destination: order.deliveryAddress,
        lat: 25.03 + Math.random() * 0.05, // 模擬經緯度
        lng: 121.5 + Math.random() * 0.05,
      })),
    };
  });
}
