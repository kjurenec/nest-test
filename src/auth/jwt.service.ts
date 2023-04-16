import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import hkdf from '@panva/hkdf';
import { EncryptJWT, jwtDecrypt } from 'jose';
import { EnvVariables } from '../shared/env-variables';

@Injectable()
export class JwtService {
  constructor(private configService: ConfigService<EnvVariables, true>) {}

  async encode(token: Record<string, unknown>) {
    const encryptionSecret = await this.getDerivedEncryptionKey(this.secret);
    const maxAge = this.configService.getOrThrow('JWT_EXPIRATION_TIME', {
      infer: true,
    });
    const now = (Date.now() / 1000) | 0;

    return await new EncryptJWT(token)
      .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
      .setIssuedAt()
      .setExpirationTime(now + maxAge)
      .setJti(uuid())
      .encrypt(encryptionSecret);
  }

  async decode(token: string) {
    const encryptionSecret = await this.getDerivedEncryptionKey(this.secret);

    const { payload } = await jwtDecrypt(token, encryptionSecret, {
      clockTolerance: 15,
    });
    return payload;
  }

  private get secret() {
    return this.configService.getOrThrow('JWT_SECRET', { infer: true });
  }

  private async getDerivedEncryptionKey(secret: string) {
    return await hkdf('sha256', secret, '', '', 32);
  }
}
