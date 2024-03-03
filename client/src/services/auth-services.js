import { setIsLoggedIn, setUser } from "@/store/reducers/authSlice";
import axios from "axios";

export const handleLogin = async (e,userInfo, dispatch, navigate) => {
    e.preventDefault()
    try {
        const response = await axios.post("/api/login", userInfo);
        if (response) {
            dispatch(setUser({ email: "", password: "" }))
            dispatch(setIsLoggedIn(true));
            navigate("/");
            console.log("Login Success")
        }
    } catch (error) {
        console.log("Error in login", error);
    }
}

export const handleSignUp = async (e, userInfo, dispatch, navigate) => {
    e.preventDefault();
    try {
        const response = await axios.post("/api/register", userInfo);
        if (response) {
            dispatch(setUser({ fn: "", phn: "", email: "", password: "" }));
            dispatch(setIsLoggedIn(true));
            navigate("/");
            console.log("Register Success")
        }
    } catch (error) {
        console.log("Error in register", error);
    }
};
