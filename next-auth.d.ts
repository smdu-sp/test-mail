import { Permissao } from '@prisma/client';
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string
            email: string
        } & {
            nome: string
            login: string
            permissao: Permissao
            telefone?: string
        }
    }

    interface User extends DefaultUser {
        id: string
        email: string
        nome: string
        login: string
        telefone?: string
        permissao: Permissao
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string
        email: string
        nome: string
        login: string
        permissao: Permissao
    }
}