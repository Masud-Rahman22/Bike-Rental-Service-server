import { Response } from "express";

type TResponse<T> = {
    statusCode: number,
    success: boolean,
    message?: string,
    token: string,
    data: T
}

const sendResponseWithToken = <T>(res: Response, data: TResponse<T>) => {
    res.status(data?.statusCode).json({
        success: data.success,
        message: data.message,
        token: data.token,
        data: data.data
    })
}

export default sendResponseWithToken;