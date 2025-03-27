async function createExamButton() {
    event.preventDefault(); // Prevent form submission
    try {
        // Get form values
        const examData = {
            examId: 0, // Default value for new exams
            subjectName: document.getElementById('examSubjectSelect').value.trim(),
            paperDescription: document.getElementById('examNameInput').value.trim(),
            examDuration: parseInt(document.getElementById('examDurationInput').value),
            examTime: document.getElementById('examDateInput').value,
            examPaperType: document.getElementById('examTypeSelect').value.trim(),
            examContent: "TBD" // Replace with actual content if needed
        };

        // Validate form data
        if (!validateExamData(examData)) {
            throw new Error('Invalid form data. Please fill all required fields correctly.');
        }

        // API call with error handling
        const response = await fetch('https://localhost:7129/api/Exam', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Ensure token is valid
            },
            body: JSON.stringify(examData)
        });

        // Handle HTTP errors
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP ${response.status}: ${errorData.yourResponse || response.statusText}`);
        }

        // Handle successful response
        const result = await response.json();
        console.log('Exam created:', result);
        showSuccessMessage(`Exam created successfully! Subject: ${result.exam.subjectName}`);
        resetForm();

    } catch (error) {
        console.error('Full error details:', error);
        handleApiError(error);
    }
}

// Helper functions

function validateExamData(data) {
    return (
        data.subjectName &&
        data.paperDescription &&
        data.examDuration > 0 &&
        data.examTime &&
        data.examPaperType
    );
}

function handleApiError(error) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';

    if (error.message.includes('HTTP')) {
        // Handle HTTP errors
        const [status, message] = error.message.split(': ');
        errorDiv.innerHTML = `
            <strong>Error ${status}</strong>: ${message}
            <button class="btn-close" onclick="this.parentElement.remove()">×</button>
        `;
    } else {
        // Handle general errors
        errorDiv.textContent = error.message;
    }

    document.getElementById('main').prepend(errorDiv);
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success';
    successDiv.textContent = message;
    document.getElementById('main').prepend(successDiv);

    setTimeout(() => successDiv.remove(), 5000); // Auto-remove after 5 seconds
}

function resetForm() {
    document.getElementById('examForm').reset();
}

// Diagnostics for server issues

async function checkEndpointAvailability() {
    try {
        const response = await fetch('https://localhost:7129/api/Exam', { method: 'OPTIONS' });
        console.log('Endpoint availability check:', response.status);
    } catch (e) {
        console.error('Server unreachable:', e);
    }
}

function verifyCORSConfiguration() {
    fetch('https://localhost:7129/api/Exam', { method: 'HEAD' })
        .then(response => {
            console.log('CORS headers:', {
                'allow-origin': response.headers.get('Access-Control-Allow-Origin'),
                'allow-methods': response.headers.get('Access-Control-Allow-Methods')
            });
        })
        .catch(error => console.error('CORS configuration issue:', error));
}


async function loadExams() {
    try {
        // Clear existing table data
        const tbody = document.getElementById('existingExamsTable').querySelector('tbody');
        tbody.innerHTML = '';

        // Fetch exams from API
        const response = await fetch('https://localhost:7129/api/Exam', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.yourResponse !== "Success") {
            throw new Error(`API Error: ${data.yourResponse}`);
        }

        const exams = data.exams || [];

        // Populate table
        exams.forEach(exam => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${exam.paperDescription}</td>
                <td>${new Date(exam.examTime).toLocaleDateString()}</td>
                <td><span class="badge bg-success">Active</span></td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="editExam(${exam.examId})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteExam(${exam.examId})">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });

    } catch (error) {
        console.error('Error loading exams:', error);
        showErrorMessage(`Failed to load exams: ${error.message}`);
    }
}

function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.textContent = message;
    document.getElementById('main').prepend(errorDiv);
    setTimeout(() => errorDiv.remove(), 5000);
}

var EditExamCode = `
  <form id="editExamForm" style="display: none;" onsubmit="return saveExamChanges(event)">
  <div class="row">
  <div class="card col-lg-7">
  <div class="card-body">
    <h2 class="card-title">Edit Exam</h2>
    <input type="hidden" id="examIdInput">

    <label for="examSubjectSelect">Subject Name:</label>
    <input class="form-control" type="text" id="examSubjectSelect" required><br>

    <label for="examNameInput">Paper Description:</label>
    <input  class="form-control" type="text" id="examNameInput" required><br>

    <label for="examDurationInput">Exam Duration (minutes):</label>
    <input  class="form-control" type="number" id="examDurationInput" min="1" required><br>

    <label for="examDateInput">Exam Date:</label>
    <input  class="form-control" type="datetime-local" id="examDateInput" required><br>

    <label for="examTypeSelect">Paper Type:</label>
    <input  class="form-control" type="text" id="examTypeSelect" required><br>

    <button type="submit" class="btn btn-success" >Save Changes</button>
    <button type="button" class="btn btn-error" onclick="cancelEdit()">Cancel</button>
    </div>
    </div>
    </div>
  </form>
`;

// Function to populate the form with exam details when "Edit" is clicked
async function editExam(examId) {
  try {
    // Clear existing content and show form
    document.getElementById("main").innerHTML = EditExamCode;

    // Fetch exam details using path parameter (not query)
    const response = await fetch(`https://localhost:7129/api/Exam/${examId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.yourResponse !== "Success") {
      throw new Error(`API Error: ${data.yourResponse}`);
    }

    const exam = data.exam;

    // Populate form fields with fetched exam data
    document.getElementById('editExamForm').style.display = 'block';
    document.getElementById('examIdInput').value = exam.examId;
    document.getElementById('examSubjectSelect').value = exam.subjectName;
    document.getElementById('examNameInput').value = exam.paperDescription;
    document.getElementById('examDurationInput').value = exam.examDuration;
    document.getElementById('examDateInput').value = exam.examTime;
    document.getElementById('examTypeSelect').value = exam.examPaperType;

  } catch (error) {
    console.error('Error fetching exam:', error);
    showErrorMessage(`Failed to load exam: ${error.message}`);
  }
}

// Function to save changes made in the form
async function saveExamChanges(event) {
  event.preventDefault(); // Prevent page refresh

  try {
    // Get updated values from form fields
    const updatedExam = {
      examId: parseInt(document.getElementById('examIdInput').value),
      subjectName: document.getElementById('examSubjectSelect').value.trim(),
      paperDescription: document.getElementById('examNameInput').value.trim(),
      examDuration: parseInt(document.getElementById('examDurationInput').value),
      examTime: document.getElementById('examDateInput').value,
      examPaperType: document.getElementById('examTypeSelect').value.trim(),
      examContent: "TBD"
    };

    // Validate form data
    if (!validateExamData(updatedExam)) {
      throw new Error("Invalid form data. Please ensure all fields are filled correctly.");
    }

    // Send PUT request using path parameter (not query)
    const response = await fetch(`https://localhost:7129/api/Exam/${updatedExam.examId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify(updatedExam),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP ${response.status}: ${errorData.yourResponse || response.statusText}`);
    }

    const result = await response.json();
    document.getElementById("main").innerHTML = '';
    showSuccessMessage("Exam updated successfully!");
    
  } catch (error) {
    console.error('Error saving changes:', error);
    showErrorMessage(`Failed to save exam: ${error.message}`);
  }
}

// Helper function to validate form data
function validateExamData(data) {
  return (
    typeof data.subjectName === 'string' && data.subjectName.trim() !== '' &&
    typeof data.paperDescription === 'string' && data.paperDescription.trim() !== '' &&
    typeof data.examDuration === 'number' && data.examDuration > 0 &&
    typeof data.examTime === 'string' && data.examTime.trim() !== '' &&
    typeof data.examPaperType === 'string' && data.examPaperType.trim() !== ''
  );
}

// Function to cancel editing and hide the form
function cancelEdit() {
  document.getElementById("main").innerHTML = '';
  showErrorMessage("Editing exam details has been cancelled !"); // Clear form content
}


async function deleteExam(examId) {
    try {
      // Send DELETE request to API
      const response = await fetch(`https://localhost:7129/api/Exam/${examId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP ${response.status}: ${errorData.yourResponse || response.statusText}`);
      }
  
      // Handle success
      showSuccessMessage("Exam deleted successfully!");
      loadExams(); // Refresh table after deletion
  
    } catch (error) {
      console.error('Error deleting exam:', error);
      showErrorMessage(`Failed to delete exam: ${error.message}`);
    }
  }
  