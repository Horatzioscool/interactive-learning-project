export interface User {
  uid: string;
  email?: string;
  displayName: string;
  photoURL?: string;
  emailVerified: boolean;
}

export interface UserRole {
  userId: string;
  role: 'admin' | 'teacher';
}
