import React from 'react';

const Table = ({ employees, handleEdit, totalCount, currentPage, setCurrentPage }) => {
  employees.forEach((employee, i) => {
    employee.id = i + 1;
  });

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: null,
  });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Start Latitude</th>
            <th>Start Longitude</th>
            <th>End Latitude</th>
            <th>End Longitude</th>
            <th>Rider Name</th>
            <th>Driver Name</th>
            <th>Driver Vehicle</th>
            <th className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, i) => (
              <tr key={employee.id}>
                <td>{i + 1}</td>
                <td>{employee.startLat}</td>
                <td>{employee.startLong}</td>
                <td>{employee.endLat}</td>
                <td>{employee.endLong}</td>
                <td>{employee.riderName} </td>
                <td>{employee.driverName} </td>
                <td>{employee.driverVehicle} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(employee.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9}>No Employees</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
