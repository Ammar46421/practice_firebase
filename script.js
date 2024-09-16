import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCGevvJoJoStRPr5Xn_qYjkfc3FLH1dCu4",
    authDomain: "auth-d6793.firebaseapp.com",
    projectId: "auth-d6793",
    storageBucket: "auth-d6793.appspot.com",
    messagingSenderId: "20536156957",
    appId: "1:20536156957:web:c3db6dee14eecc759337f4",
    measurementId: "G-RHEJ73L24Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase();

const auth_container = document.getElementById("auth_container");
const user_info = document.getElementById("user_info");

const signup_btn = document.getElementById("signup_btn");
const signin_btn = document.getElementById("signin_btn");
const logout_btn = document.getElementById("logout");

function signUpMessage(message, divId){
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = 'block';
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
        messageDiv.style.display = 'none';
    }, 3000);
}

signup_btn.addEventListener('click', (event) => {
    event.preventDefault();
    const username = document.getElementById("name"); 
    const signup_email = document.getElementById('signup_email');
    const signup_password = document.getElementById('signup_password');
    createUserWithEmailAndPassword(auth, signup_email.value, signup_password.value)
    .then((userCredentials) => {
        const user =  userCredentials.user;
        const userData = {
            name : username.value,
            email : signup_email.value,
            password : signup_password.value
        }
        console.log('Account created successfully', 'signUpMessage')
        const docRef = doc(db , 'users', user.uid);
        setDoc(docRef, userData)
        .then(() => {
            window.location.href = '/signin.html';
        })
        .catch((error) => {
            console.error('Error adding document: ', error);
        });
        
    })
    .catch((error) => {
        const errorCode = error.code
        if(errorCode == 'email already exists'){
            console.log('Email already exists', 'signUpMessage')
        }else{
            console.log('unable to create user', 'signUpMessage');
            
        }
    })
})
