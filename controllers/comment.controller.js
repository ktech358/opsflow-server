import prisma from "../prisma/client.js";

export const addComment = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: "Comment message is required" });
  }

  const comment = await prisma.comment.create({
    data: {
      message,
      requestId: Number(req.params.id),
      userId: req.user.userId
    }
  });

  res.status(201).json(comment);
};
