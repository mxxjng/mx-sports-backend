import {
    HttpException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { UserLoginDTO, UserRegistrationDTO } from './dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return await this.prisma.user.findMany({});
    }

    async findOne(id: string): Promise<User | undefined> {
        return await this.prisma.user.findUnique({
            where: { id: id },
        });
    }

    async getAuthenticatedUser(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                height: true,
                weight: true,
                createdAt: true,
                role: true,
            },
        });

        if (!user) {
            throw new NotFoundException(
                'Kein Benutzer mit dieser Id gefunden.',
            );
        }

        return user;
    }

    async login(payLoad: UserLoginDTO): Promise<any> {
        const { email, password } = payLoad;

        const user = await this.prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new NotFoundException(
                'Kein Benutzer mit dieser E-Mail Adresse gefunden.',
            );
        }

        const isAuthenticated = await bcrypt.compare(password, user.password);

        if (!isAuthenticated) {
            throw new UnauthorizedException(
                'Bitte geben sie gültige Daten an.',
            );
        }

        const token = await jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.SECRET_TOKEN,
            { expiresIn: '10d' },
        );

        return {
            message: 'Erfolgreich angemeldet',
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        };
    }

    async register(payLoad: any): Promise<any> {
        const { email, password, firstName, lastName, height, weight, gender } =
            payLoad;

        const user = await this.prisma.user.findUnique({
            where: { email: payLoad.email },
        });

        if (user) {
            throw new HttpException(
                'User mit dieser Email existiert bereits',
                500,
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const createUser = await this.prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                height,
                weight,
                gender,
                birthDate: new Date(),
                password: hashedPassword,
            },
        });

        const token = await jwt.sign(
            { id: createUser.id, email, role: createUser.role },
            process.env.SECRET_TOKEN,
            { expiresIn: '10d' },
        );

        return { user: createUser, token };
    }
}
