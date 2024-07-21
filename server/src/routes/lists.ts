import express from "express";
import { getWatchedList } from "../controller/lists";
import { authenticate } from "../middleware/auth";

const router = express();

router.get("/watched", authenticate, getWatchedList);
