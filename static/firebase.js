import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, signOut   } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, collection,setDoc, addDoc,getDoc, getDocs, doc, updateDoc  } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log("worked")
        
const firebaseConfig = {
    apiKey: "AIzaSyArlRNk669hLIpAgEVaynk2ov95ctjm3Qg",
    authDomain: "foresightbyte-0001.firebaseapp.com",
    projectId: "foresightbyte-0001",
    storageBucket: "foresightbyte-0001.firebasestorage.app",
    messagingSenderId: "153825011541",
    appId: "1:153825011541:web:577c245b5c26418197b1dc",
    measurementId: "G-HM18BGQQP4"
    };
        
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
const auth = getAuth()
var userName;

var isAuth = false;

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    isAuth = true;
    console.log("authentic", user.uid);
    // testcreateUser(user.uid);
    getUserData(user.uid);
    toggleAuthButtons(true);
    // ...
  } else {
    // User is signed out
    // ...
    isAuth = false;
    toggleAuthButtons(false)
  }
});


  function logIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const buttonArea = document.getElementById('auth-buttons');
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Log In Successful:', user);
        isAuth = true;
        toggleAuthButtons(true)
        showPopup('success')
        window.location.href = "/myapp/chatui/";
      })
      .catch((error) => {
        console.error('Error logging in:', error.message);
        showPopup('error')
      });
  }

  // async function createUserProfile(uid) {
  //   try {
  //       await setDoc(doc(db, "users", uid), {
  //         name: document.getElementById('name').value,
  //         email: document.getElementById('email').value
  //       });
  //       console.log("Document written with ID: ", uid);
  //     } catch (e) {
  //       console.error("Error adding document: ", e);
  //     }
  // }

  // function resetPassword(){
  //   const email = document.getElementById('email').value;
  //   sendPasswordResetEmail(auth, email)
  //   .then(() => {
  //     console.log("Password reset email sent!")
  //     showPopup('success')
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log("reset error: ", errorMessage)
  //     showPopup('error')
  //     // ..
  //   });
  // }

  function logOut() {
    signOut(auth).then(() => {
        // Firebase sign-out successful
        isAuth = false;
        console.log("Logged out");

        // Notify Django backend to clear the session
        fetch('/clear-session/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken') // Include CSRF token
            },
        })
        .then(response => {
            if (response.ok) {
                console.log("Session cleared successfully");

                // Manually delete session cookies
                document.cookie = "sessionid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;";
                document.cookie = "session_uid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;";

                // Redirect to home page or login
                window.location.href = "/";
            } else {
                console.error("Failed to clear session");
            }
        })
        .catch(error => {
            console.error("Error clearing session:", error);
        });
    }).catch((error) => {
        console.error("Error logging out:", error);
    });
}


// Helper function to get CSRF token
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


  async function getUserData(uid) {
    console.log("uid", uid)
    document.cookie = `session_uid=${uid}; path=/;`;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().name);
      userName = docSnap.data().name;
      document.getElementById("userName").innerHTML = docSnap.data().name;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }



  



  function showAlert(){
    alert("worked")
  }

  // Function to show the popup
  function showPopup(msg) {
    if(msg === "success"){
      document.getElementById("popup").style.display = "block";
      document.getElementById("overlay").style.display = "block";
    } else {
      document.getElementById("error").style.display = "block";
      document.getElementById("overlay").style.display = "block";
    }
    
  }

  // Function to close the popup
  function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("error").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  }

  // Close the popup if the user clicks outside of it
  // document.getElementById("overlay").addEventListener("click", closePopup);

  // Function to control the visibility of the buttons
  function toggleAuthButtons(isAuth) {
    var authButtons = document.getElementsByClassName("auth-buttons");
    var logoutButtons = document.getElementsByClassName("logout-buttons");
    
    if (isAuth) {
        // Hide the button area if the user is authenticated
        for (var i = 0; i < logoutButtons.length; i++){
          logoutButtons[i].style.display = "block"; // Hide each element
        }
    } else {
        // Show the button area if the user is not authenticated
        for (var i = 0; i < authButtons.length; i++) {
            authButtons[i].style.display = "block"; // Show each element
        }
      }
    }

  window.logIn = logIn;
  window.logOut = logOut;
  window.showPopup = showPopup;
  window.closePopup = closePopup;
  window.toggleAuthButtons = toggleAuthButtons;
  // window.resetPassword = resetPassword;
  window.showAlert = showAlert;
  