import axios from "axios"
export const getMenuList = async () => {
    try {
        const response = await axios.get('/api/getRandomFood')
        if (response) {
            return response.data
        }
    } catch (error) {
        console.log("Error in menu services", error)
    }
}