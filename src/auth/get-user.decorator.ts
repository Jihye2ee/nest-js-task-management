import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./user.entity";

export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext) : User => {
    // 이 GetUser 데코레이터를 annotation하는데에 넘겨줄 data
    // console.log('[createParamDecorator] req : ', ctx.switchToHttp().getRequest());
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});