import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET')!,
        });
    }

    /**
     * This method runs  after the token is successfully verified.
     * It hydrates the user object, which NestJS then attaches to req.user.
     */
    async validate(payload: any) {
        return {
            userId: payload.sub,
            email: payload.email,
            role: payload.role
        };
    }
}
