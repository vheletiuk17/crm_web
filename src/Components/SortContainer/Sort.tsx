import React, { useEffect, useState} from 'react';
import axios from 'axios'; // Імпортуємо Axios для виконання HTTP-запитів
import css from './sort.module.css';
import {loginService} from "../../Service/loginService";
import {useAppDispatch} from "../../Hook/reduxHooks";
import {orderActions} from "../../Redux/Slice/orderSlice";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;




const Sort = ({filterOrders}: { filterOrders: (criteria: any) => void }) => {
    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [age, setAge] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [format, setFormat] = useState('format');
    const [type, setType] = useState('All type');
    const [status, setStatus] = useState('All status');
    const [group, setGroup] = useState('All group');
    const [course, setCourse] = useState('All courses');
    const [fe, setFe] = useState( null)


    // const handleReset = () => {
    //     setName('');
    //     setSurname('');
    //     setEmail('');
    //     setPhone('');
    //     setAge('');
    //     setStartDate('');
    //     setFormat('format');
    //     setType('All type');
    //     setStatus('All status');
    //     setGroup('All group');
    //     setCourse('All courses');
    //     setEndDate('');
    //     setSearchResults([]); // Очистка результатів пошуку при скиданні
    // };
    // };
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const accessToken = loginService.getAccessToken();
            console.log(accessToken);
            if (!accessToken) {
                try {
                    await loginService.refresh();
                } catch (error) {
                    console.error('Failed to refresh token:', error);
                    return;
                }
            }

            axios.get('http://localhost:3003/orders/filtered', {
                params: {
                    name,
                    surname,
                    email,
                    phone,
                    age,
                },
                headers: {
                    Authorization: `Bearer ${loginService.getAccessToken()}`
                }
            })
                .then(response => {
                    dispatch(orderActions.setOrders(response.data));
                    console.log( response.data); // Logging the fetched data
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });

        };

        fetchData();
    }, [dispatch, name, surname, email, phone, age]);


    return (
        <div className={css.sort_container}>
            <div className={css.sort_btn_container}>
                <input className={css.btn} type="text" placeholder="name" value={name !== null ? name : ''} onChange={(e) => setName(e.target.value)} />
                <input className={css.btn} type="text" placeholder="surname"   value={surname !== null ? surname : ''} onChange={(e) =>setSurname(e.target.value) } />
                <input className={css.btn} type="email" placeholder="email" value={email !== null ? email : ''} onChange={(e) =>setEmail(e.target.value)} />
                <input className={css.btn} type="tel" placeholder="phone" value={phone !== null ? phone : ''} onChange={(e) => setPhone(e.target.value)} />
                <input className={css.btn} type="number" placeholder="age" value={age !== null ? age : ''} onChange={(e) => setAge(e.target.value)} />
                <input className={css.btn} type="text" placeholder="Start date" value={startDate !== null ? startDate : ''} onChange={(e) => setStartDate(e.target.value)} />

                <select className={css.btn_select} value={format} onChange={(e) => setFormat(e.target.value)}>
                    <option value="format">All Format</option>
                    <option value='statics'>static</option>
                    <option value='o'>online</option>
                </select>

                <select className={css.btn_select} value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="All type">All type</option>
                    <option value="incubator">incubator</option>
                    <option value="vip">vip</option>
                    <option value="pro">pro</option>
                    <option value="minimal">minimal</option>
                </select>

                <select className={css.btn_select} value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">All status</option>
                    <option value="2">2</option>
                </select>

                <select className={css.btn_select} value={group} onChange={(e) => setGroup(e.target.value)}>
                    <option value="">All group</option>
                </select>

                <select className={css.btn_select} value={course} onChange={(e) => setCourse(e.target.value)}>
                    <option value="All courses">All courses</option>
                    <option value={fe}>FE</option>
                    <option value="FS">FS</option>
                    <option value="JSX">JSX</option>
                    <option value="QACX">QACX</option>
                    <option value="JSCX">JSCX</option>
                </select>

            </div>
            <div className={css.btn_menu}>
                <button className={css.reset_btn} >Reset</button>
                <button className={css.search_btn} >Search</button>
            </div>
        </div>
    );
};

export { Sort };
