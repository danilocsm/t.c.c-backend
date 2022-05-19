-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "actvities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "link" TEXT,
    "itemType" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "illnesses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "symptom" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "testimonials" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "testimonials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ActivityToItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ActivityToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "actvities" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ActivityToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "items" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ActivityToIllness" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ActivityToIllness_A_fkey" FOREIGN KEY ("A") REFERENCES "actvities" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ActivityToIllness_B_fkey" FOREIGN KEY ("B") REFERENCES "illnesses" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityToItem_AB_unique" ON "_ActivityToItem"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivityToItem_B_index" ON "_ActivityToItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityToIllness_AB_unique" ON "_ActivityToIllness"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivityToIllness_B_index" ON "_ActivityToIllness"("B");
