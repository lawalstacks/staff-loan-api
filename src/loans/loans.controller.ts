import {
    Controller,
    Get,
    UseGuards,
    Request,
    Query,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    ForbiddenException,
    NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard'
import { LoansService } from './loans.service';
import { QueryLoanDto } from './dto/query-loan.dto';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { Roles } from '../auth/decorators/roles/roles.decorator';

@Controller('loans')
@UseGuards(JwtAuthGuard, RolesGuard)
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

    @Delete(':loanId/delete')
    @Roles('superAdmin')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteLoan(
        @Request() req: any,
        @Param('loanId') loanId: string,
    ) {

        const success = await this.loansService.delete(loanId);

        if (!success) {
            throw new NotFoundException(`Loan with ID ${loanId} not found.`);
        }
        return;
    }
}
