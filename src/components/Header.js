
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


const Header = (props) => {
    let Navigate = useNavigate();
    console.log(props)
    // let [username, setusername] = useState('');

    // let localdat = localStorage.getItem('token')
    // let islogin = localdat !== null

    let [newUser, setNewUser] = useState({
        name: "",
        mobile: "",
        email: "",
        address: "",
        password: "",
    });
    let [login, setLogin] = useState({
        email: "",
        password: "",
    });
    const saveUser = async () => {
        try {
            let url = `http://localhost:3030/api/create-user`;
            let { data } = await axios.post(url, { ...newUser });
            // alert(data.massage);
            console.log(data.massage);
            if (data.status === true) {
                window.location.assign('/');
            }

        } catch (error) {
            console.log(error)
        }

    }
    let userLogin = async () => {
        try {
            let url = `http://localhost:3030/api/login`;
            let { data } = await axios.post(url, { ...login });
            // alert(data.massage);

            console.log(data);
            if (data.status === true) {
                // setusername(data.username);

                localStorage.setItem('token', JSON.stringify(data.token))
                window.location.assign("/");
            }

        } catch (error) {
            alert("server error");
        }
    };

    const logoutuser = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.assign("/");
    }



    return (
        <section className={`col-12 m-0 py-2
        
        ${props.bgColor}`} >

            {/* <!-- Button trigger modal --> */}


            {/* <!-- Modal --> */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Login</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="mb-3">
                                <label htmlFor="loginEmail" className="form-label">
                                    Email Id
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="loginEmail"
                                    placeholder="Enter Email"
                                    value={login.email}
                                    onChange={(event) => {
                                        setLogin({ ...login, email: event.target.value });
                                    }}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="login-password" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="login-password"
                                    placeholder="Enter password"
                                    value={login.password}
                                    onChange={(event) => {
                                        setLogin({ ...login, password: event.target.value });
                                    }}
                                />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary"
                                onClick={userLogin}>Login</button>
                        </div>
                    </div>
                </div>
            </div>



            {/* <!-- Button trigger modal --> */}

            {/* <!-- Modal --> */}
            <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel2">Create Account</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="mb-3">
                                <label
                                    htmlFor="exampleFormControlInput1"
                                    className="form-label"
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    placeholder="Enter full Name"
                                    value={newUser.name}
                                    onChange={(event) => {
                                        setNewUser({ ...newUser, name: event.target.value });
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mobile" className="form-label">
                                    Mobile
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="mobile"
                                    placeholder="Enter Mobile"
                                    value={newUser.mobile}
                                    onChange={(event) => {
                                        setNewUser({ ...newUser, mobile: event.target.value });
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="exampleFormControlInput1"
                                    className="form-label"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    placeholder="name@example.com"
                                    value={newUser.email}
                                    onChange={(event) => {
                                        setNewUser({ ...newUser, email: event.target.value });
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="exampleFormControlTextarea1"
                                    className="form-label"
                                >
                                    Address
                                </label>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    value={newUser.address}
                                    onChange={(event) => {
                                        setNewUser({ ...newUser, address: event.target.value });
                                    }}
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter password"
                                    value={newUser.password}
                                    onChange={(event) => {
                                        setNewUser({ ...newUser, password: event.target.value });
                                    }}
                                />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary"
                                onClick={saveUser} >Create Account</button>
                        </div>
                    </div>
                </div>
            </div>

            <section className="col-10 m-auto d-flex justify-content-between">
                <section className=" bg-white rounded-circle logo-h d-flex justify-content-center align-items-center "
                    onClick={() => Navigate('/')}>
                    {props.logo === false ? <p></p> : <p className=" text-danger px-3 pt-2 h3 fw-bold  ">e!</p>}
                </section>
                {props.home === false ? <></> : <button className={`login fs-5  btn d-none d-sm-block text-white`}
                    onClick={() => Navigate('/')}>Home </button>}
                {/* <button className={`login btn d-none d-sm-block text-white`} onClick={() => Navigate('/')}>Home </button> */}
                <section className=" d-flex gap-2 ">

                    {props.user ? (
                        <>
                            <p className=" fs-4 fw-medium  mt-3 text-white "> welcome {props.user.name}</p>
                            <button className="login btn text-white fs-5" onClick={logoutuser} >Logout</button>

                        </>
                    ) :

                        (
                            <> <button className="login btn text-white fs-5" data-bs-toggle="modal" data-bs-target="#exampleModal">Login</button>
                                <button className="sign btn text-white border fs-5  " data-bs-toggle="modal" data-bs-target="#exampleModal2" >Create an account</button>
                            </>

                        )
                    }
                    {/* // <button className="login btn text-white" data-bs-toggle="modal" data-bs-target="#exampleModal">Login</button> */}
                    {/* // <button className="sign btn text-white border " data-bs-toggle="modal" data-bs-target="#exampleModal2" >Create an account</button> */}
                </section>
            </section>
        </section >
    )
}

export default Header; 