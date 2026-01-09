import express from "express";
import {
  createRequest,
  getRequests,
  getRequestById,
  approveRequest,
  rejectRequest,
  updateRequestStatus
} from "../controllers/request.controller.js";

import { authMiddleware } from "../middelware/auth.middleware.js";
import { roleMiddleware } from "../middelware/role.middleware.js"
import { addComment } from "../controllers/comment.controller.js";

const router = express.Router();

// CREATE
router.post("/", authMiddleware, createRequest);

// READ
router.get("/", authMiddleware, getRequests);
router.get("/:id", authMiddleware, getRequestById);

// ADMIN ACTIONS
router.patch(
  "/:id/approve",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  approveRequest
);

router.patch(
  "/:id/reject",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  rejectRequest
);

// COMMENTS
router.post(
  "/:id/comments",
  authMiddleware,
  addComment
);

router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  updateRequestStatus
);


export default router;
