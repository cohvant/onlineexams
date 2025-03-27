// Profile Section
function showProfile() {
    var currentAccountType = localStorage.getItem("AccountType");
    var currentUsername = localStorage.getItem("Username");
    var fullName = 'Full Name N/A';
    if (currentAccountType==="Teacher") fullName = localStorage.getItem("TeacherName");
  
    var profileInfo = `
      <div class="pagetitle">
        <h1>Your Profile</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">System Settings/User Profile</li>
          </ol>
        </nav>
      </div>
  
      <form action="" method="POST">
        <section class="section">
          <div class="row">
            <div class="col-lg-7">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title"><b>Account Information</b></h5>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="row mb-3">
                        <div class="col-sm-12">
                          <input type="email" class="form-control" name="currentUsername" value="` + fullName + `" readonly>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="row mb-3">
                        <div class="col-sm-12">
                          <input type="text" class="form-control" name="currentAccountType" value="` + currentAccountType + `" readonly>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="row mb-3">
                        <div class="col-sm-12">
                          <input type="email" class="form-control" name="currentUsername" value="` + currentUsername + `" readonly>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    `;
    document.getElementById('main').innerHTML = profileInfo;
  }
  
  //CREATE EXAMS
  function createExam() {
    var content = `
      <div class="pagetitle">
        <h1>Create Exam</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Exam Management/Create Exam</li>
          </ol>
        </nav>
      </div>
  
      <form action="" method="POST" id="examForm">
        <section class="section">
          <div class="row">
            <div class="col-lg-7">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title"><b>Exam Details</b></h5>
                  <div class="row">
  
                    <!-- Subject Selector -->
                    <div class="col-lg-12">
                      <div class="row mb-3">
                        <div class="col-sm-12">
                          <select 
                            class="form-control" 
                            id="examSubjectSelect" 
                            name="examSubject" 
                            required
                          >
                            <option selected disabled value="">Subject Name</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="English Language">English Language</option>
                            <option value="Ndebele Language">Ndebele Language</option>
                            <option value="Geography">Geography</option>
                            <option value="Combined Science">Combined Science</option>
                          </select>
                        </div>
                      </div>
                    </div>
  
                    <!-- Exam Name Input -->
                    <div class="col-lg-12">
                      <div class="row mb-3">
                        <div class="col-sm-12">
                          <input 
                            type="text" 
                            class="form-control" 
                            id="examNameInput" 
                            name="examName" 
                            placeholder="Exam Description" 
                            required
                          >
                        </div>
                      </div>
                    </div>
  
                    <!-- Duration Input -->
                    <div class="col-lg-12">
                      <div class="row mb-3">
                        <div class="col-sm-12">
                          <label>Exam Duration In Minutes</label>
                          <input 
                            type="number" 
                            class="form-control" 
                            id="examDurationInput" 
                            name="examDuration" 
                            required
                          >
                        </div>
                      </div>
                    </div>
  
                    <!-- Date Input -->
                    <div class="col-lg-12">
                      <div class="row mb-3">
                        <div class="col-sm-12">
                          <input 
                            type="datetime-local" 
                            class="form-control" 
                            id="examDateInput" 
                            name="examDate" 
                            required
                          >
                        </div>
                      </div>
                    </div>
  
                    <!-- Exam Type Selector -->
                    <div class="col-lg-12">
                      <div class="row mb-3">
                        <div class="col-sm-12">
                          <select 
                            class="form-control" 
                            id="examTypeSelect" 
                            name="examType" 
                            required
                          >
                            <option selected disabled value="">Select Exam Type</option>
                            <option value="Multiple Choice">Multiple Choice Questions</option>
                            <option value="Free Will">Free Will Answer Questions</option>
                          </select>
                        </div>
                      </div>
                    </div>
  
                    <!-- Submit Button -->
                    <div class="col-lg-12">
                      <div class="row mb-3">
                        <div class="col-sm-12">
                          <button 
                            id="CreateExamButton" 
                            class="btn btn-success" 
                            onclick="createExamButton();"
                          >
                            Create Exam
                          </button>
                        </div>
                      </div>
                    </div>
  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    `;
    document.getElementById('main').innerHTML = content;
  }
  
  
  function manageExams() {
    var content = `
      <div class="pagetitle">
        <h1>Manage Exams</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Exam Management/Manage Exams</li>
          </ol>
        </nav>
      </div>
  
      <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><b>Exam List</b></h5>
                <table class="table table-hover"  id="existingExamsTable">
                  <thead>
                    <tr>
                      <th>Exam Name</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Mathematics Exam</td>
                      <td>2025-03-30</td>
                      <td><span class="badge bg-success">Active</span></td>
                      <td>
                        <button class="btn btn-sm btn-primary">Edit</button>
                        <button class="btn btn-sm btn-danger">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.getElementById('main').innerHTML = content;
  }
  
  function examTemplates() {
    var content = `
      <div class="pagetitle">
        <h1>Exam Templates</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Exam Management/Exam Templates</li>
          </ol>
        </nav>
      </div>
  
      <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><b>Predefined Templates</b></h5>
                <div class="row">
                  <div class="col-md-4">
                    <div class="card bg-primary text-white">
                      <div class="card-body">
                        <h5 class="card-title">Standard Template</h5>
                        <p class="card-text">Basic exam structure</p>
                        <button class="btn btn-light" onclick="loadTempelate()">Test Template</button>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="card bg-success text-white">
                      <div class="card-body">
                        <h5 class="card-title">Advanced Template</h5>
                        <p class="card-text">With AI grading options</p>
                        <button class="btn btn-light" onclick="showQuestionsAITempelate();">Test Template</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.getElementById('main').innerHTML = content;
  }
  
  // Question Bank
  function createQuestion() {
    var content = `
      <div class="pagetitle">
        <h1>Create Question</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Question Bank/Create Question</li>
          </ol>
        </nav>
      </div>
  
      <form action="" method="POST">
        <section class="section">
          <div class="row">
            <div class="col-lg-7">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title"><b>Question Details</b></h5>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="row mb-3">
                        <div class="col-sm-12">
                          <textarea class="form-control" name="questionText" placeholder="Question text" rows="3"></textarea>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="row mb-3">
                        <div class="col-sm-12">
                          <input type="text" class="form-control" name="correctAnswer" placeholder="Correct answer" required>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    `;
    document.getElementById('main').innerHTML = content;
  }
  
  function manageQuestions() {
    var content = `
      <div class="pagetitle">
        <h1>Manage Questions</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Question Bank/Manage Questions</li>
          </ol>
        </nav>
      </div>
  
      <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><b>Question List</b></h5>
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Question Text</th>
                      <th>Correct Answer</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>What is the capital of France?</td>
                      <td>Paris</td>
                      <td>
                        <button class="btn btn-sm btn-primary">Edit</button>
                        <button class="btn btn-sm btn-danger">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.getElementById('main').innerHTML = content;
  }
  
  function questionCategories() {
    var content = `
      <div class="pagetitle">
        <h1>Question Categories</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Question Bank/Question Categories</li>
          </ol>
        </nav>
      </div>
  
      <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><b>Category List</b></h5>
                <div class="row">
                  <div class="col-md-4">
                    <div class="card bg-primary text-white">
                      <div class="card-body">
                        <h5 class="card-title">Mathematics</h5>
                        <p class="card-text">Algebra, Geometry, Calculus</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="card bg-success text-white">
                      <div class="card-body">
                        <h5 class="card-title">Science</h5>
                        <p class="card-text">Biology, Chemistry, Physics</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.getElementById('main').innerHTML = content;
  }
  
  // Student Management
  function addStudent() {
    var content = `
      <div class="pagetitle">
        <h1>Add Student</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Student Management/Add Student</li>
          </ol>
        </nav>
      </div>
  
      <form action="" method="POST">
        <section class="section">
          <div class="row">
            <div class="col-lg-7">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title"><b>Student Details</b></h5>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="row mb-3">
                        <div class="col-sm-12">
                          <input type="text" class="form-control" name="studentName" placeholder="Student Name" required>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="row mb-3">
                        <div class="col-sm-12">
                          <input type="email" class="form-control" name="studentEmail" placeholder="Student Email" required>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    `;
    document.getElementById('main').innerHTML = content;
  }
  
  function manageStudents() {
    var content = `
      <div class="pagetitle">
        <h1>Manage Students</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Student Management/Manage Students</li>
          </ol>
        </nav>
      </div>
  
      <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><b>Student List</b></h5>
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>John Doe</td>
                      <td>johndoe@example.com</td>
                      <td>
                        <button class="btn btn-sm btn-primary">Edit</button>
                        <button class="btn btn-sm btn-danger">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.getElementById('main').innerHTML = content;
  }
  
  function studentGroups() {
    var content = `
      <div class="pagetitle">
        <h1>Student Groups</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Student Management/Student Groups</li>
          </ol>
        </nav>
      </div>
  
      <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><b>Group List</b></h5>
                <div class="row">
                  <div class="col-md-4">
                    <div class="card bg-primary text-white">
                      <div class="card-body">
                        <h5 class="card-title">Group A</h5>
                        <p class="card-text">Advanced students</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="card bg-success text-white">
                      <div class="card-body">
                        <h5 class="card-title">Group B</h5>
                        <p class="card-text">Intermediate students</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.getElementById('main').innerHTML = content;
  }
  
  // Results & Analytics
  function viewResults() {
    var content = `
      <div class="pagetitle">
        <h1>View Results</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Results & Analytics/View Results</li>
          </ol>
        </nav>
      </div>
  
      <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><b>Exam Results</b></h5>
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Exam Name</th>
                      <th>Student</th>
                      <th>Score</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Mathematics Exam</td>
                      <td>John Doe</td>
                      <td>85%</td>
                      <td>
                        <button class="btn btn-sm btn-primary">View Details</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.getElementById('main').innerHTML = content;
  }
  
  function generateReports() {
    var content = `
      <div class="pagetitle">
        <h1>Generate Reports</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Results & Analytics/Generate Reports</li>
          </ol>
        </nav>
      </div>
  
      <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><b>Report Options</b></h5>
                <div class="row">
                  <div class="col-md-4">
                    <div class="card bg-primary text-white">
                      <div class="card-body">
                        <h5 class="card-title">Student Performance</h5>
                        <p class="card-text">Individual student reports</p>
                        <button class="btn btn-light">Generate</button>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="card bg-success text-white">
                      <div class="card-body">
                        <h5 class="card-title">Exam Summary</h5>
                        <p class="card-text">Overall exam statistics</p>
                        <button class="btn btn-light">Generate</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.getElementById('main').innerHTML = content;
  }
  function analyticsDashboard() {
    var content = `
      <div class="pagetitle">
        <h1>Analytics Dashboard</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Results & Analytics/Analytics Dashboard</li>
          </ol>
        </nav>
      </div>
  
      <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><b>Exam Performance Overview</b></h5>
                <div class="row">
                  <div class="col-md-6">
                    <div class="card bg-primary text-white">
                      <div class="card-body">
                        <h5 class="card-title">Average Score</h5>
                        <p class="card-text">85%</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="card bg-success text-white">
                      <div class="card-body">
                        <h5 class="card-title">Pass Rate</h5>
                        <p class="card-text">92%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.getElementById('main').innerHTML = content;
  }
  
  // AI Grading
  function configureAI() {
    var content = `
      <div class="pagetitle">
        <h1>Configure AI</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">AI Grading/Configure AI</li>
          </ol>
        </nav>
      </div>
  
      <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><b>AI Configuration</b></h5>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Accuracy Threshold</label>
                      <input type="number" class="form-control" value="90" min="0" max="100">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Response Time Limit</label>
                      <input type="number" class="form-control" value="30" min="10" max="60">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.getElementById('main').innerHTML = content;
  }
  
  function viewAIResults() {
    var content = `
      <div class="pagetitle">
        <h1>View AI Results</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">AI Grading/View AI Results</li>
          </ol>
        </nav>
      </div>
  
      <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><b>AI Grading Results</b></h5>
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Exam Name</th>
                      <th>Student</th>
                      <th>AI Score</th>
                      <th>Accuracy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Mathematics Exam</td>
                      <td>John Doe</td>
                      <td>85%</td>
                      <td><span class="badge bg-success">High</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.getElementById('main').innerHTML = content;
  }
  
  function trainAIModel() {
    var content = `
      <div class="pagetitle">
        <h1>Train AI Model</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">AI Grading/Train AI Model</li>
          </ol>
        </nav>
      </div>
  
      <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><b>Model Training</b></h5>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Training Data Source</label>
                      <select class="form-control">
                        <option>Previous Exams</option>
                        <option>Manual Upload</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Training Duration</label>
                      <input type="number" class="form-control" value="60" min="30" max="360">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.getElementById('main').innerHTML = content;
  }
  
  // Notifications
  function viewNotifications() {
    var content = `
      <div class="pagetitle">
        <h1>View Notifications</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Notifications/View Notifications</li>
          </ol>
        </nav>
      </div>
  
      <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><b>Notification List</b></h5>
                <div class="alert alert-primary alert-dismissible fade show" role="alert">
                  <strong>New Exam Scheduled!</strong> Mathematics Exam scheduled for March 30, 2025.
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.getElementById('main').innerHTML = content;
  }
  
  function createNotification() {
    var content = `
      <div class="pagetitle">
        <h1>Create Notification</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Notifications/Create Notification</li>
          </ol>
        </nav>
      </div>
  
      <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><b>Notification Details</b></h5>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Notification Type</label>
                      <select class="form-control">
                        <option>Exam Reminder</option>
                        <option>Result Announcement</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Recipient Group</label>
                      <select class="form-control">
                        <option>All Students</option>
                        <option>Group A</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.getElementById('main').innerHTML = content;
  }
  
  function notificationSettings() {
    var content = `
      <div class="pagetitle">
        <h1>Notification Settings</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Notifications/Notification Settings</li>
          </ol>
        </nav>
      </div>
  
      <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><b>Notification Preferences</b></h5>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Notification Frequency</label>
                      <select class="form-control">
                        <option>Instant</option>
                        <option>Daily Digest</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Preferred Channel</label>
                      <select class="form-control">
                        <option>Email</option>
                        <option>In-App</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.getElementById('main').innerHTML = content;
  }
  
  // Exam Scheduling
  function scheduleExam() {
    var content = `
      <div class="pagetitle">
        <h1>Schedule Exam</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Exam Scheduling/Schedule Exam</li>
          </ol>
        </nav>
      </div>
  
      <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><b>Exam Schedule</b></h5>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Exam Date</label>
                      <input type="datetime-local" class="form-control" required>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Duration</label>
                      <input type="number" class="form-control" value="60" min="30" max="360">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.getElementById('main').innerHTML = content;
  }
  
  function viewSchedule() {
    var content = `
      <div class="pagetitle">
        <h1>View Schedule</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Exam Scheduling/View Schedule</li>
          </ol>
        </nav>
      </div>
  
      <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><b>Exam Schedule</b></h5>
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Exam Name</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Mathematics Exam</td>
                      <td>2025-03-30</td>
                      <td><span class="badge bg-success">Scheduled</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.getElementById('main').innerHTML = content;
  }
  
  function scheduleSettings() {
    var content = `
      <div class="pagetitle">
        <h1>Schedule Settings</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Exam Scheduling/Schedule Settings</li>
          </ol>
        </nav>
      </div>
  
      <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><b>Scheduling Preferences</b></h5>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Default Duration</label>
                      <input type="number" class="form-control" value="60" min="30" max="360">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Timezone</label>
                      <select class="form-control">
                        <option>UTC</option>
                        <option>Local Time</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.getElementById('main').innerHTML = content;
  }
  
  // Exam Security
  function configureSecurity() {
    var content = `
      <div class="pagetitle">
        <h1>Configure Security</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Exam Security/Configure Security</li>
          </ol>
        </nav>
      </div>
  
      <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><b>Security Settings</b></h5>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Encryption Level</label>
                      <select class="form-control">
                        <option>High</option>
                        <option>Medium</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Access Restrictions</label>
                      <select class="form-control">
                        <option>IP Whitelisting</option>
                        <option>Device Fingerprinting</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.getElementById('main').innerHTML = content;
  }
  
  function viewSecurityLogs() {
    var content = `
      <div class="pagetitle">
        <h1>Security Logs</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Exam Security/Security Logs</li>
          </ol>
        </nav>
      </div>
  
      <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><b>Security Logs</b></h5>
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Timestamp</th>
                      <th>Event</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2025-03-26 14:30</td>
                      <td>Login Attempt</td>
                      <td><span class="badge bg-success">Success</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.getElementById('main').innerHTML = content;
  }
  
  function securitySettings() {
    var content = `
      <div class="pagetitle">
        <h1>Security Settings</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Exam Security/Security Settings</li>
          </ol>
        </nav>
      </div>
  
      <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><b>Security Preferences</b></h5>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Session Timeout</label>
                      <input type="number" class="form-control" value="30" min="15" max="60">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Two-Factor Authentication</label>
                      <select class="form-control">
                        <option>Enabled</option>
                        <option>Disabled</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.getElementById('main').innerHTML = content;
  }
  function generalSettings() {
    var content = `
      <div class="pagetitle">
        <h1>General Settings</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Exam Settings/General Settings</li>
          </ol>
        </nav>
      </div>
  
      <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><b>General Preferences</b></h5>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Default Exam Duration</label>
                      <input type="number" class="form-control" value="60" min="30" max="360">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Timezone</label>
                      <select class="form-control">
                        <option>UTC</option>
                        <option>Local Time</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.getElementById('main').innerHTML = content;
  }
  
  function appearanceSettings() {
    var content = `
      <div class="pagetitle">
        <h1>Appearance Settings</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Exam Settings/Appearance Settings</li>
          </ol>
        </nav>
      </div>
  
      <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><b>Visual Preferences</b></h5>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Theme Color</label>
                      <select class="form-control">
                        <option>Blue</option>
                        <option>Green</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Font Size</label>
                      <select class="form-control">
                        <option>Default</option>
                        <option>Large</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.getElementById('main').innerHTML = content;
  }
  
  function advancedSettings() {
    var content = `
      <div class="pagetitle">
        <h1>Advanced Settings</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Exam Settings/Advanced Settings</li>
          </ol>
        </nav>
      </div>
  
      <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><b>Technical Configuration</b></h5>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>API Endpoint</label>
                      <input type="text" class="form-control" value="https://api.example.com/exams">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Debug Mode</label>
                      <select class="form-control">
                        <option>Disabled</option>
                        <option>Enabled</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.getElementById('main').innerHTML = content;
  }
  
  // Help & Support
  function helpCenter() {
    var content = `
      <div class="pagetitle">
        <h1>Help Center</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Help & Support/Help Center</li>
          </ol>
        </nav>
      </div>
  
      <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><b>Quick Guides</b></h5>
                <div class="row">
                  <div class="col-md-4">
                    <div class="card bg-primary text-white">
                      <div class="card-body">
                        <h5 class="card-title">Exam Creation Guide</h5>
                        <p class="card-text">Step-by-step tutorial</p>
                        <button class="btn btn-light">View Guide</button>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="card bg-success text-white">
                      <div class="card-body">
                        <h5 class="card-title">AI Grading Guide</h5>
                        <p class="card-text">Configuration best practices</p>
                        <button class="btn btn-light">View Guide</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.getElementById('main').innerHTML = content;
  }
  
  function contactSupport() {
    var content = `
      <div class="pagetitle">
        <h1>Contact Support</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Help & Support/Contact Support</li>
          </ol>
        </nav>
      </div>
  
      <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><b>Contact Form</b></h5>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Subject</label>
                      <input type="text" class="form-control" placeholder="Enter subject">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Priority</label>
                      <select class="form-control">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.getElementById('main').innerHTML = content;
  }
  
  function systemUpdates() {
    var content = `
      <div class="pagetitle">
        <h1>System Updates</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">Help & Support/System Updates</li>
          </ol>
        </nav>
      </div>
  
      <section class="section">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><b>Update History</b></h5>
                <div class="alert alert-primary alert-dismissible fade show" role="alert">
                  <strong>Update Available!</strong> Version 2.1.0 released on March 25, 2025.
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    document.getElementById('main').innerHTML = content;
  }
  