export interface IOrder{
    id: number,
    name: string,
    surname: string,
    email: string,
    phone: string,
    age: number,
    course: string,
    course_format: string,
    course_type: string,
    sum: number,
    alreadyPaid: number,
    created_at: Date,
    status: string,
    group: string
    manager: string
}

export interface IPageOrder{
    filter: string;
    data: IOrder[],
    meta: {
        page: number,
        total: number
    }
}

