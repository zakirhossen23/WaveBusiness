import Cookies from 'js-cookie'
import logoicon from '../assets/wave-data-logo.svg'
import { useNavigate } from "react-router-dom";
function Register() {
    let navigate = useNavigate();

    window.onload = (e) => {
        if (Cookies.get("login") == "true") {
            navigate("/courses",{replace:true});
            window.location.href = "/courses";
        }
    };
    function loginLink() {
        navigate("/login",{replace:true});
    }
    async function RegisterAcc(event) {

        event.preventDefault();

        var registerbutton = document.getElementById("registerBTN");
        var buttonTextBox = document.getElementById("buttonText");
        var LoadingICON = document.getElementById("LoadingICON");
        var SuccessNotification = document.getElementById("notification-success")
        var FailedNotification = document.getElementById("notification-error")
        buttonTextBox.style.display = "none";
        LoadingICON.style.display = "block";
        SuccessNotification.style.display = "none";
        FailedNotification.style.display = "none";
        registerbutton.disabled = true;
        var FullNameTXT = document.getElementById("name")
        var emailTXT = document.getElementById("email")
        var passwordTXT = document.getElementById("password")
        if (FullNameTXT.value == "" || emailTXT.value == "" || passwordTXT.value == "") {
            FailedNotification.style.display = "block";
            buttonTextBox.style.display = "block";
            LoadingICON.style.display = "none";
            return;
        }

        try {
            await fetch(`https://cors-anyhere.herokuapp.com/https://test.i.tgcloud.io:14240/restpp/query/WaveData/checkemail?emailTXT=${encodeURIComponent(emailTXT.value)}`, {
                "headers": {
                    "accept-language": "en-US,en;q=0.9",
                    "Authorization": "Bearer n63cf58df61rvnp6dgeq4a4rolokeoe8",
                },
                "body": null,
                "method": "GET"
            }).then(e => {
                return e.json();
            }).then(async (e) => {
                if (e.results[1]['(SV.size())'] == 0) {
                    await fetch(`https://cors-anyhere.herokuapp.com/https://test.i.tgcloud.io:14240/restpp/query/WaveData/CreateAccount?FullNameTXT=${encodeURIComponent(FullNameTXT.value)}&emailTXT=${encodeURIComponent(emailTXT.value)}&passwordTXT=${encodeURIComponent(passwordTXT.value)}`, {
                        "headers": {
                            "accept-language": "en-US,en;q=0.9",
                            "Authorization": "Bearer n63cf58df61rvnp6dgeq4a4rolokeoe8",
                        },
                        "body": null,
                        "method": "GET"
                    }).then(e => {
                        SuccessNotification.style.display = "block";
                        window.location.href = "/login"
                    }).catch((error) => {
                        buttonTextBox.style.display = "block";
                        FailedNotification.style.display = "none";
                    });
                } else { //Error
                    LoadingICON.style.display = "none";
                    buttonTextBox.style.display = "block";
                    FailedNotification.innerText = "Email already registered!"
                    FailedNotification.style.display = "block";
                    registerbutton.disabled = false;
                    return;
                }
            })


        } catch (error) {
            LoadingICON.style.display = "none";
            buttonTextBox.style.display = "block";
            FailedNotification.style.display = "none";
            FailedNotification.innerText = "Error! Please try again!"
        }

        registerbutton.disabled = false;
    }
    return (
        <div className="h-screen grid-cols-2 flex">
            <div className="bg-blue-200 h-full max-h-full overflow-hidden w-1/2">
            <img src={require('../assets/login-picture.png')} className="h-full" style={{
               maxWidth: 'max-content',
               width: 'fit-content'
            }} alt="WaveData Logo" />
         </div>
            <div className="bg-white flex-1 flex flex-col justify-center items-center">
                <div className="pl-20 pr-20">
                    <img src={logoicon} className="w-3/4 mx-auto" alt="WaveData Logo" />
                    <h1 className="text-4xl font-semibold mt-10">Register your account</h1>
                    <div id='notification-success' style={{ display: 'none' }} className="mt-4 text-center bg-gray-200 relative text-gray-500 py-3 px-3 rounded-lg">
                        Success!
                    </div>
                    <div id='notification-error' style={{ display: 'none' }} className="mt-4 text-center bg-red-200 relative text-red-600 py-3 px-3 rounded-lg">
                        Error! Please try again!
                    </div>
                    <div className="mt-10">
                        <label className="flex flex-col font-semibold">
                            Full name
                            <input type="name" required id="name" name="name" className="mt-2 h-10 border border-gray-200 rounded-md outline-none px-2 focus:border-gray-400" />
                        </label>
                        <label className="flex flex-col font-semibold">
                            Email
                            <input type="email" required id="email" name="email" className="mt-2 h-10 border border-gray-200 rounded-md outline-none px-2 focus:border-gray-400" />
                        </label>
                        <label className="flex flex-col font-semibold mt-3">
                            Password
                            <input type="password" required id="password" name="password" className="mt-2 h-10 border border-gray-200 rounded-md outline-none px-2 focus:border-gray-400" />
                        </label>
                        <label className="flex flex-col font-semibold mt-3">
                            Repeat password
                            <input type='password' name="confirm-password" required className="mt-2 h-10 border border-gray-200 rounded-md outline-none px-2 focus:border-gray-400" />
                        </label>
                        <button id='registerBTN' onClick={RegisterAcc} className="bg-orange-500 text-white rounded-md shadow-md h-10 w-full mt-3 hover:bg-orange-600 transition-colors overflow:hidden flex content-center items-center justify-center cursor-pointer">
                            <i id='LoadingICON' style={{ display: "none" }} className="select-none block w-12 m-0 fa fa-circle-o-notch fa-spin"></i>
                            <span id='buttonText'>Register</span>
                        </button>

                        <button onClick={loginLink} className="bg-gray-200 text-gray-500 rounded-md shadow-md h-10 w-full mt-3 hover:bg-black hover:text-white transition-colors">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
