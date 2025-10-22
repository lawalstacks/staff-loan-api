import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import staffData from '../../data/staffs.json';


@Injectable()
export class AuthService {
    private readonly staff = staffData;
    constructor(private jwtService: JwtService) { }

    /***
     * Validate staff credentials
     */
    async validateUser(email: string, pass: string): Promise<any> {
        const user = this.staff.find((user) => user.email === email);

        const isPasswordValid = (pass === user?.password);

        if (user && isPasswordValid) {
            const { ...result } = user;
            return result;
        }
        return null;
    }

    /**
     * Generate a JWT for a validated staff
     */
    async login(user: any) {
        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            message: 'Login successful',
            access_token: this.jwtService.sign(payload),
        };
    }
}
