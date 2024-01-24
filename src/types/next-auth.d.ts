import NextAuth from 'next-auth'

declare module 'next-auth' {
	interface Session {
		usuario: {
			id: string
			nome: string
			login: string
			permissao: string
		},
        access_token: string
	}
}