import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import logoicon from '../assets/wave-data-logo.svg'
function Login() {
      let navigate = useNavigate();
   window.onload = (e) => {
      if (Cookies.get("login") == "true") {      
         navigate("/courses",{replace:true});
      }
   };

   function registerLink() {
      navigate("/register",{replace:true});
   }
   async function LoginClick(event) {
      event.target.disabled = true;
      var buttonTextBox = document.getElementById("buttonText");
      var LoadingICON = document.getElementById("LoadingICON");
      var SuccessNotification = document.getElementById("notification-success")
      var FailedNotification = document.getElementById("notification-error")
      buttonTextBox.style.display = "none";
      LoadingICON.style.display = "block";
      SuccessNotification.style.display = "none";
      FailedNotification.style.display = "none";

      var emailTXT = document.getElementById("email")
      var passwordTXT = document.getElementById("password")
      if (emailTXT.value == "" || passwordTXT.value == "") {
         FailedNotification.innerText = "Email and Password must be filled!"
         FailedNotification.style.display = "block";
         buttonTextBox.style.display = "block";
         LoadingICON.style.display = "none";
         return;
      }
      try {
         await fetch(`https://cors-anyhere.herokuapp.com/https://test.i.tgcloud.io:14240/restpp/query/WaveData/Login?emailTXT=${encodeURIComponent(emailTXT.value)}&passwordTXT=${encodeURIComponent(passwordTXT.value)}`, {
            "headers": {
               "accept-language": "en-US,en;q=0.9",
               "Authorization": "Bearer n63cf58df61rvnp6dgeq4a4rolokeoe8",
            },
            "body": null,
            "method": "GET"
         }).then(e => {
            return e.json();
         }).then(e => {
            console.log(e)
            if (e.results[1]['(SV.size())'] == 1) {
               LoadingICON.style.display = "none";
               buttonTextBox.style.display = "block";
               SuccessNotification.innerText = "Success!"
               SuccessNotification.style.display = "block";
               //Login success
               Cookies.set("login", "true");
               navigate("/courses",{replace:true});

            } else {
               LoadingICON.style.display = "none";
               buttonTextBox.style.display = "block";
               FailedNotification.innerText = "Username/Password Incorrect"
               FailedNotification.style.display = "block";
            }
            console.log(e);
         })
      } catch (error) {
         LoadingICON.style.display = "none";
         buttonTextBox.style.display = "block";
         FailedNotification.style.display = "none";
         FailedNotification.innerText = "Error! Please try again!"
      }
      event.target.disabled = false;

   }


   return (
      <div className="min-h-screen grid-cols-2 flex">
         <div className="bg-blue-200 flex-1">
            <img src={require('../assets/login-picture.png')} className="h-full" alt="WaveData Logo" />
         </div>
         <div className="bg-white flex-1 flex flex-col justify-center items-center">
            <div className="pl-20 pr-20">
               <img src={logoicon} className="w-3/4 mx-auto" alt="WaveData Logo" />
               <h4 className="text-4xl font-semibold mt-10">Next business steps together</h4>
               <div id='notification-success' style={{ display: 'none' }} className="mt-4 text-center bg-gray-200 relative text-gray-500 py-3 px-3 rounded-lg">
                  Success!
               </div>
               <div id='notification-error' style={{ display: 'none' }} className="mt-4 text-center bg-red-200 relative text-red-600 py-3 px-3 rounded-lg">
                  Error! Please try again!
               </div>
               <div className="mt-10">
                  <label className="flex flex-col font-semibold">
                     Email
                     <input type="email" id="email" name="email" className="mt-2 h-10 border border-gray-200 rounded-md outline-none px-2 focus:border-gray-400" />
                  </label>
                  <label className="flex flex-col font-semibold mt-3">
                     Password
                     <input type="password" id="password" name="password" className="mt-2 h-10 border border-gray-200 rounded-md outline-none px-2 focus:border-gray-400" />
                  </label>
                  <button onClick={LoginClick} className="bg-orange-500 text-white rounded-md shadow-md h-10 w-full mt-3 hover:bg-orange-600 transition-colors overflow:hidden flex content-center items-center justify-center cursor-pointer">
                     <i id='LoadingICON' style={{ display: "none" }} className="select-none block w-min m-0 fa fa-circle-o-notch fa-spin"></i>
                     <span id='buttonText'>Login</span>
                  </button>

                  <button onClick={registerLink} className="bg-gray-200 text-gray-500 rounded-md shadow-md h-10 w-full mt-3 hover:bg-black transition-colors">
                     Register
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Login;
