const express = require('express');
const router = express.Router();
const { cloudinary } = require('../configs/cloudinary');

router.post('/upload', async (req, res) => {
  try {
    const file = req.body.file;
    // const uploadResponse = await cloudinary.uploader.upload(file, {
    //   upload_preset: 'dev_setups',
    // });
    const promise = file.map(async (item) => {
      return await cloudinary.uploader.upload(
        item,
        { folder: 'dev_setups' },
        (err) => {
          if (err) throw err;
        }
      );
    });
    let images = await Promise.all(promise);
    res.json(images);
    // console.log(uploadResponse);
    // res.json({ message: 'Yahahah' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
