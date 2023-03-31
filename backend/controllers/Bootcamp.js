import Bootcamp from "../models/Bootcamp.js";

export const getBootcamps = async (req, res) => {
  try {
    let query;

    const reqQuery = { ...req.query }
    const removeField = ["sort"]
    removeField.forEach((val) => delete reqQuery[val]) 
    let queryStr = JSON.stringify(reqQuery)

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)
    console.log(queryStr)

    const bootcamps = await Bootcamp.find({
      price: { $lte: 900 },
    });
    return res.status(200).json({
      success: true,
      data: bootcamps,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const createBootcamp = async (req, res) => {
  try {
    const { name, rating, description, price } = req.body;

    const exists = await Bootcamp.findOne({
      name,
    });

    if (exists)
      return res.status(400).json({
        error: `The ${name.toLowerCase()} bootcamp already exists.`,
      });

    const bootcamp = new Bootcamp({
      name,
      rating,
      description,
      price,
    });

    let new_bootcamp = await bootcamp.save();
    return res.status(201).json({
      success: true,
      message: `${name} bootcamp has been saved.`,
      data: new_bootcamp,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const getBootcamp = async (req, res) => {
  try {
    const { id } = req.params;
    const bootcamp = await Bootcamp.findById(id);
    if (!bootcamp) {
      return res.status(404).json({
        error: "Bootcamp was not found.",
      });
    }
    // console.log(bootcamp._id.toString())
    return res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const updateBootcamp = async (req, res) => {
  try {
    const { id } = req.params.id;
    const bootcamp = await Bootcamp.findById(id);

    if (!bootcamp)
      return res.status(404).json({
        error: "Bootcamp was not found.",
      });

    bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(201).json({
      success: true,
      message: `${req.body.name} bootcamp has been updated.`,
      data: bootcamp,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const deleteBootcamp = async (req, res) => {
  try {
    const { id } = req.params.id;
    const bootcamp = await Bootcamp.findById(id);

    if (!bootcamp)
      return res.status(404).json({
        error: "Bootcamp was not found.",
      });

    await Bootcamp.remove();

    return res.status(201).json({
      success: true,
      message: `${req.body.name} bootcamp has been deleted.`,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
