interface URLRecord {
  shortCode: string;
  originalURL: string;
}

export class URLRepository {
  private urls: Map<string, string> = new Map();
  private findUrls: Map<string,string>  = new Map();
  
  async save(shortCode: string, originalURL: string): Promise<void> {
    this.urls.set(shortCode, originalURL);
  }

  async findByShortCode(shortCode: string): Promise<string | undefined> {
    return this.urls.get(shortCode);
  }
}
