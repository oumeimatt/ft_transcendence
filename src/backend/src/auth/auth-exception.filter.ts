import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from 'express';

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const message = exception.message;
        if (status === 401) 
            response.redirect('http://' + process.env.FRONTEND_HOST +'/home');
        else {
            response.status(status).json({
                statusCode: status,
                message: message,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        }
    }
}