import { Injectable } from '@nestjs/common';
import loansData from '../../data/loans.json';

@Injectable()
export class LoansService {
    private readonly loans = loansData;

    /**
   * Fetches all loans or filer by status with role-based visibility .
   * - 'admin'/'superadmin' see everything.
   * - 'staff' cannot see applicant.totalLoan.
   */
    async findAll(role: string, status?: string) {
        let filteredLoans = this.loans;

        if (status) {
            filteredLoans = this.loans.filter(
                (loan) => loan.status === status,
            );
        }

        if (role === 'staff') {
            return this.loans.map((loan) => {
                const loanCopy = JSON.parse(JSON.stringify(loan));
                if (loanCopy.applicant && 'totalLoan' in loanCopy.applicant) {
                    delete loanCopy.applicant.totalLoan;
                }
                return loanCopy;
            });
        }
        return filteredLoans;
    }

    /**
   * Fetches all loans for a specific user by their email.
   * Applies role-based visibility.
   * Returns data in the format { loans: [...] }
   */
    async findByUserEmail(email: string, role: string) {
        const userLoans = this.loans.filter(
            (loan) => loan.applicant.email === email,
        );

        let results = userLoans;

        if (role === 'staff') {
            results = userLoans.map((loan) => {
                const loanCopy = JSON.parse(JSON.stringify(loan));
                if (loanCopy.applicant && 'totalLoan' in loanCopy.applicant) {
                    delete loanCopy.applicant.totalLoan;
                }
                return loanCopy;
            });
        }
        return { loans: results };
    }


    /**
   * Fetches all loans where the maturityDate is in the past.
   * Applies role-based visibility.
   */
    async findExpired(role: string) {
        const now = new Date();

        const expiredLoans = this.loans.filter((loan) => {

            const maturityDate = new Date(loan.maturityDate);
            return maturityDate < now;
        });

        if (role === 'staff') {
            return expiredLoans.map((loan) => {
                const loanCopy = JSON.parse(JSON.stringify(loan));
                if (loanCopy.applicant && 'totalLoan' in loanCopy.applicant) {
                    delete loanCopy.applicant.totalLoan;
                }
                return loanCopy;
            });
        }

        return expiredLoans;
    }
}
