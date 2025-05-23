import React, { useEffect, useState } from 'react'
import AdminMenu from '../../component/Layout/AdminMenu'
import Layout from '../../component/Layout/Layout'
import axios from 'axios';
import { useAuth } from '../../context/Auth';
import moment from 'moment';
import { Select } from 'antd';
const { Option } = Select;


const AdminOrders = () => {
    const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "Deliverd", "Cancel"]);
    const [changeStatus, setChangeStatus] = useState("");
    const [orders, setOrders] = useState();
    const [auth, setAuth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`);
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    const handleChange = async (value, orderId) => {
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`, { status: value });
            getOrders();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout title={"All Orders Data"} >
            <div className='container-fluid' style={{ marginTop: "7rem" }} >
                <div className="row">
                    <div className="col-md-3 px-5">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 px-5">
                        <h1 className="text-center">All Orders</h1>

                        {orders?.map((o, i) => {
                            return (
                                <div className="border shadow" key={i}>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col" >#</th>
                                                <th scope="col" >Status</th>
                                                <th scope="col" >Buyer</th>
                                                <th scope="col" >Date</th>
                                                <th scope="col" >Payment</th>
                                                <th scope="col" >Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>
                                                    <Select
                                                        bordered={false}
                                                        onChange={(value, orderId) => handleChange(value, o._id)}
                                                        defaultValue={o?.status}
                                                    >
                                                        {status?.map((s, i) => (
                                                            <Option key={i} value={s}>{s}</Option>
                                                        ))}

                                                    </Select>
                                                </td>
                                                <td>{o?.buyer?.name}</td>
                                                <td>{moment(o?.createAt).fromNow()}</td>
                                                <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                                <td>{o?.products?.length}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="container">
                                        {o?.products.map((p) => (
                                            <div className="row mb-2 p-3 card flex-row" key={p._id}>
                                                <div className="col-md-4">
                                                    <img src={p.photo} alt={p.name} width={"100px"} height={"100px"} />
                                                </div>
                                                <div className="col-md-8">
                                                    <p>{p.name}</p>
                                                    <p>{p.description.substring(0, 300)}</p>
                                                    <p>Price : Rs    {p.price}</p>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminOrders
