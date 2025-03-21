// import { setIsLoggedIn, setUser } from "@/store/reducers/authSlice";
// import axios from "axios";

// export const handleLogin = async (userInfo, dispatch, navigate, setError) => {
//     try {
//         const response = await axios.post("/api/login", userInfo);
//         if (response) {
//             dispatch(setUser({ email: "", password: "" }))
//             dispatch(setIsLoggedIn(true));
//             navigate("/");
//             console.log("Login Success")
//         }
//     } catch (error) {
//         setError('root', { message: error.response.data.msg })
//     }
// }

// export const handleSignUp = async (userInfo, dispatch, navigate, setError) => {
//     try {
//         const response = await axios.post("/api/register", userInfo);
//         if (response) {
//             dispatch(setUser({
//                 fullName: "",
//                 phoneNumber: "",
//                 email: "",
//                 password: "",
//             }));
//             dispatch(setIsLoggedIn(true));
//             navigate("/");
//             console.log("Register Success")
//         }
//     } catch (error) {
//         setError('root', { message: error.response.data.msg })
//     }
// };


import { setIsLoggedIn, setUser } from "@/store/reducers/authSlice";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const handleLogin = async (userInfo, dispatch, navigate, setError) => {
    try {
        const response = await axios.post("/api/login", userInfo);
        if (response) {
            const data = response.data.user;
            console.log("Coming from handle Login: ",data)
            dispatch(setUser({ fullName: data.name, email: data.email, id: data.id }))
            dispatch(setIsLoggedIn(true));
            navigate("/");
            toast.success("Login Success");
            console.log("Login Success");
        }
    } catch (error) {
        if (error.response.status === 400 || error.response.data.error === "Password doesn't match") {
            toast.error("Password doesn't match");
        }
        setError('root', { message: error.response.data.msg });
    }
}

export const handleSignUp = async (userInfo, dispatch, navigate, setError) => {
    try {
        console.log(userInfo)
        const response = await axios.post("/api/register", userInfo);
        if (response) {
            dispatch(setUser({
                fullName: response.data.name,
                email: response.data.email
            }));
            dispatch(setIsLoggedIn(true));
            navigate("/");
            toast.success("Successfully Registered");
            console.log("Register Success");
        }
    } catch (error) {
        if (error.response.status === 400 || error.response.data.error === "Passwords don't match") {
            toast.error("Passwords don't match");
        }
        setError('root', { message: error.response.data.msg });

    }
};