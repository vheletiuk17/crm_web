import {IOrder, IPageOrder} from "../Interface/orderInterface";
import {apiService} from "./apiService";
import {urls} from "../Constants/urls";
import {IRes} from "../Type/resType";
import {IComment} from "../Interface/commentInterface";


const orderService = {
    getAll:(page?:string,sortBy?:string):IRes<IPageOrder>=>apiService.get(urls.orders,{params:{page,sortBy}}),
    postComment:(comment:string):IRes<IComment> => apiService.post(urls.comment,{comment}),
    filter:(filterParams:string):IRes<IOrder> => apiService.get(urls.filter, {params:{filterParams}})

}

export {orderService}