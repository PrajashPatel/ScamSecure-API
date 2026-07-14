export interface ScanResponse {
  success: boolean;
  input: string;
  normalized_url: string;
  risk_score: number;
  risk_level: string;
  mlPrediction: number;
  mlProbability: number;
  verdict: string;
  safe_to_open: boolean;
  reasons: string[];
  signals: {
    suspicious?: boolean;
    brand?: string;
    reason?: string;
  };
  recommended_action: string;
  checked_at: string;
}