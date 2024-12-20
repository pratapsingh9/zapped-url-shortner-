import { URLRepository } from '../repositories/URLRepository';

export class URLService {
  constructor(private urlRepository: URLRepository) {}

  private createNanoID(length: number = 6): string {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  async createShortURL(originalURL: string, customCode?: string): Promise<{ shortCode: string, originalURL: string }> {
    const shortCode = customCode || this.createNanoID();
    
    if (customCode) {
      const existing = await this.urlRepository.findByShortCode(customCode);
      if (existing) {
        throw new Error('Custom code already in use');
      }
    }

    await this.urlRepository.save(shortCode, originalURL);
    return { shortCode, originalURL };
  }

  async getOriginalURL(shortCode: string): Promise<string> {
    const url = await this.urlRepository.findByShortCode(shortCode);
    if (!url) {
      throw new Error('URL not found');
    }
    return url;
  }
}