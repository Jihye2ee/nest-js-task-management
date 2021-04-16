import { IsString, Matches, MaxLength, MinLength } from "class-validator";

// signup과 sign in에서 동시에 필요한 username, password를 정의한 dto
export class AuthCredentialDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}/,
        {message: 'paswword is too weak'}
    )
    password: string;
}