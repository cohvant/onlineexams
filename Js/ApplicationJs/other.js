

document.getElementById('loginBtn').addEventListener('click', function(event) {
  event.preventDefault();

  // Get input values
  const enteredUsername = document.getElementById('email').value.trim();
  const enteredPassword = document.getElementById('password').value.trim();
  document.getElementById('email').value="";
  document.getElementById('password').value="";

  // Input validation
  if (!enteredUsername || !enteredPassword) {
    showAlert("false","Either username or password is missing!",5);
    return;
  }

  // API request configuration
  const apiConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: enteredUsername,
      password: enteredPassword
    })
  };

  // Fetch API call
  fetch(API_URL, apiConfig)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
     if (data.yourResponse.toString().toLowerCase()==="success"){
localStorage.setItem('Username', enteredUsername);
localStorage.setItem('AccountType', data.AccountType);
localStorage.setItem('SessionId',data.sessionID);
if (data.AccountType==="Teacher"){
  localStorage.setItem("FullName", data.TeacherName)
}else{
  alert("Set other account types here !");
}
showAlert("true","Authentication Successful !",2);

if (data.AccountType==="Teacher"){localStorage.setItem('TeacherName',data.TeacherName);window.location.href = "Teacher/";return;}
if (data.AccountType==="Student"){window.location.href = "Student";return;}
if (data.AccountType==="ExamsOfficer"){window.location.href = "ExamsOfficer";return;}
if (data.AccountType==="SystemAdministrator"){window.location.href = "SystemAdministrator";return;}

     }
     else{
      showAlert("false",data.yourResponse,4 );return;
     }
    })
    .catch(error => {
      console.error('Error:', error);
      showAlert('Login failed. Please check credentials / network.');
    });
});


function showProfile(){
  var currentAccountType = localStorage.getItem("AccountType");
  var currentUsername = localStorage.getItem("Username");
  var fullName = 'Full Name N/A';
  if (currentAccountType==="Teacher"){
fullName = localStorage.getItem("TeacherName");
  };


  var profileInfo=`
  <div class="pagetitle">
      <h1>Your Profile</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item active">System Settings/User Profile</li>
        </ol>
      </nav>
    </div><!-- End Page Title -->

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
                    <input type="email" class="form-control" name="currentUsername" value="`+ fullName +`" readonly>
                  </div>
                </div>
              </div>
             
              <div class="col-lg-12">
                <div class="row mb-3">
                  <div class="col-sm-12">
                    <input type="text" class="form-control" name="currentAccountType" value="`+ currentAccountType +`" readonly>
                  </div>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="row mb-3">
                  <div class="col-sm-12">
                    <input type="email" class="form-control" name="currentUsername" value="`+ currentUsername +`" readonly>
                  </div>
                </div>
              </div>
             
           </div><br>
            </div>
                    </div>

        </div>

        
      </div>
    </section>
 </form>
  `;

  document.getElementById('main').innerHTML = profileInfo;
}



function signOut(){
  localStorage.setItem('Username', "");
localStorage.setItem('AccountType', "");
localStorage.setItem('SessionId',"");
window.location.href='http://www.onlineexams.com';
}
function checkLogin(accountType){
  var currentUsername=localStorage.getItem('Username');
  var currentAccountType=localStorage.getItem('AccountType');

  if (!currentUsername || !currentAccountType){
    alert("Your session is not active, re-login !");
    window.location.href='http://www.onlineexams.com';
  }

  if (!(currentAccountType.toString().toLocaleLowerCase()===accountType.toString().toLowerCase())){
    alert("Your session was terminated, re-login !");
    window.location.href='http://www.onlineexams.com';return;
  }
}




