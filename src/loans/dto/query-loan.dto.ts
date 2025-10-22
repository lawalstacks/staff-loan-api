import { IsIn, IsOptional, IsString } from 'class-validator';

export class QueryLoanDto {
    @IsString()
    @IsOptional()
    @IsIn(['pending', 'active'])
    status?: string;
}