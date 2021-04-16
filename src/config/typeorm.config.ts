import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1q2w3e4r',
    database: 'monitor',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true // production에선 true 설정을 추천하지 않음
};