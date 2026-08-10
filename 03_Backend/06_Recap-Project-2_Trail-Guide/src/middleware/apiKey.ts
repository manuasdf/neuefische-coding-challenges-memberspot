import type { NextFunction, Request, Response } from "express";

const API_KEY = process.env.API_KEY;

function auth(req: Request, res: Response, next: NextFunction) {
    const requestHeader = req.header("x-api-key");
    if (requestHeader === API_KEY) {
        next();
    } else {
        res.status(401).json({
            "errorMessage": "No x-api-key header given",
            "httpStatusCode": "401"
        })
    }
}

export {
    auth
}