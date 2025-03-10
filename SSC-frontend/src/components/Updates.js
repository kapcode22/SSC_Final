import React, { useState, useEffect } from 'react';
import './Updates.css';
import { useDispatch, useSelector } from "react-redux"

import { getUpdates } from '../reducers/updatesReducer';
const Updates = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.updateReducer)
    //  console.log(state)

    // const [data, setData] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        dispatch(getUpdates())
    }, [dispatch]);

    return (
        <>
            <div className="search-container">
                <input
                    className="search-bar"
                    placeholder="Search updates..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
            <div className="updates-container">

                {
                    state && state.updatesData && state.updatesData.length > 0 ? state.updatesData
                        .sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)
                        .filter(item => item.title.toLowerCase().includes(filter.toLowerCase()))
                        .map((serviceItem, serviceIndex) => {
                            return (
                                <div key={serviceIndex + 1} className="card">        
                                    <img width="100%" src={`http://localhost:5000/${serviceItem?.imageUrl}`} alt='...'></img>
                                    {/* {console.log(`http://localhost:5000/${serviceItem?.imageUrl}`)} */}
                                    <div className="card-title">{serviceItem?.title}</div>
                                    <div className="card-description">{serviceItem?.description}</div>
                                </div>
                            );
                        }) : 'Data not found'}
            </div>
        </>
    );
};

export default Updates;
