import React, { useEffect, useState } from 'react';
import './css/style.css';
import '@fortawesome/fontawesome-free/css/all.css';

const Tempapp = () => {
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("mumbai");
    const apiKey = "4a4fc4e606735c2dec02528c3bb13b67";

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${apiKey}`;
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    setCity(data);
                } else {
                    throw new Error('City not found');
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setCity(null);
            }
        };
        fetchApi();
    }, [search, apiKey]);

    return (
        <React.Fragment>
            <div className='box'>
                <div className='inputData'>
                    <input type='search' className='inputField' onChange={(event) => setSearch(event.target.value)} />
                </div>
                {
                    !city ? (
                        <p>No Data Found</p>
                    ) : (
                        <div className='info'>
                            <h2 className='location'>
                                <i className="fas fa-street-view"></i>{search}
                            </h2>
                            <h1 className='temp'>
                                {city.main.temp}
                            </h1>
                            <h6 className='tempian_max'>Min : {city.main.temp_min} | Max : {city.main.temp_max}</h6>
                        </div>
                    )
                }
            </div>
        </React.Fragment>
    );
}

export default Tempapp;
