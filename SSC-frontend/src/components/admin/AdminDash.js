import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./AdminDash.css";
import { useNavigate } from 'react-router-dom';

const AdminDash = () => {
    const [sliderImages, setSliderImages] = useState([]);
    const [postHolders, setPostHolders] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedClub, setSelectedClub] = useState("spc"); // Default club
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('type') !== 'ADMIN') {
            navigate('/admin/dashboard');
        } else {
            fetchSliderImages(selectedClub);
            fetchPostHolders(selectedClub);
            fetchEvents(selectedClub);
        }
    }, [selectedClub, navigate]);

    const fetchSliderImages = async (club) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/sliderImages/${club}`);
            setSliderImages(res.data);
        } catch (err) {
            console.error("Error fetching slider images:", err);
        }
    };

    const fetchPostHolders = async (club) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/postholders/${club}`);
            setPostHolders(res.data);
        } catch (err) {
            console.error("Error fetching post holders:", err);
        }
    };

    const fetchEvents = async (club) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/events/${club}`);
            setEvents(res.data);
        } catch (err) {
            console.error("Error fetching events:", err);
        }
    };

    const handleDeleteSliderImage = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/sliderImages/${selectedClub}/${id}`);
            fetchSliderImages(selectedClub); // Refresh data
        } catch (err) {
            console.error("Error deleting slider image:", err);
        }
    };

    const handleDeletePostHolder = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/postholders/${selectedClub}/${id}`);
            fetchPostHolders(selectedClub); // Refresh data
        } catch (err) {
            console.error("Error deleting post holder:", err);
        }
    };

    const handleDeleteEvent = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/events/${selectedClub}/${id}`);
            fetchEvents(selectedClub); // Refresh data
        } catch (err) {
            console.error("Error deleting event:", err);
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>

            <label>Select Club:</label>
            <select value={selectedClub} onChange={(e) => setSelectedClub(e.target.value)}>
                <option value="spc">SPC</option>
                <option value="ku">KU</option>
                <option value="hhc">HHC</option>
                <option value="sahyog">Sahyog</option>
            </select>

            {/* Slider Images Table */}
            <h2>Slider Images</h2>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sliderImages.map((image) => (
                        <tr key={image._id}>
                            <td>{image._id}</td>
                            <td><img src={image.imageUrl} alt="slider" width="100" /></td>
                            <td>
                                <button onClick={() => handleDeleteSliderImage(image._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Post Holders Table */}
            <h2>Post Holders</h2>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {postHolders.map((holder) => (
                        <tr key={holder._id}>
                            <td>{holder._id}</td>
                            <td>{holder.name}</td>
                            <td>{holder.position}</td>
                            <td>
                                <button onClick={() => handleDeletePostHolder(holder._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Events Table */}
            <h2>Events</h2>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event._id}>
                            <td>{event._id}</td>
                            <td>{event.name}</td>

                            <td>
                                <button onClick={() => handleDeleteEvent(event._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDash;
