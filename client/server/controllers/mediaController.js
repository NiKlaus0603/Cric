const News = require('../models/News');
const Gallery = require('../models/Gallery');

// Add a news article
const postNews = async (req, res) => {
  const { title, summary, url, image } = req.body;
  if (!title || !summary || !url) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const article = await News.create({ title, summary, url, image });
  res.status(201).json(article);
};

// Add a gallery image
const postGallery = async (req, res) => {
  const { matchId, caption, url } = req.body;
  if (!url) return res.status(400).json({ error: 'Image URL is required' });

  const image = await Gallery.create({ matchId, caption, url });
  res.status(201).json(image);
};

module.exports = { postNews, postGallery };
