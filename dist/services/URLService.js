export class URLService {
    constructor(urlRepository) {
        this.urlRepository = urlRepository;
    }
    createNanoID(length = 6) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    async createShortURL(originalURL, customCode) {
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
    async getOriginalURL(shortCode) {
        const url = await this.urlRepository.findByShortCode(shortCode);
        if (!url) {
            throw new Error('URL not found');
        }
        return url;
    }
}
