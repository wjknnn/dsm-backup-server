import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    console.log(authorization);
    if (authorization) {
      const [scheme, token] = authorization.split(' ');
      console.log([scheme, token]);
      return scheme.toLowerCase() === 'bearer' && token === '1234';
    }
    throw new BadRequestException();
  }
}
