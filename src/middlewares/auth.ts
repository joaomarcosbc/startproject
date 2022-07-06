import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface TokenUser {
    id: string;
    name: string;
    email: string;
    iat: number;
    exp: number;
}

function auth(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization

    if(!authToken) {
        return res.status(404).json({error: "Token is missing."})
        //adicionar helpers
    }

    const [, token] = authToken.split(" ")

    try {
        const user = verify(token, process.env.SECRET)
        req.user = user as TokenUser

        return next()

    } catch(error) {
        return res.status(404).json({error: "Token invalid."})
    }
}