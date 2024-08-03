import { UploadApiResponse } from "cloudinary";

export interface User {
     id: number;
     name: string;
     email: string;
     password: string;
     role: string | null;
     bio?: string;
     avatarUrl?: string;
     currentPassword?: string;
     newPassword?: string;
}
