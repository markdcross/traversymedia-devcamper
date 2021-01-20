const Bootcamp = require('../models/Bootcamp');

//* ======================================
//*   @route    GET /api/v1/bootcamps
//!   @desc     Get All Bootcamps
//*   @access   Public
//* ======================================
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all bootcamps' });
};

//* ======================================
//*   @route    GET /api/v1/bootcamps/:id
//!   @desc     Get single Bootcamp
//*   @access   Public
//* ======================================
exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Show bootcamp ${req.params.id}` });
};

//* ======================================
//*   @route    POST /api/v1/bootcamps
//!   @desc     Create new Bootcamp
//*   @access   Private
//* ======================================
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//* ======================================
//*   @route    PUT /api/v1/bootcamps/:id
//!   @desc     Update Bootcamp
//*   @access   Private
//* ======================================
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update bootcamp ${req.params.id}` });
};

//* ======================================
//*   @route    DELETE /api/v1/bootcamps/:id
//!   @desc     Delete Bootcamp
//*   @access   Private
//* ======================================
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
};
