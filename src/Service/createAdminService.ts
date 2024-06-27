import {IAuth} from "../Interface/authInterface";
import {ITokens} from "../Interface/tokenInterface";
import {apiService} from "./apiService";
import {baseURL, urls} from "../Constants/urls";
import axios from "axios";

const accessTokenKey = 'accessToken'

const createAdminService = {
    async create(user: IAuth): Promise<ITokens> {
        const {data} = await apiService.post(urls.auth.createAdmin, user)
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

export{
    createAdminService
}