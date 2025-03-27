    function showAlert(isASuccessMessage, theMessage, timeOutInSeconds) {
            var alertBox = document.getElementById('alertBox');
            alertBox.style.display = 'block';
alertBox.innerHTML = theMessage;
            if (isASuccessMessage==="true"){alertBox.style.backgroundColor="darkgreen";alertBox.style.color="white"}else{alertBox.style.backgroundColor="red";alertBox.style.color="white"};
            setTimeout(function() {
                alertBox.style.display = 'none';
            }, (1000 * timeOutInSeconds));
        }

        document.querySelectorAll('.toggle-password').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const loginForm = document.getElementById('loginForm');
                const forgotForm = document.getElementById('forgot-password-form');

                if (forgotForm.style.display === 'block') {
                    forgotForm.style.display = 'none';
                    forgotForm.style.opacity = '0';
                    loginForm.style.display = 'block';
                } else {
                    loginForm.style.display = 'none';
                    forgotForm.style.display = 'block';
                    forgotForm.style.opacity = '1';
                }
            });
        });

    