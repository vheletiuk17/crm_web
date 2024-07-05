import { IOrder, IPageOrder } from "../Interface/orderInterface";
import { apiService } from "./apiService";
import { urls } from "../Constants/urls";
import { IRes } from "../Type/resType";
import { IComment } from "../Interface/commentInterface";
import { loginService } from "./loginService";

const orderService = {
    getAll: (page?: string, sortBy?: string): IRes<IPageOrder> => {
        const accessToken = loginService.getAccessToken();
        console.log('Access token:', accessToken);
        return apiService.get(urls.orders, {
            params: { page, sortBy },
            headers: { Authorization: `Bearer ${accessToken}` },
        })
            .catch(error => {
                console.error('Error fetching orders:', error);
                throw error;
            });
    },

    postComment: (comment: string): IRes<IComment> => apiService.post(urls.comment, { comment }),

    filter: (filterParams: string): IRes<IOrder> => apiService.get(urls.filter, { params: { filterParams } })
};

export { orderService };
