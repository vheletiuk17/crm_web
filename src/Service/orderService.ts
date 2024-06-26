import {IPageOrder} from "../Interface/orderInterface";
import {apiService} from "./apiService";
import {urls} from "../Constants/urls";
import {IRes} from "../Type/resType";


const orderService = {
    getAll:(page?:string,sortBy?:string):IRes<IPageOrder>=>apiService.get(urls.orders,{params:{page,sortBy}}),

}

export {orderService}