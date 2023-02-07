import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import Pagination from './Pagination'

const Dashboard = ({ setIsAuthenticated }) => {
  const [selectedRide, setSelectedRide] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [rideList, setRideList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const response = await axios.get(`http://192.168.1.10:8010/rides?page=${currentPage}&perPage=${perPage}`);
      if(response.data) {
        setRideList(response.data.data);
        setTotalCount(response.data.paging.pages);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = id => {
    const ride = rideList.find(item => item.id === id);
    setSelectedRide(ride);
    setIsEditing(true);
  };

  useEffect(() => {
    fetchRides();
  }, [isAdding, isEditing, perPage, currentPage])

  return (
    <div className="container">
      {!isAdding && !isEditing && rideList.length > 0 && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
            setPerPage={setPerPage}
            perPage={perPage}
          />
          <Table
            employees={rideList}
            handleEdit={handleEdit}
          />
          <Pagination
            nPages={totalCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
      {isAdding && (
        <Add
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          selectedRide={selectedRide}
          setIsEditing={setIsEditing}
          totalCount={totalCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Dashboard;
