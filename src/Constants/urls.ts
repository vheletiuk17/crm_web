const baseURL = 'http://localhost:3003'

const auth = `/auth`;
const orders = `/orders`;
const comments = `/comments`
const filters = `/orders/filtered`


const urls = {
    auth: {
        login: `${auth}/sign-in`,
        createAdmin: `${auth}/sign-up`,
        logout: `${auth}/logout`,
        refresh: `${auth}/refresh`
    },
    orders: orders,
    comment: comments,
    filter: filters
}

export {baseURL, urls}

