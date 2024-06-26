import axios, {AxiosError} from "axios";
import {loginService} from "./loginService";
import {baseURL, urls} from "../Constants/urls";

import {router} from "../router";

const apiService = axios.create({withCredentials: true, baseURL})
let isRefreshing = false // захист від повторного запуску refresh токенів
type IWaitList = () => void
const waitList: IWaitList[] = []


apiService.interceptors.request.use(req => {
    const access = loginService.getAccessToken();

    if (access) {
        req.headers.Authorization = `Bearer ${access}`
    }
    return req

})

apiService.interceptors.response.use(
    res => res,
    async (error: AxiosError) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    console.log('originalRequest', originalRequest);
                    await loginService.refresh();
                    isRefreshing = false;
                    runAfterRefresh();
                    if (originalRequest) {
                        return apiService(originalRequest); // Використовуємо originalRequest як аргумент
                    } else {
                        throw new Error('Original request missing');
                    }
                } catch (e) {
                    loginService.deleteTokens();
                    isRefreshing = false;
                    router.navigate('/sing-in?SessionExpired=true');
                    return Promise.reject(error);
                }
            }

            if (originalRequest && originalRequest.url === urls.auth.refresh) {
                return Promise.reject(error);
            }

            return new Promise(resolve => {
                subscribeToWaitList(() => {
                    if (originalRequest) {
                        resolve(apiService(originalRequest)); // Використовуємо originalRequest як аргумент
                    } else {
                        resolve(Promise.reject(error));
                    }
                });
            });
        }
        return Promise.reject(error);
    }
);


const subscribeToWaitList = (cb: IWaitList): void => {
    waitList.push(cb)
}

const runAfterRefresh = (): void => {
    while (waitList.length) {
        const cb = waitList.pop();
        if (cb) {
            cb()
        }
    }
}


export {apiService}