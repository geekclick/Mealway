import { setIsLoggedIn, setUser } from "@/store/reducers/authSlice";
import axios from "axios";

export const handleLogin = async (userInfo, dispatch, navigate, setError) => {
    try {
        const response = await axios.post("/api/login", userInfo);
        if (response) {
            dispatch(setUser({ email: "", password: "" }))
            dispatch(setIsLoggedIn(true));
            navigate("/");
            console.log("Login Success")
        }
    } catch (error) {
        setError('root', { message: error.response.data.msg })
    }
}

export const handleSignUp = async (userInfo, dispatch, navigate, setError) => {
    try {
        const response = await axios.post("/api/register", userInfo);
        if (response) {
            dispatch(setUser({
                fullName: "",
                phoneNumber: "",
                email: "",
                password: "",
            }));
            dispatch(setIsLoggedIn(true));
            navigate("/");
            console.log("Register Success")
        }
    } catch (error) {
        setError('root', { message: error.response.data.msg })
    }
};
