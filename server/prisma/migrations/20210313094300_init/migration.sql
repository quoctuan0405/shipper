-- CreateTable
CREATE TABLE "Shipper" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phoneNumber" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "shipperId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Message_shipperId_unique" ON "Message"("shipperId");

-- CreateIndex
CREATE UNIQUE INDEX "Message_customerId_unique" ON "Message"("customerId");

-- AddForeignKey
ALTER TABLE "Message" ADD FOREIGN KEY ("shipperId") REFERENCES "Shipper"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
