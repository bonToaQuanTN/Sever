import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { EmployeeModule } from "../app.module";
import { Employee } from "../app.model";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: "localhost",
      port: 6969,
      username: "postgres",
      password: "MinWan",
      database: "crud_db",
      autoLoadModels: true,
      synchronize: true,
      models: [Employee]
    }),
    EmployeeModule
  ],
})
export class AppModule {}