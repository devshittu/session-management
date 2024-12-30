-- CreateTable
CREATE TABLE "ServiceUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nhsNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "Admission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serviceUserId" INTEGER NOT NULL,
    "wardId" INTEGER NOT NULL,
    "admissionDate" DATETIME NOT NULL,
    "dischargeDate" DATETIME,
    CONSTRAINT "Admission_serviceUserId_fkey" FOREIGN KEY ("serviceUserId") REFERENCES "ServiceUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Admission_wardId_fkey" FOREIGN KEY ("wardId") REFERENCES "Ward" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ward" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "admissionId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,
    "timeIn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timeOut" DATETIME,
    CONSTRAINT "Session_admissionId_fkey" FOREIGN KEY ("admissionId") REFERENCES "Admission" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ServiceUser_nhsNumber_key" ON "ServiceUser"("nhsNumber");
