/** @format */

import { bind } from '@/services/ldap';
import Credentials from 'next-auth/providers/credentials';

export const authConfig = {
	providers: [
		Credentials({
			name: 'credentials',
			credentials: {
				login: {},
				senha: {},
			},
			authorize: async (credentials) => {
				const date = new Date();
				const { login, senha } = credentials;
				if (!login || !senha) return null;
				const resultado = await bind(login as string, senha as string);
				const usuario = resultado;
				if (!usuario) return null;
				if (date < new Date('2025-06-02') && usuario.permissao !== 'DEV')
					return null;
				return {
					id: usuario.id,
					email: usuario.email,
					nome: usuario.nome,
					login: usuario.login,
					permissao: usuario.permissao,
				};
			},
		}),
	],
	callbacks: {
		// @eslint-disable-next-line
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		async jwt({ token, user }: any) {
			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.nome = user.nome;
				token.login = user.login;
				token.telefone = user.telefone;
				token.permissao = user.permissao;
			}
			return token;
		},
		// @eslint-disable-next-line
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		async session({ session, token }: any) {
			session.user.id = token.id;
			session.user.email = token.email;
			session.user.nome = token.nome;
			session.user.login = token.login;
			session.user.telefone = token.telefone;
			session.user.permissao = token.permissao;
			return session;
		},
	},
	pages: {
		signIn: '/auth/login',
		error: '/auth/login',
	},
	trustHost: true,
};
