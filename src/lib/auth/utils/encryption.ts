import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

export class Encryption {
  private static readonly ALGORITHM = 'aes-256-gcm';
  private static readonly KEY_LENGTH = 32;
  private static readonly IV_LENGTH = 12;
  private static readonly AUTH_TAG_LENGTH = 16;

  private static key: Buffer;

  public static initialize(secretKey?: string) {
    this.key = secretKey ? 
      Buffer.from(secretKey, 'hex') : 
      randomBytes(this.KEY_LENGTH);
  }

  public static encrypt(text: string): string {
    const iv = randomBytes(this.IV_LENGTH);
    const cipher = createCipheriv(this.ALGORITHM, this.key, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();

    return [
      iv.toString('hex'),
      encrypted,
      authTag.toString('hex')
    ].join(':');
  }

  public static decrypt(encrypted: string): string {
    const [ivHex, encryptedText, authTagHex] = encrypted.split(':');
    
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    
    const decipher = createDecipheriv(this.ALGORITHM, this.key, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}