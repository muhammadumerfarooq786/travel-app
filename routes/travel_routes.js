import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/user_model.js";
import Travel from "../models/travel_model.js";

const router = express.Router();

// Route for user registration
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    // Check if the user already exists
    const isUser = await User.findOne({ email });

    if (isUser) {
      res.status(400); // Bad Request
      throw new Error("User already registered");
    }

    // Create a new user
    const user = await User.create(req.body);

    if (user) {
      console.log("User signup");
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  })
);

// Route for user login
router.get(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.query;

    // Find the user by email and password
    const user = await User.findOne({ email, password });

    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
      });
    } else {
      res.status(401).json({
        message: "Incorrect Credentials",
      }); // Unauthorized
      throw new Error("Incorrect credentials");
    }
  })
);

// Route for adding a new travel plan
router.post(
  "/add",
  asyncHandler(async (req, res) => {
    const { user_id, name, travel_date, activities_list, notes, priority } =
      req.body;

    // Create a new travel plan
    const travelPlan = await Travel.create({
      user_id,
      name,
      travel_date,
      activities_list,
      notes,
      priority,
    });

    if (travelPlan) {
      res.status(201).json({
        _id: travelPlan._id,
        user_id: travelPlan.user_id,
        name: travelPlan.name,
        travel_date: travelPlan.travel_date,
        activities_list: travelPlan.activities_list,
        notes: travelPlan.notes,
        priority: travelPlan.priority,
        created_at: travelPlan.created_at,
        updated_at: travelPlan.updated_at,
      });
    } else {
      res.status(400);
      throw new Error("Invalid travel plan data");
    }
  })
);

// Route for editing a travel plan
router.put(
  "/edit",
  asyncHandler(async (req, res) => {
    const { id, name, travel_date, activities_list, notes, priority } =
      req.query;

    // Find the travel plan by ID and update its fields
    const travelPlan = await Travel.findByIdAndUpdate(
      id,
      {
        name,
        travel_date,
        activities_list,
        notes,
        priority,
        updated_at: Date.now(),
      },
      { new: true }
    );

    if (travelPlan) {
      res.json({
        _id: travelPlan._id,
        user_id: travelPlan.user_id,
        name: travelPlan.name,
        travel_date: travelPlan.travel_date,
        activities_list: travelPlan.activities_list,
        notes: travelPlan.notes,
        priority: travelPlan.priority,
        created_at: travelPlan.created_at,
        updated_at: travelPlan.updated_at,
      });
    } else {
      res.status(404);
      throw new Error("Travel plan not found");
    }
  })
);

// Route for deleting a travel plan
router.delete(
  "/delete",
  asyncHandler(async (req, res) => {
    const { id } = req.query;

    // Find the travel plan by ID and remove it
    const travelPlan = await Travel.findByIdAndRemove(id);

    if (travelPlan) {
      res.json({
        _id: travelPlan._id,
        user_id: travelPlan.user_id,
        name: travelPlan.name,
        travel_date: travelPlan.travel_date,
        activities_list: travelPlan.activities_list,
        notes: travelPlan.notes,
        priority: travelPlan.priority,
        created_at: travelPlan.created_at,
        updated_at: travelPlan.updated_at,
      });
    } else {
      res.status(404);
      throw new Error("Travel plan not found");
    }
  })
);

// Route for viewing a specific travel plan by ID
router.get(
  "/get",
  asyncHandler(async (req, res) => {
    console.log(req.query);
    const { id } = req.query;

    // Find the travel plan by ID
    const travelPlan = await Travel.findById(id);

    if (travelPlan) {
      res.json({
        _id: travelPlan._id,
        user_id: travelPlan.user_id,
        name: travelPlan.name,
        travel_date: travelPlan.travel_date,
        activities_list: travelPlan.activities_list,
        notes: travelPlan.notes,
        priority: travelPlan.priority,
        created_at: travelPlan.created_at,
        updated_at: travelPlan.updated_at,
      });
    } else {
      res.status(404);
      throw new Error("Travel plan not found");
    }
  })
);

// Route for fetching all travel plans of a specific user
router.get(
  "/getByUserId",
  asyncHandler(async (req, res) => {
    const { userId } = req.query;

    // Find all travel plans belonging to the specified user ID
    const travelPlans = await Travel.find({ user_id: userId });

    res.json(travelPlans);
  })
);

// Route for viewing all travel plans
router.get(
  "/getAll",
  asyncHandler(async (req, res) => {
    // Find all travel plans
    const travelPlans = await Travel.find();

    res.json(travelPlans);
  })
);

export default router;
