export interface ChecklistItem {
  id: string;
  text: string;
  description?: string;
  isCompleted: boolean;
  impact: number; // 1-10 scale of impact
  link?: string;
  linkText?: string;
}

export interface AnalysisResponse {
  message: string;
  title: string;
  scoreEmoji: string;
}