import { IsAlphanumeric, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

	@IsNotEmpty()
	@IsString()
	@MaxLength(50)
	@IsAlphanumeric()
    username: string;

	@IsOptional()
	@IsString()
	@MaxLength(100)
	avatar: string;

	// @IsNotEmpty()
	// @IsString()
	// @MinLength(8)
	// @MaxLength(20)
	// @Matches(
	// 	/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
	// 	{ message: 'password too weak' },
	// )
	// password: string;
}

// Passwords will contain at least 1 upper case letter
// Passwords will contain at least 1 lower case letter
// Passwords will contain at least 1 number or special character
// There is no length validation (min, max) in this regex!