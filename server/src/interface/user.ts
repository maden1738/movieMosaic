export interface User {
     id: number;
     name: string;
     email: string;
     password: string;
     bio?: string;
     avatarUrl?: string;
     currentPassword?: string;
     newPassword?: string;
}
