import { Expose } from "class-transformer";

export class ValidateUserDto {
    @Expose()
    id!: string;
    
    @Expose()
    username!: string;
}