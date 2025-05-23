import React, { useEffect, useState } from 'react'
import UserMenu from '../../component/Layout/UserMenu'
import Layout from '../../component/Layout/Layout'
import { useAuth } from '../../context/Auth';
import axios from 'axios';
import moment from 'moment';

const Orders = () => {
    const [orders, setOrders] = useState();
    const [auth, setAuth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`);
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token])
    return (
        <Layout title={"Your Orders"} >
            <div style={{ "marginTop": "5rem" }} >
                <div className="container-fluid m-3 p-3" >
                    <div className="row">
                        <div className="col-md-3">
                            <UserMenu />
                        </div>
                        <div className="col-md-9">
                            <h1 className='text-center' >Your Orders</h1>
                            {orders?.map((o, i) => {
                                return (
                                    <div className="border shadow">
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
                                                    <td>{o?.status}</td>
                                                    <td>{o?.buyer?.name}</td>
                                                    <td>{moment(o?.createAt).fromNow()}</td>
                                                    <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                                    <td>{o?.products?.length}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="container">
                                            {o?.products.map((p, i) => (
                                                <div className="row mb-2 p-3 card flex-row" key={p._id}>
                                                    <div className="col-md-4">
                                                        <img src={p.photo} alt={p.name} width={"100px"} height={"100px"} />
                                                    </div>
                                                    <div className="col-md-8">
                                                        <p>{p.name}</p>
                                                        <p>{p.description.substring(0, 30)}</p>
                                                        <p>Price : Rs {p.price}</p>
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
            </div>
        </Layout>
    )
}

export default Orders
