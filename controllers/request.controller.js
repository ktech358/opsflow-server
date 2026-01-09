import prisma from "../prisma/client.js";

// CREATE REQUEST
export const createRequest = async (req, res) => {
  const { title, description } = req.body;

  const request = await prisma.request.create({
    data: {
      title,
      description,
      status: "PENDING",
      createdById: req.user.userId
    }
  });

  res.status(201).json(request);
};

// GET ALL REQUESTS
/* export const getRequests = async (req, res) => {
  const requests = await prisma.request.findMany({
    include: {
      createdBy: true
    }
  });

  res.json(requests);
};
 */
export const getRequests = async (req, res) => {
  const { status } = req.query;

  const where = {};

  // STATUS FILTER
  if (status) {
    where.status = status;
  }

  // ROLE-BASED VISIBILITY
  if (req.user.role !== "ADMIN") {
    where.createdById = req.user.userId;
  }

  const requests = await prisma.request.findMany({
    where,
    include: {
      createdBy: true,
      assignedTo: true
    }
  });

  res.json(requests);
};


// GET ONE REQUEST
/* export const getRequestById = async (req, res) => {
  const request = await prisma.request.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      comments: true
    }
  });

  res.json(request);
}; */
export const getRequestById = async (req, res) => {
  const request = await prisma.request.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      comments: true
    }
  });

  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  // OWNERSHIP CHECK
  if (
    req.user.role !== "ADMIN" &&
    request.createdById !== req.user.userId
  ) {
    return res.status(403).json({ message: "Access denied" });
  }

  res.json(request);
};


// APPROVE REQUEST (ADMIN)
export const approveRequest = async (req, res) => {
  const request = await prisma.request.update({
    where: { id: Number(req.params.id) },
    data: {
      status: "APPROVED",
      assignedToId: req.user.userId
    }
  });

  res.json(request);
};

// REJECT REQUEST (ADMIN)
export const rejectRequest = async (req, res) => {
  const request = await prisma.request.update({
    where: { id: Number(req.params.id) },
    data: {
      status: "REJECTED",
      assignedToId: req.user.userId
    }
  });

  res.json(request);
};

/* export const updateRequestStatus = async (req, res) => {
  const { status } = req.body;

  const allowedStatuses = ["PENDING", "APPROVED", "REJECTED"];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const request = await prisma.request.update({
    where: { id: Number(req.params.id) },
    data: {
      status,
      assignedToId: req.user.userId
    }
  });

  // AUDIT LOG
  await prisma.auditLog.create({
    data: {
      action: `STATUS_CHANGED_TO_${status}`,
      entity: "Request",
      entityId: request.id,
      userId: req.user.userId
    }
  });

  res.json(request);
}; */
export const updateRequestStatus = async (req, res) => {
  const requestId = Number(req.params.id);
  const { status } = req.body;

  const allowedStatuses = ["APPROVED", "REJECTED"];

  // 1️ Validate input
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: "Status must be APPROVED or REJECTED"
    });
  }

  // 2️ Fetch request
  const existingRequest = await prisma.request.findUnique({
    where: { id: requestId }
  });

  if (!existingRequest) {
    return res.status(404).json({
      message: "Request not found"
    });
  }

  // 3️ Prevent double processing
  if (existingRequest.status !== "PENDING") {
    return res.status(400).json({
      message: `Request already ${existingRequest.status}`
    });
  }

  // 4️ Update request
  const updatedRequest = await prisma.request.update({
    where: { id: requestId },
    data: {
      status,
      assignedToId: req.user.userId
    }
  });

  // 5️⃣ Write audit log
  await prisma.auditLog.create({
    data: {
      action: `STATUS_CHANGED_TO_${status}`,
      entity: "Request",
      entityId: updatedRequest.id,
      userId: req.user.userId
    }
  });

  // 6️⃣ Return updated request
  res.json(updatedRequest);
};