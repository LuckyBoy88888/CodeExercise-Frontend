import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'

const Edit = ({ selectedRide, setIsEditing }) => {
  const id = selectedRide.id;

  const [startLat, setStartLat] = useState(selectedRide.startLat);
  const [startLong, setStartLong] = useState(selectedRide.startLong);
  const [endLat, setEndLat] = useState(selectedRide.endLat);
  const [endLong, setEndLong] = useState(selectedRide.endLong);
  const [riderName, setRiderName] = useState(selectedRide.riderName);
  const [driverName, setDriverName] = useState(selectedRide.driverName);
  const [driverVehicle, setDriverVehicle] = useState(selectedRide.driverVehicle);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!startLat || !startLong || !endLat || !endLong || !riderName || !driverName || !driverVehicle) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    try {
      const response = await axios.post(`http://192.168.1.10:8010/rides/${id}`, {
        start_lat: startLat,
        start_long: startLong,
        end_lat: endLat,
        end_long: endLong,
        rider_name: riderName,
        driver_name: driverName,
        driver_vehicle: driverVehicle,
      });
      if(response && response.data && response.data.error_code) {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed!',
          text: response.data.message,
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        setIsEditing(false);
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: `data has been Updated.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Employee</h1>
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
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
