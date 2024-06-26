
import axios from "axios";
import {apiService} from "./apiService";
import {baseURL, urls} from "../Constants/urls";
import {ITokens} from "../Interface/tokenInterface";
import {IAuth} from "../Interface/authInterface";

const accessTokenKey = 'accessToken'

const loginService = {

    async login(user: IAuth): Promise<ITokens> {
        const {data} = await apiService.post(urls.auth.login, user)
        localStorage.setItem(accessTokenKey, data.accessToken)
        return data
    },

    refresh: async function (): Promise<void> {
        const data = await axios.post(`${baseURL}${urls.auth.refresh}`, {}, {withCredentials: true})
        localStorage.setItem(accessTokenKey, data.data.accessToken)
    },

    getAccessToken(): string | null {
        return localStorage.getItem(accessTokenKey)
    },

    deleteTokens(): void {
        localStorage.removeItem(accessTokenKey)
    }

}
export {loginService}