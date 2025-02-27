import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Role } from "../../common/decorators/roles.decorator";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // 存儲加密後的密碼

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.Customer,
  })
  role: Role; // 角色類型
}
