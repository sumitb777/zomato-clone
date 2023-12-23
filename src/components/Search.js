import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
const Search = (props) => {

    let navigate = useNavigate();
    let { meal_id, meal_type_name } = useParams();
    let [pageno, setpageno] = useState(1)
    // let [cusin, setcusin] = useState([1])
    let [restaurants, setRestaurants] = useState([]);
    let [locations, setlocation] = useState([])

    let [filterData, setFilterData] = useState({
        meal_type: meal_id
    });

    const getlocationlist = async () => {
        let url = `https://zomato-backend-u1he.onrender.com/api/get-location-list`;
        let response = await fetch(url, { method: 'GET' },);
        let data = await response.json()
        setlocation(data.result)
    }
    let getFiltterData = async () => {
        let url = "https://zomato-backend-u1he.onrender.com/api/filterRestaurants";
        let { data } = await axios.post(url, { ...filterData });
        console.log(filterData);

        setRestaurants(data.filterresult);
        console.log(data.filterresult);

    }


    let fillterPageData = (name, event) => {
        let { value } = event.target;

        switch (name) {
            case "loc":
                if (value === undefined) {
                    delete filterData.location;

                } else {
                    filterData["location"] = value
                }

                break;
            case "sort":

                filterData["sort"] = Number(value)

                // setFilterData({ ...filterData, sort: Number(value) });

                break;

            case "min_price":
                let array = value.split("-"); //0-5000 ==> [ 0 , 500]
                filterData["lcost"] = Number(array[0])
                filterData["hcost"] = Number(array[1])

                // setFilterData({
                //     ...filterData,
                //     lCost: Number(array[0]),
                //     hCost: Number(array[1]),
                // });
                break;
            case "cuisin":
                if (event.target.checked === true) {
                    if (filterData["cuisine"] !== undefined) {
                        let isIncluded = filterData["cuisine"].includes(
                            Number(value)
                        );
                        if (isIncluded === false) {
                            filterData["cuisine"] = [...filterData["cuisine"],
                                Number(value),
                            ];
                        }
                    } else {
                        filterData["cuisine"] = [Number(value)];
                    }
                }
                else {
                    let cuisine = filterData['cuisine'].filter(
                        (id) => Number(value) !== id
                    );
                    if (cuisine.length === 0) {
                        delete filterData.cuisine;
                    } else {
                        filterData["cuisine"] = [...cuisine];
                    }
                }
                break;
            default:
                break;
        }
        setFilterData({ ...filterData })
    };

    const handlePageChange = (newPage) => {
        setpageno(newPage);
        setFilterData({ ...filterData, page: newPage })
    };


    useEffect(() => {
        getlocationlist();


    }, []);



    useEffect(() => {

        getFiltterData();

    }, [filterData]);


    return (

        <>
            <section className="row">
                <Header bgColor="bg-danger" user={props.user} />
            </section>
            <section className="row col-12  col-sm-11 ps-md-5   ps-1   m-auto">
                <section className="  ">
                    <h3 className=" fw-bolder fs-2 my-3   "> {meal_type_name} Places Near By</h3>
                </section>
            </section>



            <section className="row d-flex justify-content-center gap-lg-4  gap-md-1 col-12  m-auto   ">
                {/* <!--           fillter section               --> */}

                <section className="col-lg-3   ">
                    {/* <!--                    collapse           --> */}

                    <div className="col-sm-10 col-11 ">
                        <p className="d-lg-none d-grid   justify-content-center my-2 ">
                            <button className="btn btn-primary  " data-bs-toggle="collapse" data-bs-target="#dcbs">Fillter &
                                Sort</button>
                        </p>

                        <div id="dcbs" className="collapse show ">
                            <div className="ps-5 ">
                                <p className="fw-bold my-2">Filtters</p>
                                <div className="mb-3">
                                    <label for="" className="form-label ">Select Location</label>
                                    <select onChange={(e) => fillterPageData("loc", e)}
                                        className="form-select rounded-0  ">
                                        <option value="">Select Location</option>
                                        {locations.map((value, index) => {
                                            return <option value={value.location_id} key={index}>
                                                {value.name} ,{value.city}</option>
                                        })};

                                    </select>
                                </div>
                                <div className="mb-3 ">
                                    <label for="" className="form-label fw-bold my-2 ">Cuisine</label>
                                    <div className="form-check ">
                                        <input type="checkbox" value='1' name="cuisine"
                                            onChange={(e) => fillterPageData("cuisin", e)}
                                            className="form-check-input " />
                                        <label for="" className="form-check-label ">North Indian</label>
                                    </div>
                                    <div className="form-check ">
                                        <input type="checkbox" value='2' name="cuisine"
                                            onChange={(e) => fillterPageData("cuisin", e)} className="form-check-input " />
                                        <label for="" className="form-check-label ">South Indian</label>
                                    </div>

                                    <div className="form-check ">
                                        <input type="checkbox" value='3' name="cuisine" unChecked
                                            onChange={(e) => fillterPageData("cuisin", e)}
                                            className="form-check-input " />
                                        <label for="" className="form-check-label ">Chinese</label>
                                    </div>
                                    <div className="form-check ">
                                        <input type="checkbox" value='4' name="cuisine"
                                            onChange={(e) => fillterPageData("cuisin", e)} className="form-check-input " />
                                        <label for="" className="form-check-label ">Fast Food</label>
                                    </div>
                                    <div className="form-check ">
                                        <input type="checkbox" value='5' name="cuisine"
                                            onChange={(e) => fillterPageData("cuisin", e)} className="form-check-input " />
                                        <label for="" className="form-check-label ">Street Food</label>
                                    </div>
                                </div>

                                <div className="mb-3 ">
                                    <label for="" className="form-label  my-2 ">Cost For Two</label>
                                    <div className="form-check ">
                                        <input type="radio" className="form-check-input"
                                            value="1-500" name="minprice "
                                            onChange={(e) => fillterPageData("min_price", e)} />
                                        <label htmlFor="form-check-input" className="form-check-label ">Less than ` 500</label>
                                    </div>
                                    <div className="form-check ">
                                        <input type="radio" className="form-check-input "
                                            value="500-1000" name="minprice "
                                            onChange={(e) => fillterPageData("min_price", e)} />
                                        <label for="form-check-input" className="form-check-label ">` 500 to ` 1000</label>
                                    </div>
                                    <div className="form-check ">
                                        <input type="radio" className="form-check-input "
                                            value="1000-1500" name="minprice "
                                            onChange={(e) => fillterPageData("min_price", e)} />
                                        <label for="" className="form-check-label ">` 1000 to ` 1500</label>
                                    </div>
                                    <div className="form-check ">
                                        <input type="radio" className="form-check-input"
                                            value="1500-2000" name="minprice "
                                            onChange={(e) => fillterPageData("min_price", e)} />
                                        <label for="" className="form-check-label ">` 1500 to ` 2000</label>
                                    </div>
                                    <div className="form-check ">
                                        <input type="radio" className="form-check-input "
                                            value="2000-20000" name="minprice "
                                            onChange={(e) => fillterPageData("min_price", e)} />
                                        <label for="" className="form-check-label ">` 2000+</label>
                                    </div>

                                </div>
                                <p className="mt-4 mb-2 fw-bold">Sort</p>
                                <div>
                                    <div className="ms-1">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            value="1"
                                            name="sort"
                                            // checked={filterData.sort === 1 ? true : false}
                                            onChange={(e) => fillterPageData("sort", e)}
                                        />
                                        <label htmlFor="" className="form-check-label ms-1">
                                            Price low to high
                                        </label>
                                    </div>
                                    <div className="ms-1">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            name="sort"
                                            value="-1"
                                            // checked={filterData.sort === -1 ? true : false}
                                            onChange={(e) => fillterPageData("sort", e)}
                                        />
                                        <label htmlFor="" className="form-check-label ms-1">
                                            Price high to low
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* <!--                                collapse End                    --> */}

                </section>
                {/* <!--                  Filtter-End                 --> */}


                <section className="col-12 col-lg-8  ">
                    <section className="row gap-4 ">
                        {restaurants.length === 0 ? (
                            <div className="mt-2 h-100">
                                <h3 className="fw-bold ">No restaurant Availbale </h3>

                            </div>
                        ) : (
                            restaurants.map((value, index) => {

                                return (
                                    <div className="box bg-white border shadow "

                                        onClick={() => navigate('/restaurant/' + value._id)} key={index}
                                    >
                                        <div className="info d-flex  gap-0 ps-0   pt-4 ps-sm-3 gap-sm-3  ">
                                            <img className="img-fluid " src={`/images/${value.image}`} alt="" />
                                            <div className="mt-2 ms-3  ">
                                                <h3 className="fw-bold ms-1 mb-2 ">{value.name}</h3>

                                                <p>{value.locality}, {value.city}</p>
                                            </div>

                                        </div>
                                        <hr />
                                        <div className=" d-flex gap-5 ms-0 ms-sm-5  mt-3 ">
                                            <div>
                                                <p>CUISINES:</p>
                                                <p>COST FOR TWO:</p>
                                            </div>
                                            <div>
                                                <p>{value.cuisine.map((c) => {
                                                    return `${c.name} ,`
                                                })} </p>
                                                <p> ₹ {value.min_price}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                        <div className="mt-3">
                            <ul className="d-flex gap-4 justify-content-center  list-unstyled  ">
                                <li onClick={() => handlePageChange(pageno - 1)}
                                    className="lifooter border border-black border-3 btn py-1 px-2"> {'<'} </li>
                                <li onClick={() => handlePageChange(1)}
                                    className="lifooter border border-black border-3 px-2 btn py-1 active" active > 1 </li>
                                <li onClick={() => handlePageChange(2)}
                                    className="lifooter btn border border-black border-3 px-2 py-1"> 2 </li>
                                <li onClick={() => handlePageChange(3)}
                                    className="lifooter border border-black border-3 py-1 btn px-2"> 3 </li>

                                <li onClick={() => handlePageChange(pageno + 1)}
                                    className="lifooter border border-black border-3 py-1 btn px-2"> {'>'}  </li>

                            </ul>
                        </div>



                    </section>



                </section>
            </section>
        </>

    )

}

export default Search;