import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

export const registerApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/register`,reqBody)
}

export const loginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/login`, reqBody)
}

export const addFeedbackApi = async (reqBody, headers) => {
  return await commonApi('POST', `${serverUrl}/add-feedback`, reqBody, headers);
};