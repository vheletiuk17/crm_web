import {FC, PropsWithChildren, useState} from "react";
import css from './order.module.css'
import {IOrder} from "../../../Interface/orderInterface";
import {OrderMoreDetails} from "../OrderMoreDetails/OrderMoreDetailes";

interface IProps extends PropsWithChildren {
    order: IOrder
}

const Order: FC<IProps> = ({order}) => {
    // @ts-ignore
    const [selectedRow, setSelectedRow] = useState<number>(null)

    const {id, name, surname, email, phone, age, course, course_format, course_type, sum, alreadyPaid, created_at, status, group, manager} = order

    // @ts-ignore
    const [details, setDetails] = useState<number>(null)

    function handleDetail(id: number) {
        if (details === id) {
            // @ts-ignore
            setDetails(null);
        } else {
            setDetails(id);
        }
        // @ts-ignore
        setSelectedRow(selectedRow === id ? null : id);
    }

    return (
        <tbody className={css.table_container}>
        <tr className={`${css.tablerow} ${selectedRow === id ? css.selected : ''}`}
            key={id} onClick={() => handleDetail(id)}>
            <td>{id ? <b>{id}</b> : <b>null</b>}</td>
            <td>{name ? <b>{name}</b> : <b>null</b>}</td>
            <td>{surname ? <b>{surname}</b> : <b>null</b>}</td>
            <td>{email ? <b>{email}</b> : <b>null</b>}</td>
            <td>{phone ? <b>{phone}</b> : <b>null</b>}</td>
            <td>{age ? <b>{age}</b> : <b>null</b>}</td>
            <td>{course ? <b>{course}</b> : <b>null</b>}</td>
            <td>{course_format ? <b>{course_format}</b> : <b>null</b>}</td>
            <td>{course_type ? <b>{course_type}</b> : <b>null</b>}</td>
            <td>{sum ? <b>{sum}</b> : <b>null</b>}</td>
            <td>{alreadyPaid ? <b>{alreadyPaid}</b> : <b>null</b>}</td>
            <td>{created_at ? <b></b> : <b>null</b>}</td>
            <td>{status ? <b>{status}</b> : <b>null</b>}</td>
            <td>{group ? <b>{group}</b> : <b>null</b>}</td>
            <td>{manager ? <b>{manager}</b> : <b>null</b>}</td>
        </tr>
        {details && <OrderMoreDetails details={details}/>}
        </tbody>
    );
};

export {Order};