import { SetMetadata } from "@nestjs/common";

// 定義角色枚舉（可根據需求擴展）
export enum Role {
  Customer = "customer",
  Restaurant = "restaurant",
  Driver = "driver",
  Admin = "admin",
}

// 定義 Roles 裝飾器的元數據鍵
export const ROLES_KEY = "roles";

// 自定義 @Roles 裝飾器
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
