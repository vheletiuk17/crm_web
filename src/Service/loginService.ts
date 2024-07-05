
import axios from "axios";
import {apiService} from "./apiService";
import {baseURL, urls} from "../Constants/urls";
import {ITokens} from "../Interface/tokenInterface";
import {IAuth} from "../Interface/authInterface";

const accessTokenKey = 'accessToken'
const refreshTokenKey = 'refreshToken';

const loginService = {

    async login(user: IAuth): Promise<ITokens> {
        const {data} = await apiService.post(urls.auth.login, user)
        if (data.accessToken && data.refreshToken) {
            localStorage.setItem(accessTokenKey, data.accessToken);
            localStorage.setItem(refreshTokenKey, data.refreshToken);
            console.log( data.refreshToken);
            console.log( data.accessToken);

            return data.accessToken;
        }
    },

    refresh: async function (): Promise<void> {
        const {data} = await axios.post(`${baseURL}${urls.auth.refresh}`, {accessTokenKey}, {withCredentials: true})
        localStorage.setItem(accessTokenKey, data.accessToken)
        console.log(data.accessToken);
    },
    getAccessToken(): string | null {
        return  localStorage.getItem(accessTokenKey)

    },


    deleteTokens(): void {
        localStorage.removeItem(accessTokenKey)
        localStorage.removeItem(refreshTokenKey)
    }

}
export {loginService}