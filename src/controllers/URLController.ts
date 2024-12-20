import { Request, Response } from 'express';
import { URLService } from '../services/URLService';

export class URLController {
  constructor(private urlService: URLService) {}

  async shortenURL(req: Request, res: Response): Promise<void> {
    try {
      const { orignal, custom } = req.body;
      const result = await this.urlService.createShortURL(orignal, custom);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async redirectURL(req: Request, res: Response): Promise<void> {
    try {
      const { shortCode } = req.params;
      const originalURL = await this.urlService.getOriginalURL(shortCode);
      res.redirect(originalURL);
    } catch (error: any) {
      res.status(404).json({ error: 'URL not found' });
    }
  }
}