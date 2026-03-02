import {InsurancePolicy} from '../types';

export const mockPolicies: InsurancePolicy[] = [
  {
    id: '1',
    policyName: 'Premium Health Insurance',
    coverage: 500000,
    premium: 350,
    startDate: '2023-01-15',
    endDate: '2025-01-14',
    status: 'active',
    policyType: 'Health',
  },
  {
    id: '2',
    policyName: 'Auto Insurance - Sedan',
    coverage: 300000,
    premium: 120,
    startDate: '2023-06-20',
    endDate: '2026-06-19',
    status: 'active',
    policyType: 'Auto',
  },
  {
    id: '3',
    policyName: 'Home Insurance - Premium',
    coverage: 750000,
    premium: 85,
    startDate: '2022-03-10',
    endDate: '2025-03-09',
    status: 'active',
    policyType: 'Home',
  },
];
