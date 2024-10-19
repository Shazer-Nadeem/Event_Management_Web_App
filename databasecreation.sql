use farewell2;
/*drop database farewell2;
create database farewell2;
use farewell2;

 
CREATE TABLE Student (
  StudentID INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(255) NOT NULL Unique CHECK (LENGTH(Name) >= 2),
  Email VARCHAR(255) NOT NULL UNIQUE,
  Password VARCHAR(255) NOT NULL CHECK (LENGTH(Password) >= 7)
);

CREATE TABLE Team (
  TeamID INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(255) NOT NULL CHECK (LENGTH(Name) >= 2),
  SID INT,
  FOREIGN KEY (SID) REFERENCES Student(StudentID)
);


CREATE TABLE Menu (
  MenuID INT PRIMARY KEY AUTO_INCREMENT,
  Description varchar(255) not null,
  Name VARCHAR(255) NOT NULL CHECK (LENGTH(Name) >= 2),
  Price int not null check (price>0),
  Votes INT,
  sid int,
  FOREIGN KEY (SID) REFERENCES Student(StudentID) 
);

CREATE TABLE Budget (
  BudgetID INT PRIMARY KEY AUTO_INCREMENT,
  Category VARCHAR(255) NOT NULL CHECK (LENGTH(Category) >= 2),
  MaximumPrice int not null check (maximumprice>0)
);

CREATE TABLE performancepropsal (
  PPID INT PRIMARY KEY AUTO_INCREMENT,
  Socialrequirments varchar(255) CHECK (LENGTH(Socialrequirments) >= 9),
  ppType VARCHAR(255) NOT NULL CHECK (LENGTH(ppType) >= 2),
  ppvotes INT CHECK (LENGTH(ppvotes) >= 0),
  sid int,
  FOREIGN KEY (SID) REFERENCES Student(StudentID) 
);

CREATE TABLE finalizedperformance (
  fPID INT PRIMARY KEY AUTO_INCREMENT,
  fpType VARCHAR(255) NOT NULL CHECK(LENGTH(fpType) >= 0),
  timeslot datetime not null,
  venue varchar(20) CHECK (LENGTH(venue) >= 2),
  sid int,
  FOREIGN KEY (SID) REFERENCES Student(StudentID)
);

CREATE TABLE rehearsal (
    rehearsalID INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255) not null,
    timeSlot datetime not null,
    venue VARCHAR(255) not null CHECK (LENGTH(venue) >= 2),
    fpid int,
    FOREIGN KEY (fpid) REFERENCES finalizedperformance(fpid)
);

CREATE TABLE invitation (
    invitationID INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(20) not null CHECK (LENGTH(title) >= 2),
    Body VARCHAR(255) CHECK (LENGTH(body) >= 10),
    recipentname VARCHAR(20) not null,
    sid int,
    FOREIGN KEY (SID) REFERENCES Student(StudentID)
);

CREATE TABLE task (
    taskID INT AUTO_INCREMENT PRIMARY KEY,
    tasktype VARCHAR(20) not null CHECK (LENGTH(tasktype) >= 2),
    tasktext VARCHAR(255) not null CHECK (LENGTH(tasktext) >= 2),
    assignedto VARCHAR(20) not null,
    teamid int,
    FOREIGN KEY (TeamID) REFERENCES team(teamID)
);

CREATE TABLE Teacher (
  TeacherID INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL UNIQUE,
  Password VARCHAR(255) NOT NULL CHECK (LENGTH(Password) >= 7)
);

CREATE TABLE familymember (
  familymemberID INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(255) NOT NULL CHECK (LENGTH(name) >= 2),
  relationship VARCHAR(255) NOT NULL CHECK (LENGTH(relationship) >= 2),
  TID int,
  FOREIGN KEY (TID) REFERENCES teacher(teacherID)
);


create table attendancestudent(
aid INT PRIMARY KEY AUTO_INCREMENT,
student varchar(20) CHECK (LENGTH(student) >= 2),
status varchar(20),
sid int,
 FOREIGN KEY (SID) REFERENCES Student(StudentID) 
);

*/


























-- INSERT INTO performancepropsal (Socialrequirments, ppType, ppvotes) 
-- VALUES ('Community event', 'Music concert', 0);
-- INSERT INTO performancepropsal (Socialrequirments, ppType, ppvotes) 
-- VALUES ('Fundraising campaign', 'Dance performance', 0);
-- INSERT INTO performancepropsal (Socialrequirments, ppType, ppvotes) 
-- VALUES ('Charity event', 'Theater play', 0);



-- INSERT INTO Budget (Category, MaximumPrice)
-- VALUES ('chicken', 1000);

-- select * from student;
 -- select * from attendancestudent;
 -- select * from menu;
-- select * from team;
-- select * from budget;
-- select * from performancepropsal;
-- select * from finalizedperformance;
-- select * from rehearsal;
-- select * from invitation;
-- select * from task;
-- select * from menu;
-- select * from familymember;
-- select * from teacher;

-- desc student;
-- desc invitation;
-- desc budget;