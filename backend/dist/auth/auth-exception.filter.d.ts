import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
export declare class AuthExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
}
