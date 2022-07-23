import { MiddlewareConsumer, NestModule } from '@nestjs/common';
export declare class AppModule implements NestModule {
    constructor();
    configure(consumer: MiddlewareConsumer): void;
}
