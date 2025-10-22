import { Controller, Get, UseGuards, Request, Query } from '@nestjs/common';
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
}
