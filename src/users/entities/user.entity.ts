export class User {
  id?: number;
  name: string;
  school?: {
    schoolName: string;
    grade: number;
  };
  profile_image?: string;
  created_at: string;
  updated_at?: string;
}
