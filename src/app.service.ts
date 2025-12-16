import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello!';
  }

  postHello(): string {
    return 'Post: Hello!';
  }

}
