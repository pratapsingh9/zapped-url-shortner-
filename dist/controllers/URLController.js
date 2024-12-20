export class URLController {
    constructor(urlService) {
        this.urlService = urlService;
    }
    async shortenURL(req, res) {
        try {
            const { originalURL, customCode } = req.body;
            const result = await this.urlService.createShortURL(originalURL, customCode);
            res.status(201).json(result);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async redirectURL(req, res) {
        try {
            const { shortCode } = req.params;
            const originalURL = await this.urlService.getOriginalURL(shortCode);
            res.redirect(originalURL);
        }
        catch (error) {
            res.status(404).json({ error: 'URL not found' });
        }
    }
}
