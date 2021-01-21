const ErrorResponse = require('../utils/ErrorResponse');
const Bootcamp = require('../models/Bootcamp');
const geocoder = require('../utils/geocoder');
const asyncHandler = require('../middleware/async');

//* ======================================
//*   @route    GET /api/v1/bootcamps
//!   @desc     Get All Bootcamps
//*   @access   Public
//* ======================================
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});

//* ======================================
//*   @route    GET /api/v1/bootcamps/:id
//!   @desc     Get single Bootcamp
//*   @access   Public
//* ======================================
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: bootcamp });
});

//* ======================================
//*   @route    POST /api/v1/bootcamps
//!   @desc     Create new Bootcamp
//*   @access   Private
//* ======================================
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    data: bootcamp
  });
});

//* ======================================
//*   @route    PUT /api/v1/bootcamps/:id
//!   @desc     Update Bootcamp
//*   @access   Private
//* ======================================
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: bootcamp });
});

//* ======================================
//*   @route    DELETE /api/v1/bootcamps/:id
//!   @desc     Delete Bootcamp
//*   @access   Private
//* ======================================
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});

//* ======================================
//*   @route    GET /api/v1/bootcamps/radius/:zipcode/:distance (This can take a /:units as well)
//!   @desc     Get bootcamps within a radius
//*   @access   Private
//* ======================================
// You can use lat/lng here instead of zipcode and you don't have to use the geocoder
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide distance by radius of Earth
  // Earth Radius = 3963 mi, 6378 kilometers
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});
