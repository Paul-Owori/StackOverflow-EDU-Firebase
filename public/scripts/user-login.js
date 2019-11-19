$(document).ready(() => {

    console.log("Firebase==>", firebase),


        //Signup process
        $('#signUpBtn').click(() => {
            let userFirstName = $("#firstName").val();
            let userLastName = $("#lastName").val();
            let password1 = $("#password1").val();
            let password2 = $("#password2").val();
            let userEmail = $("#email").val();

            let verifiedUserFirstName;
            let verifiedUserLastName;
            let verifiedPassword;
            let verifiedUserEmail;


            //Checking if correct values are received

            userFirstName !== "" ? verifiedUserFirstName = userFirstName : alert(`Please enter your first name`)

            userLastName !== "" ? verifiedUserLastName = userLastName : alert(`Please enter your Last name`)

            userEmail !== "" ? verifiedUserEmail = userEmail : alert(`Please enter your Email`)

            password1 !== "" && password1 === password2 ? verifiedPassword = password1 : password1 === "" ? alert(`Please enter a password`) : alert(`Passwords do not match`);


            //Adding verified data to firebase database
            if (verifiedUserFirstName && verifiedUserLastName && verifiedUserEmail && verifiedPassword) {

                firebase.auth().createUserWithEmailAndPassword(verifiedUserEmail, verifiedPassword)
                    .then(res => {
                        console.log(res)
                    })
                    .catch(function (error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // [START_EXCLUDE]
                        if (errorCode == 'auth/weak-password') {
                            alert('The password is too weak.');
                        } else {
                            alert(errorMessage);
                        }
                        console.log(error);
                        // [END_EXCLUDE]
                    });

            }

        })


    //Login process
    $('#loginBtn').click(() => {

        let loginEmail = $("#loginEmail").val();
        let loginPassword = $("#loginPassword").val();

        let verifiedLoginEmail;
        let verifiedLoginPassword;

        //Checking if correct values are received
        !loginEmail ? alert("Please enter an email address") : verifiedLoginEmail = loginEmail;
        !loginPassword ? alert("Please enter an email address") : verifiedLoginPassword = loginPassword;


        if (loginEmail && loginPassword) {

            firebase.auth().signInWithEmailAndPassword(verifiedLoginEmail, verifiedLoginPassword)
                .then(res => {
                    console.log(res)
                })
                .catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // [START_EXCLUDE]
                    if (errorCode === 'auth/wrong-password') {
                        alert('Wrong password.');
                    } else {
                        alert(errorMessage);
                    }
                    console.log(error);
                    document.getElementById('quickstart-sign-in').disabled = false;
                    // [END_EXCLUDE]
                });

        }


    })




})