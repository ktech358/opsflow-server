import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  // USERS
  const admin = await prisma.user.create({
    data: {
      email: "admin@opsflow.com",
      password: passwordHash,
      role: Role.ADMIN,
      name: "Admin User"
    }
  });

  const ops1 = await prisma.user.create({
    data: {
      email: "ops1@opsflow.com",
      password: passwordHash,
      role: Role.USER,
      name: "Ops User One"
    }
  });

  const ops2 = await prisma.user.create({
    data: {
      email: "ops2@opsflow.com",
      password: passwordHash,
      role: Role.USER,
      name: "Ops User Two"
    }
  });

  const viewer = await prisma.user.create({
    data: {
      email: "viewer@opsflow.com",
      password: passwordHash,
      role: Role.VIEWER,
      name: "Viewer User"
    }
  });

  // REQUESTS
  await prisma.request.createMany({
    data: [
      {
        title: "New laptop",
        description: "MacBook Pro needed",
        status: "PENDING",
        createdById: ops1.id
      },
      {
        title: "VPN access",
        description: "Need prod VPN",
        status: "PENDING",
        createdById: ops2.id
      },
      {
        title: "Cloud credits",
        description: "AWS credits request",
        status: "APPROVED",
        createdById: ops1.id,
        assignedToId: admin.id
      },
      {
        title: "Database access",
        description: "Read-only prod access",
        status: "REJECTED",
        createdById: ops2.id,
        assignedToId: admin.id
      },
      {
        title: "New monitor",
        description: "27-inch monitor",
        status: "PENDING",
        createdById: ops1.id
      }
    ]
  });

  console.log("✅ Seed data created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
