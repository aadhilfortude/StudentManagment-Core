import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "./models/student";
import { StudentService } from "./services/student.service";
import { StudentResolver } from "./std.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([Student])],
    providers: [StudentService, StudentResolver],
    exports: [StudentService]
})
export class StudentModule{

}