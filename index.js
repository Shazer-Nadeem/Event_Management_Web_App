const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
app.set('view engine', 'ejs');
const port = 8880;
let SID = 0; // Initialize SID

// Read SID value from file
fs.readFile('SID.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading SID:", err);
        return;
    }
    // Parse the data to an integer
    SID = parseInt(data.trim()) || 0; // Use 0 as default if file is empty or SID is not a number
    console.log("SID:", SID);
});

// Middleware for parsing JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serving static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'DB lab project final')));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "shahzer@!",
    database: "farewell2"
});



//sign uppppppppppppppppp loginnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn

// Route for displaying the user type selection page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route for handling the form submission
app.post('/user-type', (req, res) => {
    const userType = req.body.userType;
    
    // Redirect the user based on their selection
    if (userType === 'student') {
        res.redirect('/student-page');
    } else if (userType === 'teacher') {
        res.redirect('/teacher-page');
    } else {
        res.status(400).send('Invalid user type');
    }
});

// Route for student page
app.get('/student-page', (req, res) => {
    res.redirect('/login');
});

// Route for teacher page
app.get('/teacher-page', (req, res) => {
    res.redirect('/register-teacher');
});


// Route for displaying teacher registration form
app.get('/register-teacher', (req, res) => {
    res.sendFile(path.join(__dirname, 'register-teacher.html'));
});

// Route for handling teacher registration form submission
app.post('/register-teacher', (req, res) => {
    const { name, email, password } = req.body;

    // Insert teacher information into the Teacher table
    const insertTeacherSql = "INSERT INTO Teacher (Name, Email, Password) VALUES (?, ?, ?)";
    connection.query(insertTeacherSql, [name, email, password], (err, result) => {
        if (err) {
            console.error("Error registering teacher:", err);
            res.status(500).send("Error registering teacher");
            return;
        }
        console.log("Teacher registered successfully");

        // Redirect to the page for providing family member information
        res.redirect('/family-member-info');
    });
});

// Route for displaying the form for providing family member information
app.get('/family-member-info', (req, res) => {
    res.sendFile(path.join(__dirname, 'family-member-info.html'));
});

// Route for handling family member information submission
app.post('/family-member-info', (req, res) => {
    const { name, relationship} = req.body;

    // Insert family member information into the FamilyMember table
    const insertFamilyMemberSql = "INSERT INTO FamilyMember (Name, Relationship) VALUES (?, ?)";
    connection.query(insertFamilyMemberSql, [name, relationship], (err, result) => {
        if (err) {
            console.error("Error adding family member information:", err);
            res.status(500).send("Error adding family member information");
            return;
        }
        console.log("Family member information added successfully");
        res.status(200).send("Family member information added successfully");
    });
});


















app.get('/no-team-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'noteam.html'));
});

app.get('/menu-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'menupage.html'));
});

app.get('/performance-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'performancepage.html'));
});

app.get('/invitation-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'invitationpage.html'));
});



// Login route
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Login route
app.post('/login', (req, res) => {
    const { name, password } = req.body;

    // Querying the database for the user's credentials
    const sql = "SELECT * FROM Student WHERE Name = ? AND Password = ?";
    connection.query(sql, [name, password], (err, results) => {
        if (err) {
            console.error("Error logging in:", err);
            res.status(500).send("Error logging in");
        } else {
            if (results.length > 0) {
                console.log("Login successful");

                // Get the team name associated with the logged-in student
                const teamQuery = "SELECT t.Name FROM Team t LEFT JOIN Student s ON t.SID = s.StudentID WHERE s.Name = ?";
                connection.query(teamQuery, [name], (teamErr, teamResults) => {
                    if (teamErr) {
                        console.error("Error retrieving team:", teamErr);
                        res.status(500).send("Error retrieving team");
                    } else {
                        // Extract the team name from the query results
                        const team = teamResults.length > 0 ? teamResults[0].Name : null;

                        // Redirect based on team selection
                        if (team === 'menu') {
                            res.redirect('/menu-page');
                        } else if (team === 'performance') {
                            res.redirect('/performance-page');
                        } else if (team === 'invitation') {
                            res.redirect('/invitation-page');
                        } else {
                            res.redirect('/no-team-options');
                        }
                    }
                });
            } else {
                console.log("Invalid username or password");
                res.status(401).send("Invalid username or password");
            }
        }
    });
});



// Signup route
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

app.post('/signup', (req, res) => {
    const { name, password, email, team } = req.body;

    // Increment SID before using it
    SID += 1;

    // Inserting student information into the database
    const insertStudentSql = "INSERT INTO Student (Name, Email, Password) VALUES (?, ?, ?)";
    connection.query(insertStudentSql, [name, email, password], (err, result) => {
        if (err) {
            console.error("Error signing up student:", err);
            res.status(500).send("Error signing up");
            return;
        }
        
        // Inserting team information into the database
        const insertTeamSql = "INSERT INTO Team (Name,SID) VALUES (?,?)";
        connection.query(insertTeamSql, [team, SID], (err, result) => {
            if (err) {
                console.error("Error inserting team:", err);
                res.status(500).send("Error signing up");
                return;
            }
            console.log("Student signed up successfully");
            res.status(200).send("Student signed up successfully");

            // Update SID in file
            fs.writeFile('SID.txt', SID.toString(), (err) => {
                if (err) {
                    console.error("Error updating SID:", err);
                    return;
                }
                console.log("SID updated successfully");
            });
        });
    });
});



// menu pagessssssssssssssssssssssssssssssssssssssssssssss


app.get('/view-menu', (req, res) => {
    // Query to fetch all menu items from the Menu table
    const query = "SELECT MenuID, Name, Price FROM Menu";

    // Execute the query
    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching menu items:", err);
            res.status(500).send("Error fetching menu items");
            return;
        }

        // Send the view menu HTML file as the response with menu items data
        res.render(path.join(__dirname, 'view-menu'), { menuItems: results });
    });
});




app.get('/manage-menu', (req, res) => {
    // Render the manage menu page
    res.sendFile(path.join(__dirname, 'manage-menu.html'));
});

app.post('/add-menu-item', (req, res) => {
    const { itemName, itemDescription, itemPrice, ssid } = req.body;

    const insertMenuItemSql = "INSERT INTO Menu (Name, Description,Price,votes,sid) VALUES (?, ?, ?,0,?)";
    connection.query(insertMenuItemSql, [itemName, itemDescription, itemPrice, ssid], (err, result) => {
        if (err) {
            console.error("Error adding menu item:", err);
        } else {
            console.log("Added successful");
        }
    });
});

app.post('/remove-menu-item', (req, res) => {
    const { itemName } = req.body;

    const deleteMenuItemSql = "DELETE FROM Menu WHERE Name = ?";
    connection.query(deleteMenuItemSql, [itemName], (err, result) => {
        if (err) {
            console.error("Error removing menu item:", err);
        } else {
            console.log("Removed successful");
        }
    });
});


// Route for budget consideration
app.get('/budget-consideration', (req, res) => {
    res.sendFile(path.join(__dirname, 'menubudget.html'));
});

app.post('/budget-consideration', (req, res) => {
    const { itemCategory } = req.body;

    // Query to fetch the maximum price for the given category from the budget table
    const maxPriceQuery = "SELECT maximumprice FROM budget WHERE category = ?";
    connection.query(maxPriceQuery, [itemCategory], (err, maxPriceResults) => {
        if (err) {
            console.error("Error fetching maximum price for the category:", err);
            res.status(500).send("Error fetching maximum price");
            return;
        }

        // Extracting the maximum price from the query results
        const maximumPrice = maxPriceResults[0].maximumprice;

        // Query to fetch the price of the item from the menu table
        const itemPriceQuery = "SELECT Price FROM Menu WHERE Name = ?";
        connection.query(itemPriceQuery, [itemCategory], (err, itemPriceResults) => {
            if (err) {
                console.error("Error fetching item price:", err);
                res.status(500).send("Error fetching item price");
                return;
            }

            // Extracting the price of the item from the query results
            const itemPrice = itemPriceResults[0].Price;

            // Comparing the maximum price with the item price
            if (itemPrice > maximumPrice) {
                res.send(`Budget is exceeding for ${itemCategory}`);
            } else {
                res.send(`Selected item '${itemCategory}' is within budget`);
            }
        });
    });
});


// Route for displaying task assignment form for menu team
app.get('/assign-menu-task', (req, res) => {
    res.sendFile(path.join(__dirname, 'assign-menu-task.html'));
});

// Route for handling task assignment submission for menu team
app.post('/assign-menu-task', (req, res) => {
    const { taskType, taskText, assignedTo, teamid } = req.body;

    // Insert task assignment information into the database
    const insertTaskSql = "INSERT INTO task (tasktype, tasktext, assignedto, teamid) VALUES (?, ?, ?,?)";
    connection.query(insertTaskSql, [taskType, taskText, assignedTo, teamid], (err, result) => {
        if (err) {
            console.error("Error assigning menu task:", err);
            res.status(500).send("Error assigning task");
            return;
        }
        console.log("Menu task assigned successfully");
        res.status(200).send("Menu task assigned successfully");
    });
});



// perrrrrrrrrrrrrrrrrrrrrforrrrrrrrrrrrrmance   pageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

app.get('/view-performance', (req, res) => {
    // Query to fetch all menu items from the Menu table
    const query = "SELECT ppID, pptype, Socialrequirments FROM performancepropsal";

    // Execute the query
    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching menu items:", err);
            res.status(500).send("Error fetching menu items");
            return;
        }

        // Send the view menu HTML file as the response with menu items data
        res.render(path.join(__dirname, 'view-performance'), { performanceItems: results });
    });
});




app.get('/manage-performance', (req, res) => {
    res.sendFile(path.join(__dirname, 'manage-performance.html'));
});

// Route for accepting a performance
app.post('/accept-performance', (req, res) => {
    const performanceId = req.body.performanceId;

    // Retrieve performance details from performance proposal table based on ID
    const selectPerformanceSql = "SELECT * FROM performancepropsal WHERE PPID = ?";
    connection.query(selectPerformanceSql, [performanceId], (err, results) => {
        if (err) {
            console.error("Error accepting performance:", err);
            res.status(500).send("Error accepting performance");
            return;
        }

        if (results.length === 0) {
            res.status(404).send("Performance not found");
            return;
        }

        const { ppType } = results[0];
        const venue = "Margalla"; // Replace with actual venue
        const timeSlot = new Date(); // Replace with actual time slot
    
        // Insert accepted performance details into finalized performance table
        const insertFinalizedPerformanceSql = "INSERT INTO finalizedperformance (fpType, venue, timeslot) VALUES (?, ?, ?)";
        connection.query(insertFinalizedPerformanceSql, [ppType, venue, timeSlot], (err, insertResult) => {
            if (err) {
                console.error("Error accepting performance:", err);
                res.status(500).send("Error accepting performance");
                return;
            }

            const deletePerformanceSql = "DELETE FROM performancepropsal WHERE PPID = ?";
            connection.query(deletePerformanceSql, [performanceId], (err, deleteResult) => {
                if (err) {
                    console.error("Error deleting performance from proposal:", err);
                    res.status(500).send("Error accepting performance");
                    return;
                }
                console.log("Performance accepted successfully");
                res.status(200).send("Performance accepted successfully");
            });
        });
    });
});

// Route for rejecting a performance
app.post('/reject-performance', (req, res) => {
    const performanceId = req.body.rejectPerformanceId;

    // Remove rejected performance from performance proposal table
    const deletePerformanceSql = "DELETE FROM performancepropsal WHERE PPID = ?";
    connection.query(deletePerformanceSql, [performanceId], (err, result) => {
        if (err) {
            console.error("Error rejecting performance:", err);
            res.status(500).send("Error rejecting performance");
            return;
        }
        console.log("Performance rejected successfully");
        res.status(200).send("Performance rejected successfully");
    });
});



// Route for displaying the coordinate rehearsals page
app.get('/cordinate-rehersals', (req, res) => {
    res.sendFile(path.join(__dirname, 'coordinate.html'));
});


app.post('/coordinate-rehearsals', (req, res) => {
    const { performanceType,fppid } = req.body;


    // Insert rehearsal details into the rehearsal table

    const insertRehearsalSql = "INSERT INTO rehearsal (type,fpid,venue,timeslot) VALUES (?,?,'Margalla','03/12/24')";
    connection.query(insertRehearsalSql, [performanceType,fppid], (err, result) => {
        if (err) {
            console.error("Error coordinating rehearsal:", err);
            res.status(500).send("Error coordinating rehearsal");
            return;
        }
        
        console.log("Rehearsal coordinated successfully");
        res.status(200).send("Rehearsal coordinated successfully");
    });
});



app.get('/assign-performance-task', (req, res) => {
    res.sendFile(path.join(__dirname, 'assign-performance-task.html'));
});

// Route for handling task assignment submission for performance team
app.post('/assign-performance-task', (req, res) => {
    const { taskType, taskText, assignedTo } = req.body;

    // Insert task assignment information into the database
    const insertTaskSql = "INSERT INTO task (tasktype, tasktext, assignedto) VALUES (?, ?, ?)";
    connection.query(insertTaskSql, [taskType, taskText, assignedTo], (err, result) => {
        if (err) {
            console.error("Error assigning performance task:", err);
            res.status(500).send("Error assigning task");
            return;
        }
        console.log("Performance task assigned successfully");
        res.status(200).send("Performance task assigned successfully");
    });
});


// Invitationnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn

app.get('/invitation-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'invitationpage.html'));
});

app.post('/create-invitation', (req, res) => {
    const { title, body, recipient,ssid } = req.body;

    // Inserting invitation information into the database
    const insertInvitationSql = "INSERT INTO invitation (title, Body, recipentname,sid) VALUES (?, ?, ?,?)";
    connection.query(insertInvitationSql, [title, body, recipient,ssid], (err, result) => {
        if (err) {
            console.error("Error creating invitation:", err);
            res.status(500).send("Error creating invitation");
            return;
        }
        console.log("Invitation created successfully");
        res.status(200).send("Invitation created successfully");
    });
});


// noooooooooooooooooooooooooo teammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm

app.get('/no-team-options', (req, res) => {
    res.sendFile(path.join(__dirname, 'no-team-options.html'));
});

// Route for handling vote menu
app.post('/vote-menu', (req, res) => {
    const { menuItem } = req.body;

    // Increment the vote count for the selected menu item in the database
    const voteQuery = "UPDATE Menu SET votes = votes + 1 WHERE Name = ?";
    connection.query(voteQuery, [menuItem], (err, result) => {
        if (err) {
            console.error("Error voting for menu item:", err);
            res.status(500).send("Error voting for menu item");
            return;
        }
        console.log("Vote added successfully");
        res.status(200).send("Vote added successfully");
    });
});


// for performanceeeeeeeeeeeeeeeeee

// Route for handling vote on performance
app.post('/vote-performance', (req, res) => {
    const { performanceType } = req.body;

    // Increment the vote count for the selected performance type in the database
    const voteQuery = "UPDATE PerformancePropsal SET ppvotes = ppvotes + 1 WHERE ppType = ?";
    connection.query(voteQuery, [performanceType], (err, result) => {
        if (err) {
            console.error("Error voting for performance type:", err);
            res.status(500).send("Error voting for performance type");
            return;
        }
    });
});

/*
// Route for viewing finalized performance table
app.get('/view-finalperformance', (req, res) => {
    // Query to fetch all finalized performances from the FinalizedPerformance table
    const query = "SELECT * FROM FinalizedPerformance";

    // Execute the query
    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching finalized performances:", err);
            res.status(500).send("Error fetching finalized performances");
            return;
        }

        // Send the view-performance HTML file as the response with finalized performances data
        res.render(path.join(__dirname, 'view-finalperformance'), { finalizedPerformances: results });
    });
});*/

// Route for adding to performance proposal table
app.post('/add-performance-proposal', (req, res) => {
    const { performanceType, socialRequirements, ssid } = req.body;

    // Inserting proposal into the PerformanceProposal table
    const insertProposalSql = "INSERT INTO PerformancePropsal (ppType, Socialrequirments,ppvotes,sid) VALUES (?, ?,0,?)";
    connection.query(insertProposalSql, [performanceType, socialRequirements, ssid], (err, result) => {
        if (err) {
            console.error("Error adding to performance proposal:", err);
            res.status(500).send("Error adding to performance proposal");
            return;
        }
        console.log("Performance proposal added successfully");
        res.status(200).send("Performance proposal added successfully");
    });
});


// Route for displaying all tasks
app.get('/all-tasks', (req, res) => {
    // Query to fetch all tasks from the task table
    const query = "SELECT * FROM task";

    // Execute the query
    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching tasks:", err);
            res.status(500).send("Error fetching tasks");
            return;
        }

        // Render the all-tasks EJS file as the response with task data
        res.render(path.join(__dirname, 'all-tasks'), {tasks: results });
    });
});


// Route for handling attendance submission
app.post('/mark-attendance', (req, res) => {
    const { student, status,sidd } = req.body;

    // Insert attendance information into the Attendance table
    const insertAttendanceSql = "INSERT INTO attendancestudent (Student, Status,sid) VALUES (?, ?,?)";
    connection.query(insertAttendanceSql, [student, status, sidd], (err, result) => {
        if (err) {
            console.error("Error marking attendance:", err);
            res.status(500).send("Error marking attendance");
            return;
        }
        console.log("Attendance marked successfully");
        res.status(200).send("Attendance marked successfully");
    });
});





// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

