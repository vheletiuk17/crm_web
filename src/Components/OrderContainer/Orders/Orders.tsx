import {ChangeEvent, FC, PropsWithChildren, useEffect, useState} from "react";

import {useSearchParams} from "react-router-dom";
import { Pagination, Stack} from "@mui/material";
import {Order} from "../Order/Order";
import css from './orders.module.css'
import {useAppDispatch, useAppSelector} from "../../../Hook/reduxHooks";
import {orderActions} from "../../../Redux/Slice/orderSlice";
import {Sort} from "../../SortContainer/Sort";


interface IProps extends PropsWithChildren {

}

const Orders: FC<IProps> = () => {
    const {orders:allOrders} = useAppSelector(state => state.order)
    const dispatch = useAppDispatch()
    const [query, setQuery] = useSearchParams({page: '1', sort: '-id'});
    const page = query.get('page');
    const sort = query.get('sort');
    const [, setOrders] = useState([]);

    function handleSortClick(key: string) {
        const currentSort = query.get('sort');
        if (currentSort === key) {
            setQuery({sort: `-${key}`, page: page || '1'});
        } else {
            setQuery({sort: key, page: page || '1'});
        }
    }

    function handleChange(event: ChangeEvent<unknown>, value: number) {
        setQuery({sort: sort || '-id', page: value.toString()});
    }

    useEffect(() => {
        dispatch(orderActions.getAll({page: page, sortBy: sort}))
    }, [dispatch, page, sort]);

    const getSortIcon = (key: string) => {
        const currentSort = query.get('sort');
        if (currentSort === key) return ' 🠟';
        if (currentSort === `-${key}`) return ' 🠝';
        return '';
    };

    const filterOrders = (criteria: any) => {
        const filtered = allOrders.data.filter((order: any) => {
            // Perform filtering logic based on criteria
            return (criteria.surname && order.surname.toLowerCase().includes(criteria.surname.toLowerCase())) ||
                (criteria.email && order.email.toLowerCase().includes(criteria.email.toLowerCase())) ||
                (criteria.phone && order.phone.toLowerCase().includes(criteria.phone.toLowerCase())) ||
                (criteria.age && order.age === parseInt(criteria.age));

        });
        setOrders(filtered); // Зберегти відфільтровані замовлення у стані
    };
    return (
        <>
            <Sort filterOrders={filterOrders}/>
            <table className={css.table_container}>
                <thead className={css.header_table_name}>
                <tr>
                    <th className={css.id}><span onClick={() => handleSortClick("id")}>Id{getSortIcon("id")}</span></th>
                    <th className={css.name}><span
                        onClick={() => handleSortClick("name")}>Name{getSortIcon("name")}</span></th>
                    <th className={css.surname}><span
                        onClick={() => handleSortClick("surname")}>Surname{getSortIcon("surname")}</span></th>
                    <th className={css.email}><span
                        onClick={() => handleSortClick("email")}>Email{getSortIcon("email")}</span></th>
                    <th className={css.phone}><span
                        onClick={() => handleSortClick("phone")}>Phone{getSortIcon("phone")}</span></th>
                    <th className={css.age}><span onClick={() => handleSortClick("age")}>Age{getSortIcon("age")}</span>
                    </th>
                    <th className={css.course}><span
                        onClick={() => handleSortClick("course")}>Course{getSortIcon("course")}</span></th>
                    <th className={css.course_format}><span
                        onClick={() => handleSortClick("course_format")}>Course format{getSortIcon("course_format")}</span>
                    </th>
                    <th className={css.course_type}><span
                        onClick={() => handleSortClick("course_type")}>Course type{getSortIcon("course_type")}</span>
                    </th>
                    <th className={css.sumsum}><span
                        onClick={() => handleSortClick("sum")}>Sum{getSortIcon("sum")}</span></th>
                    <th className={css.alreadyPaid}><span
                        onClick={() => handleSortClick("alreadyPaid")}>Already Paid{getSortIcon("alreadyPaid")}</span>
                    </th>
                    <th className={css.created_at}><span
                        onClick={() => handleSortClick("created_at")}>Created At{getSortIcon("created_at")}</span>
                    </th>
                    <th className={css.status}><span
                        onClick={() => handleSortClick("status")}>Status{getSortIcon("status")}</span></th>
                    <th className={css.group}><span
                        onClick={() => handleSortClick("group")}>Group{getSortIcon("group")}</span></th>
                    <th className={css.manager}><span
                        onClick={() => handleSortClick("manager")}>Manager{getSortIcon("manager")}</span></th>
                </tr>
                </thead>
                <tbody>
                </tbody>

                {allOrders.data.map((item) => (<Order key={item.id} order={item}/>))}
            </table>
            <div className={css.btn_page}>
                <Stack spacing={2}>
                    <Pagination
                        count={allOrders.meta.total}
                        page={allOrders.meta.page}
                        onChange={handleChange}
                        size="medium"
                        sx={{
                            '& .MuiPaginationItem-root': {
                                width: '50px',
                                borderRadius: '20px',
                                backgroundColor: 'white',
                                '&:hover': {
                                    boxShadow: '0 4px 8px rgba(144, 238, 144, 0.5)',
                                    backgroundColor: '#ffffff',
                                },
                                '&.Mui-selected': {
                                    backgroundColor: 'lightgreen',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#8d8888',
                                    },
                                },
                            },
                        }}
                    />
                </Stack>
            </div>

        </>
    );
};

export {Orders};