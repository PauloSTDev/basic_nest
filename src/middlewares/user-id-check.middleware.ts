import { Injectable, NestMiddleware, BadRequestException} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class UserIdCheckMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
      console.log('UserIdCheckMiddleware initialized');
      
      if (isNaN(Number(req.params.userId)) || Number(req.params.userId) <= 0) {
          return new BadRequestException('ID inválido');
        }
    next();
  }
}