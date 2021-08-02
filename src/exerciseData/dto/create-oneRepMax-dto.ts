import { IsNotEmpty } from 'class-validator';

export class CreateOneRepMaxDTO {
    @IsNotEmpty()
    readonly date: string;

    @IsNotEmpty()
    readonly weight: number;
}
