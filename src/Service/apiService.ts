import axios, {AxiosError} from "axios";

import {router} from "../router";
import {baseURL, urls} from "../Constants/urls";
import {loginService} from "./loginService";
import {log} from "node:util";

const apiService = axios.create({withCredentials: true, baseURL})
let isRefreshing = false // захист від повторного запуску refresh токенів
type IWaitList = () => void
const waitList: IWaitList[] = []


apiService.interceptors.request.use(req => {
    const access = loginService.getAccessToken();
    console.log(access);
    if (access) {
        req.headers.Authorization = `Bearer ${access}`
    }
    return req

})

apiService.interceptors.response.use(
    res => {
        console.log(res)
        return res
    },
    async (error: AxiosError) => {
        const originalRequest = error.config;
        if (error.response.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true
                try {
                    await loginService.refresh()
                    isRefreshing = false
                    runAfterRefresh()
                    return apiService(originalRequest)
                } catch (e) {
                    loginService.deleteTokens() // видаляє токен якщо виникла помилка рефреш не пройшов
                    isRefreshing = false
                    router.navigate('/login')
                    return Promise.reject(error)
                }
            }

            if (originalRequest.url === urls.auth.refresh) {
                return Promise.reject(error)
            }

            return new Promise(resolve => {
                subscribeToWaitList(() => {
                    resolve(apiService(originalRequest))
                })
            })
        }
        return Promise.reject(error)
    }
)

const subscribeToWaitList = (cb: IWaitList): void => {
    waitList.push(cb)
}

const runAfterRefresh = (): void => {
    while (waitList.length) {
        const cb = waitList.pop();
        cb()
    }
}


export {apiService}