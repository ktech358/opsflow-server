import express from "express";
import { getAuditLogs } from "../controllers/audit.controller.js";
import { authMiddleware } from "../middelware/auth.middleware.js";
import { roleMiddleware } from "../middelware/role.middleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  getAuditLogs
);

export default router;
