import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard"; // 自定義守衛，後面實作
import { Roles } from "../../common/decorators/roles.decorator";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post("register")
  async register(
    @Body()
    body: {
      email: string;
      password: string;
      name?: string;
      phone?: string;
      role?: string;
    }
  ) {
    return this.authService.register(
      body.email,
      body.password,
      body.name,
      body.phone,
      body.role as any
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  @Roles() // 任何角色都可訪問
  async getProfile(@Request() req) {
    return this.authService.getProfile(req.user.sub);
  }
}
