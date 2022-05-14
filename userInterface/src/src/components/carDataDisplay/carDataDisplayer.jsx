import { useState, useEffect, Component } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import GoogleMapReact from 'google-map-react';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const axios = require('axios');
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const image =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
const Marker = ({image}) => <div><img src={image} alt="marker"/></div>;

export default function DisplayCarData({setErrorCount}){
    
    useEffect(() => {
        setErrorCount(0);
    }, [])
    const { user } = useContext(AuthContext);
    const [currentCar,setCurrrentCar] = useState(user.car1);

    const [carData, setCarData] = useState([
        {
            "_id": "5e9f9c9c9f9f9f9f9f9f9f9",
            "datetime": "2020-05-05T00:00:00.000Z",
            "coordinate1": "40.730610",
            "coordinate2": "-73.935242",
            "carnumber": "1",
        }
    ]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});


    useEffect(() => {
        const interval = setInterval(() => {
            //getCarData(1);
            
             axios.get(`http://localhost:4041/realTimeCarData${currentCar}`).then(async function(response){
                    console.log(response.data);
                    let carData = response.data;
                    
                    carData.map(car => {
                        car.datetime = car.datetime.toLocaleString();
                        car.coordinate1 = parseFloat(car.coordinate1);
                        car.coordinate2 = parseFloat(car.coordinate2);
                        car.carnumber = parseInt(car.carnumber);
                    });
                    setCarData(carData);
                    
                    }).catch(function(error){
                        console.log(error);
                    });
            
        }, 10000);
        
        return () => clearInterval(interval);
    }
    , [currentCar]);

    return (
        <div>
            <h1>Car Data</h1>
            <div>
                <h1>Hi! {user.username}</h1>
                <h1>
                <button className="loginButton" onClick={() => setCurrrentCar(user.car1)} style={{'margin': '10px', 'cursor': 'pointer','padding':'10px'}}>Car 1</button>
                <button className="loginButton" onClick={() => setCurrrentCar(user.car2)} style={{'margin': '10px', 'cursor': 'pointer','padding':'10px'}}>Car 2</button>
                </h1>
                <h1>Current Car: {currentCar}</h1>
                <div style={{ height: '100vh', width: '100%' }}>
                    <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
                    defaultCenter={{

                        lng: 17.822133881640568,
                        lat: 59.42190595212989
                    }}
                    defaultZoom={11}
                    >
                    {carData.map(car => (
                        <Marker
                        key={car._id}
                        lng={car.coordinate1}
                        lat={car.coordinate2}
                        text={car.carnumber}
                        image={image}
                        />
                    ))}
                    
                    
                    </GoogleMapReact>
                </div>
                
                
            </div>
        </div>
    );
}
                
                {/* {carData.map(car => (
                    <div>
                        
                        <h3>CAR ID:</h3><p>{car._id}</p>
                        <h3>LATITUDE</h3><p>{car.coordinate1}</p>
                        <h3>LONGITUDE</h3><p>{car.coordinate2}</p>
                        <h3>DATE TIME</h3><p>{car.datetime}</p>
                    </div>
                ))} */}
            
     