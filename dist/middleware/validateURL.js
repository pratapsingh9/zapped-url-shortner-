export function validateURL(req, res, next) {
    const { originalURL } = req.body;
    try {
        new URL(originalURL);
        next();
    }
    catch {
        res.status(400).json({ error: 'Invalid URL format' });
    }
}
