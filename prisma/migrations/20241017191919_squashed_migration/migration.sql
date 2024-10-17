-- CreateTable
CREATE TABLE "User" (
    "ID" SERIAL NOT NULL,
    "Auth0_ID" VARCHAR(50) NOT NULL,
    "Username" VARCHAR(50) NOT NULL,
    "Email" VARCHAR(50) NOT NULL,
    "Phone_Number" VARCHAR(12),
    "DOB" TIMESTAMP(3),
    "Profile_Image" TEXT,
    "Gender" VARCHAR(1),
    "Grade" INTEGER,
    "Parental_Consent" BOOLEAN,
    "Worker_ID" INTEGER,
    "Participant_ID" INTEGER,
    "Coach_ID" INTEGER,
    "Coordinator_ID" INTEGER,
    "Is_Viewer" BOOLEAN NOT NULL,
    "Is_Active" BOOLEAN NOT NULL,
    "Onboarding_Complete" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "VerificationCode" (
    "ID" SERIAL NOT NULL,
    "Phone_Number" TEXT NOT NULL,
    "Code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationCode_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Participants" (
    "ID" SERIAL NOT NULL,
    "FirstName" VARCHAR(50) NOT NULL,
    "LastName" VARCHAR(50) NOT NULL,
    "Bio" VARCHAR(300),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Participants_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Coaches" (
    "ID" SERIAL NOT NULL,
    "FName" VARCHAR(50) NOT NULL,
    "LName" VARCHAR(50) NOT NULL,
    "Bio" VARCHAR(300),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coaches_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Coordinators" (
    "ID" SERIAL NOT NULL,
    "Coach_ID" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coordinators_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Workers" (
    "ID" SERIAL NOT NULL,
    "Coordinator_ID" INTEGER NOT NULL,
    "Event_ID" INTEGER NOT NULL,
    "Privileges_ID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workers_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Teams" (
    "ID" SERIAL NOT NULL,
    "Name" VARCHAR(50) NOT NULL,
    "Name_Short" VARCHAR(4) NOT NULL,
    "Mascot" VARCHAR(25) NOT NULL,
    "Division_ID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "CoachesTeams" (
    "ID" SERIAL NOT NULL,
    "Coach_ID" INTEGER NOT NULL,
    "Team_ID" INTEGER NOT NULL,
    "Is_Active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoachesTeams_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "ParticipantsTeams" (
    "ID" SERIAL NOT NULL,
    "Participant_ID" INTEGER NOT NULL,
    "Team_ID" INTEGER NOT NULL,
    "Is_Active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ParticipantsTeams_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "ParticipantWeightPlans" (
    "ID" SERIAL NOT NULL,
    "Participant_ID" INTEGER NOT NULL,
    "Team_ID" INTEGER NOT NULL,
    "Projected_Weight" INTEGER NOT NULL,
    "Weight" INTEGER NOT NULL,
    "Weight_Deadline" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ParticipantWeightPlans_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "ParticipantWeightHistory" (
    "ID" SERIAL NOT NULL,
    "Participant_ID" INTEGER NOT NULL,
    "Roster_ID" INTEGER NOT NULL,
    "Weight" INTEGER NOT NULL,
    "Participant_Weight_History_Date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ParticipantWeightHistory_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Event" (
    "ID" SERIAL NOT NULL,
    "Type_ID" INTEGER NOT NULL,
    "Category_ID" INTEGER NOT NULL,
    "Name" VARCHAR(50) NOT NULL,
    "Start_Date" TIMESTAMP(3) NOT NULL,
    "End_Date" TIMESTAMP(3) NOT NULL,
    "Number_Mats" INTEGER NOT NULL,
    "USA_Wrestling_Event" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "EventTeamRoster" (
    "ID" SERIAL NOT NULL,
    "Event_ID" INTEGER NOT NULL,
    "Team_ID" INTEGER NOT NULL,
    "Participant_ID" INTEGER NOT NULL,
    "Made_Weight" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventTeamRoster_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Weights" (
    "ID" SERIAL NOT NULL,
    "Event_Category_ID" INTEGER NOT NULL,
    "Weight" INTEGER NOT NULL,

    CONSTRAINT "Weights_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Divisions" (
    "ID" SERIAL NOT NULL,
    "Name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Divisions_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "CompetitionType" (
    "ID" SERIAL NOT NULL,
    "Name" VARCHAR(100) NOT NULL,

    CONSTRAINT "CompetitionType_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Mats" (
    "ID" SERIAL NOT NULL,
    "Description" VARCHAR(100) NOT NULL,

    CONSTRAINT "Mats_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Rounds" (
    "ID" SERIAL NOT NULL,
    "Description" VARCHAR(100) NOT NULL,

    CONSTRAINT "Rounds_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "EventCategories" (
    "ID" SERIAL NOT NULL,
    "Event_Categories" VARCHAR(100) NOT NULL,

    CONSTRAINT "EventCategories_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "EventTypes" (
    "ID" SERIAL NOT NULL,
    "Event_Type" VARCHAR(100) NOT NULL,

    CONSTRAINT "EventTypes_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Score" (
    "ID" SERIAL NOT NULL,
    "Event_Categories_ID" INTEGER NOT NULL,
    "Point_Value" INTEGER NOT NULL,
    "Score_Desc" VARCHAR(100) NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "WinConditions" (
    "ID" SERIAL NOT NULL,
    "Desc" VARCHAR(100) NOT NULL,
    "Team_Points" INTEGER NOT NULL,

    CONSTRAINT "WinConditions_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Brackets" (
    "ID" SERIAL NOT NULL,
    "Event_ID" INTEGER NOT NULL,
    "Competition_Type_ID" INTEGER NOT NULL,
    "Weight_ID" INTEGER NOT NULL,
    "Division_ID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Brackets_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Bouts" (
    "ID" SERIAL NOT NULL,
    "Bracket_ID" INTEGER NOT NULL,
    "Event_ID" INTEGER NOT NULL,
    "Mat_ID" INTEGER NOT NULL,
    "Round_ID" INTEGER NOT NULL,
    "Bout_Number" INTEGER NOT NULL,
    "Bout_Time" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bouts_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "BoutParticipants" (
    "ID" SERIAL NOT NULL,
    "Bout_ID" INTEGER NOT NULL,
    "Event_Roster_ID" INTEGER NOT NULL,
    "Win_Condition_ID" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BoutParticipants_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "BoutParticipantsScoreHistory" (
    "ID" SERIAL NOT NULL,
    "Bout_Participant_ID" INTEGER NOT NULL,
    "Score_ID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BoutParticipantsScoreHistory_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "BrakcketPlacements" (
    "ID" SERIAL NOT NULL,
    "Event_Roster_ID" INTEGER NOT NULL,
    "Bracket_ID" INTEGER NOT NULL,
    "Placement" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BrakcketPlacements_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "_EventToEventCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToEventTypes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BoutsToMats" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BoutsToRounds" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BoutsToWinConditions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BoutsToBrackets" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Auth0_ID_key" ON "User"("Auth0_ID");

-- CreateIndex
CREATE UNIQUE INDEX "User_Username_key" ON "User"("Username");

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "User_Phone_Number_key" ON "User"("Phone_Number");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToEventCategories_AB_unique" ON "_EventToEventCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToEventCategories_B_index" ON "_EventToEventCategories"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToEventTypes_AB_unique" ON "_EventToEventTypes"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToEventTypes_B_index" ON "_EventToEventTypes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BoutsToMats_AB_unique" ON "_BoutsToMats"("A", "B");

-- CreateIndex
CREATE INDEX "_BoutsToMats_B_index" ON "_BoutsToMats"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BoutsToRounds_AB_unique" ON "_BoutsToRounds"("A", "B");

-- CreateIndex
CREATE INDEX "_BoutsToRounds_B_index" ON "_BoutsToRounds"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BoutsToWinConditions_AB_unique" ON "_BoutsToWinConditions"("A", "B");

-- CreateIndex
CREATE INDEX "_BoutsToWinConditions_B_index" ON "_BoutsToWinConditions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BoutsToBrackets_AB_unique" ON "_BoutsToBrackets"("A", "B");

-- CreateIndex
CREATE INDEX "_BoutsToBrackets_B_index" ON "_BoutsToBrackets"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_Worker_ID_fkey" FOREIGN KEY ("Worker_ID") REFERENCES "Workers"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_Participant_ID_fkey" FOREIGN KEY ("Participant_ID") REFERENCES "Participants"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_Coach_ID_fkey" FOREIGN KEY ("Coach_ID") REFERENCES "Coaches"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_Coordinator_ID_fkey" FOREIGN KEY ("Coordinator_ID") REFERENCES "Coordinators"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coordinators" ADD CONSTRAINT "Coordinators_Coach_ID_fkey" FOREIGN KEY ("Coach_ID") REFERENCES "Coaches"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workers" ADD CONSTRAINT "Workers_Coordinator_ID_fkey" FOREIGN KEY ("Coordinator_ID") REFERENCES "Coordinators"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachesTeams" ADD CONSTRAINT "CoachesTeams_Coach_ID_fkey" FOREIGN KEY ("Coach_ID") REFERENCES "Coaches"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachesTeams" ADD CONSTRAINT "CoachesTeams_Team_ID_fkey" FOREIGN KEY ("Team_ID") REFERENCES "Teams"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantsTeams" ADD CONSTRAINT "ParticipantsTeams_Participant_ID_fkey" FOREIGN KEY ("Participant_ID") REFERENCES "Participants"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantsTeams" ADD CONSTRAINT "ParticipantsTeams_Team_ID_fkey" FOREIGN KEY ("Team_ID") REFERENCES "Teams"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantWeightPlans" ADD CONSTRAINT "ParticipantWeightPlans_Participant_ID_fkey" FOREIGN KEY ("Participant_ID") REFERENCES "Participants"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantWeightPlans" ADD CONSTRAINT "ParticipantWeightPlans_Team_ID_fkey" FOREIGN KEY ("Team_ID") REFERENCES "Teams"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantWeightHistory" ADD CONSTRAINT "ParticipantWeightHistory_Participant_ID_fkey" FOREIGN KEY ("Participant_ID") REFERENCES "Participants"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantWeightHistory" ADD CONSTRAINT "ParticipantWeightHistory_Roster_ID_fkey" FOREIGN KEY ("Roster_ID") REFERENCES "EventTeamRoster"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTeamRoster" ADD CONSTRAINT "EventTeamRoster_Event_ID_fkey" FOREIGN KEY ("Event_ID") REFERENCES "Event"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTeamRoster" ADD CONSTRAINT "EventTeamRoster_Team_ID_fkey" FOREIGN KEY ("Team_ID") REFERENCES "Teams"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTeamRoster" ADD CONSTRAINT "EventTeamRoster_Participant_ID_fkey" FOREIGN KEY ("Participant_ID") REFERENCES "Participants"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weights" ADD CONSTRAINT "Weights_Event_Category_ID_fkey" FOREIGN KEY ("Event_Category_ID") REFERENCES "EventCategories"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_Event_Categories_ID_fkey" FOREIGN KEY ("Event_Categories_ID") REFERENCES "EventCategories"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brackets" ADD CONSTRAINT "Brackets_Event_ID_fkey" FOREIGN KEY ("Event_ID") REFERENCES "Event"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brackets" ADD CONSTRAINT "Brackets_Competition_Type_ID_fkey" FOREIGN KEY ("Competition_Type_ID") REFERENCES "CompetitionType"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brackets" ADD CONSTRAINT "Brackets_Weight_ID_fkey" FOREIGN KEY ("Weight_ID") REFERENCES "Weights"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brackets" ADD CONSTRAINT "Brackets_Division_ID_fkey" FOREIGN KEY ("Division_ID") REFERENCES "Divisions"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoutParticipantsScoreHistory" ADD CONSTRAINT "BoutParticipantsScoreHistory_Bout_Participant_ID_fkey" FOREIGN KEY ("Bout_Participant_ID") REFERENCES "BoutParticipants"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoutParticipantsScoreHistory" ADD CONSTRAINT "BoutParticipantsScoreHistory_Score_ID_fkey" FOREIGN KEY ("Score_ID") REFERENCES "Score"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrakcketPlacements" ADD CONSTRAINT "BrakcketPlacements_Event_Roster_ID_fkey" FOREIGN KEY ("Event_Roster_ID") REFERENCES "EventTeamRoster"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrakcketPlacements" ADD CONSTRAINT "BrakcketPlacements_Bracket_ID_fkey" FOREIGN KEY ("Bracket_ID") REFERENCES "Brackets"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventCategories" ADD CONSTRAINT "_EventToEventCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventCategories" ADD CONSTRAINT "_EventToEventCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "EventCategories"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventTypes" ADD CONSTRAINT "_EventToEventTypes_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventTypes" ADD CONSTRAINT "_EventToEventTypes_B_fkey" FOREIGN KEY ("B") REFERENCES "EventTypes"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoutsToMats" ADD CONSTRAINT "_BoutsToMats_A_fkey" FOREIGN KEY ("A") REFERENCES "Bouts"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoutsToMats" ADD CONSTRAINT "_BoutsToMats_B_fkey" FOREIGN KEY ("B") REFERENCES "Mats"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoutsToRounds" ADD CONSTRAINT "_BoutsToRounds_A_fkey" FOREIGN KEY ("A") REFERENCES "Bouts"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoutsToRounds" ADD CONSTRAINT "_BoutsToRounds_B_fkey" FOREIGN KEY ("B") REFERENCES "Rounds"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoutsToWinConditions" ADD CONSTRAINT "_BoutsToWinConditions_A_fkey" FOREIGN KEY ("A") REFERENCES "Bouts"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoutsToWinConditions" ADD CONSTRAINT "_BoutsToWinConditions_B_fkey" FOREIGN KEY ("B") REFERENCES "WinConditions"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoutsToBrackets" ADD CONSTRAINT "_BoutsToBrackets_A_fkey" FOREIGN KEY ("A") REFERENCES "Bouts"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoutsToBrackets" ADD CONSTRAINT "_BoutsToBrackets_B_fkey" FOREIGN KEY ("B") REFERENCES "Brackets"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
