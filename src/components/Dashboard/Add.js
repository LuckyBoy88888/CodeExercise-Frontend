import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'

const Add = ({ setIsAdding }) => {
  const [startLat, setStartLat] = useState('');
  const [startLong, setStartLong] = useState('');
  const [endLat, setEndLat] = useState('');
  const [endLong, setEndLong] = useState('');
  const [riderName, setRiderName] = useState('');
  const [driverName, setDriverName] = useState('');
  const [driverVehicle, setDriverVehicle] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!startLat || !startLong || !endLat || !endLong || !riderName || !driverName || !driverVehicle) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }
    const response = await axios.post('http://192.168.1.10:8010/rides', {
      start_lat: startLat,
      start_long: startLong,
      end_lat: endLat,
      end_long: endLong,
      rider_name: riderName,
      driver_name: driverName,
      driver_vehicle: driverVehicle,
    });

    console.log(response);
    if(response && response.data && response.data.error_code) {
      Swal.fire({
        icon: 'error',
        title: 'Add Failed!',
        text: response.data.message,
        showConfirmButton: false,
        timer: 3500,
      });
    } else {
      setIsAdding(false);
      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `data has been added.`,
        showConfirmButton: false,
        timer: 1500,
      });
    }

  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Ride</h1>
        <label htmlFor="startLat">Start Latitude</label>
        <input
          id="startLat"
          type="text"
          name="startLat"
          value={startLat}
          onChange={e => setStartLat(e.target.value)}
        />
        <label htmlFor="startLong">Start Longitude</label>
        <input
          id="startLong"
          type="text"
          name="startLong"
          value={startLong}
          onChange={e => setStartLong(e.target.value)}
        />
        <label htmlFor="endLat">End Latitude</label>
        <input
          id="endLat"
          type="text"
          name="endLat"
          value={endLat}
          onChange={e => setEndLat(e.target.value)}
        />
        <label htmlFor="endLong">End Longitude</label>
        <input
          id="endLong"
          type="text"
          name="endLong"
          value={endLong}
          onChange={e => setEndLong(e.target.value)}
        />
        <label htmlFor="riderName">Rider Name</label>
        <input
          id="riderName"
          type="text"
          name="riderName"
          value={riderName}
          onChange={e => setRiderName(e.target.value)}
        />
        <label htmlFor="driverName">Driver Name</label>
        <input
          id="driverName"
          type="text"
          name="driverName"
          value={driverName}
          onChange={e => setDriverName(e.target.value)}
        />
        <label htmlFor="driverVehicle">Driver Vehicle</label>
        <input
          id="driverVehicle"
          type="text"
          name="driverVehicle"
          value={driverVehicle}
          onChange={e => setDriverVehicle(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
