import axios from "axios"

const getProfile=async (object)=>{
    const response =await  axios.post("/userSignin",{"userEmail":object.userEmail,"userPassword":object.userPassword});
    return response
}
export default getProfile