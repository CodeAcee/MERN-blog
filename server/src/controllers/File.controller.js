const uploadFile = async (req, res) => {
  res.json({
    url: `/src/uploads/${req.file.originalname}`
  })
};

module.exports = uploadFile;
