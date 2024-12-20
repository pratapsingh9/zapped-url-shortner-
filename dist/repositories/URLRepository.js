export class URLRepository {
    constructor() {
        this.urls = new Map();
        this.findUrls = new Map();
    }
    async save(shortCode, originalURL) {
        this.urls.set(shortCode, originalURL);
    }
    async findByShortCode(shortCode) {
        return this.urls.get(shortCode);
    }
}
