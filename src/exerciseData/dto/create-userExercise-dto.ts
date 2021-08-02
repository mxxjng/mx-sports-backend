import { IsNotEmpty } from 'class-validator';

export class CreateUserExerciseDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    readonly unit: string;

    @IsNotEmpty()
    exerciseCategoryId: string;

    readonly image: string;
}
