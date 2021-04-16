import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    // 이 strategy class는 passport에 의해 사용되는 strategy이며, injectables() 데코레이터를 사용하여 다른 곳 DI해서 사용할 수 있도로 ㄱ한다.
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'scret51',
        });
    }

    // 이 메소드는 strategy에 항상 있어야 한다.
    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;
        const user: User = await this.userRepository.findOne({ username });
        
        if (!user) {
            throw new UnauthorizedException()
        }

        return user;
    }
}