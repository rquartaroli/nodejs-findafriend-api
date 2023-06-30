-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name_organization" TEXT NOT NULL,
    "name_responsible" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cep" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "whatsapp_num" INTEGER NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_email_key" ON "organizations"("email");
