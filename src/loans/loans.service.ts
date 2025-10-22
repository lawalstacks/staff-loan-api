import { Injectable } from '@nestjs/common';
import loansData from '../../data/loans.json';

@Injectable()
export class LoansService {
    private readonly loans = loansData;

    /**
   * Fetches all loans with role-based visibility.
   * - 'admin'/'superadmin' see everything.
   * - 'staff' cannot see applicant.totalLoan.
   */
    async findAll(role: string) {

        if (role === 'staff') {
            return this.loans.map((loan) => {
                const loanCopy = JSON.parse(JSON.stringify(loan));
                if (loanCopy.applicant && 'totalLoan' in loanCopy.applicant) {
                    delete loanCopy.applicant.totalLoan;
                }
                return loanCopy;
            });
        }
        return this.loans;
    }
}
