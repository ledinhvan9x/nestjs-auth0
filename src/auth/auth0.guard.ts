import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { auth } from 'express-oauth2-jwt-bearer';

const checkJwt = auth({
  audience: 'https://nestjs-auth0-api',
  issuerBaseURL: `https://dev-8vitgyluumxfeb73.us.auth0.com`,
  tokenSigningAlg: 'RS256',
});

@Injectable()
export class Auth0Guard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    await new Promise<void>((resolve, reject) => {
      checkJwt(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    return true;
  }
}
