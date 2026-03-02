export interface InsurancePolicy {
  id: string;
  policyName: string;
  coverage: number; // in dollars
  premium: number; // monthly premium in dollars
  startDate: string; // YYYY-MM-DD format
  endDate: string; // YYYY-MM-DD format
  status: 'active' | 'expired' | 'pending';
  policyType: string; // e.g., "Health", "Auto", "Home"
}

export type RootStackParamList = {
  Home: undefined;
  Details: {policyId: string};
};
