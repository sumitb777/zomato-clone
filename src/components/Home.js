import { useEffect, useState } from "react";
import Header from './Header';
import { useNavigate } from "react-router-dom";


const Home = (props) => {

    let [mealTypes, setMealTypes] = useState([]);
    let [placeHolderText, setPlaceHolderText] = useState("Get a location");
    let [locations, setlocation] = useState([])
    let [restaurant, setRestarant] = useState([]);
    let Navigate = useNavigate();

    const getmealtype = async () => {

        try {
            let url = `https://zomato-backend-u1he.onrender.com/api/get-meal-type`
            let response = await fetch(url, { method: 'GET' },);
            let data = await response.json()
            setMealTypes(data.result)
            console.log(mealTypes)
        } catch (error) {
            alert("server error")
        }
    }
    const getlocationlist = async () => {
        setPlaceHolderText('Getting Locations')
        try {
            setRestarant([])
            setPlaceHolderText('Choose Locations')
            let url = `https://zomato-backend-u1he.onrender.com/api/get-location-list`;
            let response = await fetch(url, { method: 'GET' },);
            let data = await response.json()
            setlocation(data.result)
            console.log(data)
        } catch (error) {
            setPlaceHolderText("Fail get location, try again");
        }
    }
    const restarurantByLocationid = async (id, name, city) => {
        try {
            let url = `https://zomato-backend-u1he.onrender.com/api/get-Restaurants-locationid/${id}`;
            let response = await fetch(url, { method: 'GET' },);
            let data = await response.json()
            if (data.result.length === 0) {
                alert("No Restarurant availble in this location")
            }
            setlocation([])
            setRestarant(data.result)
            setPlaceHolderText(`${name}, ${city}`);
            console.log(data)
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getmealtype();
        console.log(mealTypes)
    }, []);

    return (
        <>
            <section>

            </section>

            <section className="row ">
                <section className="col-12 main ">

                    <Header logo={false} home={false} user={props.user} />
                    {/* <!--                                             Header                           --> */}
                    {/* <header>
                        <div className=" align-items-center gap-2 
                         d-flex justify-content-end   mt-lg-4   mb-5 ">
                            <button className="btn text-white fs-6 ">Login</button>
                            <button className="btn text-white border-white  fs-6 fw-bold ">Create An Account</button>
                        </div>
                    </header> */}
                    {/* <!--                                              Header End Here                  --> */}
                    {/* <!--                                              Main Section Starts                --> */}
                    <section className="main2 d-flex flex-column gap-3 my-5 align-items-center ">

                        <div className="logo d-flex  justify-content-center  mt-5  bg-light rounded-circle ">
                            <p className="lg text-center text-danger pt-3   fw-bold  ">e!</p>
                        </div>
                        <div className="row mb-2 py-2 ">
                            <p className="ps-md-4 ps-5 text-center fs-1 fw-bolder text-white ">
                                Find the best restaurants, cafés, and bars</p>
                        </div>

                        {/* <!--                                  Input boxes                                    --> */}
                        <section className=" col-lg-6 col-10 m-auto mb-5 d-flex  position-relative flex-lg-row 
                        flex-column   gap-4 ">
                            <div onFocus={getlocationlist} className="input-group  search-location " >
                                <input type="text" className=" form-control rounded-0 py-3  "
                                    placeholder={placeHolderText} readOnly
                                />


                            </div>
                            <ul className=" list-group position-absolute top-100 text-decoration-none 
                                location-list-li ">
                                {locations.map((value, index) => {
                                    return (
                                        <li key={value.location_id} className=" text-black list-group-item w-100 text-decoration-none"
                                            onClick={() =>
                                                restarurantByLocationid(
                                                    value.location_id,
                                                    value.name,
                                                    value.city)
                                            }
                                        // key={value._id}
                                        >
                                            {value.name}, {value.city}</li>
                                    )
                                })}

                            </ul>

                            <div className="input-group  ">
                                <span className="input-group-text rounded-0  " id="basic-addon1">
                                    <i className=" fs-6 mx-2  fa-solid fa-magnifying-glass fa-2xs"></i></span>
                                <input type="text" className="form-control rounded-0 py-3   "
                                    placeholder="Search Restaurant"
                                    readOnly />
                                <ul className=" list-group top-100 position-absolute top-100 text-decoration-none 
                                location-list-li ">
                                    {restaurant.map((value, index) => {
                                        return (
                                            <li className=" list-group-item  text-decoration-none"
                                                key={value._id}
                                                onClick={() => Navigate('/restaurant/' + value._id)}>
                                                {value.name}, {value.city}
                                            </li>
                                        )
                                    })}

                                </ul>
                            </div>
                        </section>
                        <div className="mt-3">
                            <p></p>
                        </div>
                    </section>
                    {/* <!--                                               Man Section Rnd                           --> */}
                </section>
            </section>
            <section className="row ">
                <section className="col-10 m-auto py-2 mt-5 ">
                    <p className="h2 text-black   fw-bolder fs-2  my-3  ">Quick Searches</p>
                    <p className="mt-2  fs-3 ">Discover restaurants by type of meal</p>
                </section>
            </section>
            {/* <!--                                                 Restaurant Info Boxes            --> */}
            <section className=" col-11  m-auto">
                <section className=" " >
                    <section className=" col-12 d-flex ms-lg-5 gap-3 flex-wrap" >
                        {mealTypes.map((value, index) => {
                            return (
                                < div key={value._id} className="Restaurant-Info col-11 col-lg-3 m-3 ps-0 pe-2 
                                 mx-5 ms-4 d-flex  border shadow " onClick={() => { Navigate(`/Search/${value.meal_type}/${value.name}`) }}>

                                    <img className="ps-0 pt-0 h-100 w-50  " src={`/images/${value.image}`} alt="" />
                                    <div className="pt-1 mx-lg-2 text-center">
                                        <p className="fs-3 fw-bold h4 ">{value.name}</p>
                                        <p className="fs-5 ">{value.content}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </section>
                </section >
            </section >
            <div className="m-5 pt-4 col-10 m-auto text-center ">
                <p className="fs-4 mt-4">e!</p>
                <p className="fs-4 ">Zomato Clone @</p>
                <p className="fs-5 ">@Sumit</p>
            </div>

        </>
    )
}
export default Home;