import prisma from "../prisma/client.js";

export const getAuditLogs = async (req, res) => {
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" }
  });

  res.json(logs);
};
