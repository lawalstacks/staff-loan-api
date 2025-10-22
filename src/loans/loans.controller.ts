import { Controller, Get, UseGuards, Request, Query, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard'
import { LoansService } from './loans.service';
import { QueryLoanDto } from './dto/query-loan.dto';

@Controller('loans')
@UseGuards(JwtAuthGuard)
export class LoansController {
    constructor(private readonly loansService: LoansService) { }

    @Get()
    async findAll(
        @Request() req: any,
        @Query() query: QueryLoanDto,
    ) {
        const user = req.user;
        return this.loansService.findAll(user.role, query.status);
    }

    @Get('expired')
    async findExpired(@Request() req: any) {
        const requestingUserRole = req.user.role;
        return this.loansService.findExpired(requestingUserRole);
    }

    @Get(':userEmail/get')
    async findByUser(
        @Request() req: any,
        @Param('userEmail') userEmail: string,
    ) {
        const requestingUserRole = req.user.role;
        return this.loansService.findByUserEmail(userEmail, requestingUserRole);
    }
}
