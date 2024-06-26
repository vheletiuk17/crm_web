export interface ITokens{
    user: {
        id: number
        email: string
        name: string
        role: string
    },
    tokens: {
        accessToken: string
        refreshToken: string
    }
}