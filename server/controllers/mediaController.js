const News = require('../models/News');
const Gallery = require('../models/Gallery');

const postNews = async (req, res) => {
  try {
    const news = await News.create(req.body);
    res.status(201).json(news);
  } catch (err) {
    res.status(400).json({ error: 'Failed to post news' });
  }
};

const addGalleryImage = async (req, res) => {
  try {
    const image = await Gallery.create(req.body);
    res.status(201).json(image);
  } catch (err) {
    res.status(400).json({ error: 'Failed to upload image' });
  }
};

module.exports = { postNews, addGalleryImage };
