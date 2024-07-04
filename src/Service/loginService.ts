
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
        localStorage.setItem(accessTokenKey, data.accessToken)
        localStorage.setItem(refreshTokenKey, data.refreshToken); // зберігаємо refreshToken
        return data
    },

    async refresh(): Promise<void> {
        const refreshToken = localStorage.getItem(refreshTokenKey);

        try {
            const { data } = await axios.post(
                `${baseURL}${urls.auth.refresh}`,
                { refreshToken },
                { withCredentials: true }
            );

            localStorage.setItem(accessTokenKey, data.accessToken);
        } catch (error) {
            console.error('Failed to refresh access token:', error);
        }
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