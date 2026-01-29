import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { request } from "http";
import { Observable, tap } from "rxjs";

export class LogInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log("Before...");
        const dt = Date.now();
        return next.handle().pipe(tap(() => {
            const request = context.switchToHttp().getRequest();
            console.log('url:', request.url);
            console.log('method:', request.method);
            console.log(`Execution time: ${Date.now() - dt}ms`);
        }))
    }
}