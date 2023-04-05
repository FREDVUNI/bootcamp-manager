import Bootcamp from "../models/Bootcamp.js";

export const getBootcamps = async (req, res) => {
  try {
    let query;

    let ui_values = {
      filtering: {},
      sorting: {},
    };

    const reqQuery = { ...req.query };
    const removeField = ["sort"];
    removeField.forEach((val) => delete reqQuery[val]);
    let queryStr = JSON.stringify(reqQuery);

    const filterKeys = Object.keys(reqQuery);
    const filterValues = Object.values(reqQuery);

    filterKeys.forEach(
      (val, index) => (ui_values.filtering[val] = filterValues[index])
    );

    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );
    // console.log(queryStr)

    query = Bootcamp.find(JSON.parse(queryStr));

    if (req.query.sort) {
      const sortByArr = req.query.sort.split(",");

      sortByArr.forEach((val) => {
        let order;

        if (val[0] === "-") {
          order = "descending";
        } else {
          order = "ascending";
        }

        ui_values.sorting[val.replace("-", "")] = order;
      });

      const sortByStr = sortByArr.join("");

      query = query.sort(sortByStr);
    } else {
      query = query.sort("^price");
    }

    const bootcamps = await query;

    const max_price = await Bootcamp.find().sort({price:-1}).limit(1).select("-_id price")
    const min_price = await Bootcamp.find().sort({price:1}).limit(1).select("-_id price")

    ui_values.max_price = max_price[0].price
    ui_values.min_price = min_price[0].price

    res.status(200).json({
      success: true,
      data: bootcamps,
      ui_values,
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
