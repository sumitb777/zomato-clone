import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from './Header';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";



const Restaurantpage = (props) => {
    let { id } = useParams();
    let [rstoDetails, setrstoDetails] = useState(null);
    let [menuDetail, setmenuDetail] = useState([]);
    let [totalPrice, setTotalPrice] = useState(0);


    const getrestaurantDeatils = async () => {
        let url = `https://zomato-backend-u1he.onrender.com/api/getRestaurantsDetails-by-id/${id}`;
        let response = await fetch(url, { method: 'GET' })
        let data = await response.json();
        setrstoDetails(data.result);

    };
    const getMenu = async () => {
        let url = `https://zomato-backend-u1he.onrender.com/api/get-menu-Items-ByRestaurant-id/${id}`;
        let response = await fetch(url, { method: 'GET' })
        let data = await response.json();
        setmenuDetail(data.result);

    };
    let addQuntity = (index) => {
        setTotalPrice(menuDetail[index].price + totalPrice);
        menuDetail[index].qty += 1;

        setmenuDetail([...menuDetail])
    };
    let removeQuntity = (index) => {
        setTotalPrice(totalPrice - menuDetail[index].price);
        menuDetail[index].qty -= 1;

        setmenuDetail([...menuDetail])
    }

    let priceset = () => {
        setTotalPrice(0);
    };

    let makePayment = async () => {
        let url = `https://zomato-backend-u1he.onrender.com/api/get-order-id`;
        let { data } = await axios.post(url, { amount: totalPrice });
        let { order } = data;


        var options = {
            key: "rzp_test_RB0WElnRLezVJ5",
            amount: totalPrice * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Zomato Clone ",
            description: "Make Payment to get orders",
            image: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png",
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: async function (response) {

                try {
                    let userOrders = menuDetail.filter((menu) => menu.qty > 0);
                    let sendData = {
                        payment_id: response.razorpay_payment_id,
                        order_id: response.razorpay_order_id,
                        signature: response.razorpay_signature,
                        order: userOrders
                    };
                    let url = 'https://zomato-backend-u1he.onrender.com/api/confirmPayment'
                    let { data } = await axios.post(url, sendData)
                    if (data.status === true) {
                        alert("Payment done successfully, order saved");
                        window.location.assign("/");
                    } else {
                        alert("Payment fail");
                    }


                } catch (error) {
                    console.log(error)
                }


            },
            prefill: {
                name: "sumit bidwe",
                email: "sumitkumar@example.com",
                contact: "8111111111",
            },
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        rzp1.open();
    };
    console.log(props)
    useEffect(() => {
        getrestaurantDeatils();
    }, ([]))

    return (

        <>
            {rstoDetails !== null ? (


                <>

                    <div
                        className="modal fade"
                        id="slideShow3"
                        tabIndex="-1"
                        aria-labelledby="staticBackdropLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-lg h-100  " style={{ height: "75vh" }}>
                            <div className="modal-content Carousel">
                                <div className="modal-body h-100">
                                    <Carousel showThumbs={false} infiniteLoop={true}>
                                        {rstoDetails.thumb.map((value, index) => {
                                            return (
                                                <div key={index} className="w-100">
                                                    <img class='h-100 ' src={"/images/" + value} />
                                                </div>
                                            );
                                        })}
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* modal htmlFor menu */}
                    <div className="modal fade " id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel"
                        tabindex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalToggleLabel">Menu At {rstoDetails.name}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => priceset()
                                    }></button>
                                </div>

                                <div className="modal-body ">
                                    {menuDetail.map((value, index) => {
                                        return (

                                            <div className="d-flex justify-content-between mb-2  " key={value._id}>
                                                <div className=" m-0">
                                                    <p className=" h6 fw-bold  mb-0">{value.name}</p>
                                                    <p className="mb-1">Rs. {value.price}</p>
                                                    <p>{value.description}</p>
                                                </div>
                                                <div className="d-flex flex-column col-2  align-content-center justify-content-center">
                                                    <img className="h-75 w-100  align-content-end"
                                                        src={`/images/${value.image}`} alt="" />

                                                    {value.qty === 0 ? (
                                                        <button className="btn btn-sm bg-danger fw-bold ms-3 p-0 h-25 w-50 "
                                                            onClick={() => addQuntity(index)}>Add </button>

                                                    ) : (

                                                        <div className=" d-flex  justify-content-between ">
                                                            <span type="button" className="fw-bold  border border-2 px-2" onClick={() => removeQuntity(index)}>
                                                                -

                                                            </span>
                                                            <span>{value.qty}</span>
                                                            <span type="button" className="fw-bold border border-2 px-2" onClick={() => addQuntity(index)}>
                                                                +
                                                            </span>


                                                        </div>

                                                    )}

                                                </div>
                                            </div>

                                        )
                                    })}

                                    <hr className=" p-0 my-2" />



                                </div>
                                <div className="modal-footer d-flex justify-content-between ">
                                    <div>
                                        <h5>Total = {totalPrice}</h5>
                                    </div>
                                    <button className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">
                                        Process
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2"
                        tabindex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalToggleLabel2">Details</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <div className="mb-3">
                                            <label htmlFor="examplehtmlFormControlInput1" className="form-label">Name</label>
                                            <input type="email" className="form-control" id="examplehtmlFormControlInput1"
                                                placeholder="Enter Name" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="examplehtmlFormControlInput2" className="form-label">Email address</label>
                                            <input type="email" className="form-control" id="examplehtmlFormControlInput2"
                                                placeholder="name@example.com" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="examplehtmlFormControlTextarea1" className="form-label">Address</label>
                                            <textarea className="form-control"
                                                id="examplehtmlFormControlTextarea1" rows="3"></textarea>
                                        </div>


                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">
                                        Back
                                    </button>

                                    <button className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" onClick={() => {
                                        makePayment()
                                        window.location.assign('/')
                                    }}>Make order
                                    </button>


                                </div>
                            </div>
                        </div>
                    </div>



                    {/* modal htmlFor menu  End */}

                    <section className="row ">
                        <Header bgColor="bg-danger" user={props.user} />


                    </section>
                    <section className="col-md-10 col-11 mt-3 m-auto">
                        <section className="position-relative  ">
                            <img className="w-100 Restaurantpage-img h-50   "
                                src={"/images/" + rstoDetails.image} alt=""

                            />
                            <p className="btn  bottom-0   btn-outline-light position-absolute btnCarousel"
                                data-bs-toggle="modal"
                                data-bs-target="#slideShow3"
                            >
                                Click To Get Image Gallery</p>
                        </section>
                        <section className="my-4">
                            <p className="h1 fs-1  fw-bolder ">{rstoDetails.name}</p>

                        </section>
                        <section className="d-flex py-2  justify-content-between  ">
                            <p className="h3 fw-bold ">Overview</p>

                            {props.user ? (
                                <a className="btn btn-primary h3 fw-bold " data-bs-toggle="modal"
                                    href="#exampleModalToggle" onClick={getMenu} role="button">Menu</a>
                            )
                                : (
                                    <p className="btn btn-primary h3 fw-bold "
                                        href="/" onClick={() => {
                                            alert('Please login First')
                                        }} role="button">Menu</p>

                                )}
                            {/* <a className="btn btn-primary h3 fw-bold " data-bs-toggle="modal"
                                href="#exampleModalToggle" onClick={getMenu} role="button">Menu</a> */}

                        </section>
                        <hr />
                        <section>
                            <div className=" d-flex gap-5  me-5  ">
                                <div>
                                    <p className="h4 fw-bold">About</p>
                                    <div>
                                        <p className="mb-2  fw-bold">Cusine</p>
                                        <p>{rstoDetails.cuisine.map((value) => {
                                            return value.name
                                        }).join(', ')} </p>
                                    </div>
                                    <div className=" ">
                                        <p className="mb-2  fw-bold">Average Cost :</p>
                                        <p>₹ {rstoDetails.min_price} /- For Two People (approx.) </p>
                                    </div>
                                </div>
                                <div className="ms-5">
                                    <p className="h4  fw-bold ">Contact</p>
                                    <p className="">{rstoDetails.contact_number}</p>

                                </div>

                            </div>
                        </section>
                    </section>
                    <div className="m-5 pt-4 col-10 m-auto text-center ">
                        <p className="fs-4 mt-4">e!</p>
                        <p className="fs-4 ">Zomato Clone @</p>
                        <p className="fs-5 ">@Sumit</p>
                    </div>



                </>
            ) : null
            }
        </>
    )
}


export default Restaurantpage;