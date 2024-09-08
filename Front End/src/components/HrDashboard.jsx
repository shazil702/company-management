import { useEffect, useState } from 'react';
import axios from 'axios';
import adminImage from '../assets/images/admin.jpeg'
const HrDashboard = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(()=>{
    const fetchEmployees = async ()=>{
      try {
        const response = await axios.get('http://127.0.0.1:8000/hr/employees/');
        setEmployees(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployees();
  },[]);

  return (
    <div className="">
        <div className="bg-18122B text-white px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <input 
            type="text"
            placeholder="Search"
            className="ml-4 bg-EEEEEE text-393053 px-4 py-2 rounded-full focus:outline-none"
          />
        </div>
        {/* HR Profile */}
        <div className="flex items-center">
          <span className="mr-4">Admin</span>
          <div className="rounded-full overflow-hidden h-10 w-10">
            <img src={adminImage} alt="HR Profile" />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 border border-gray-200">
          <thead>
            <tr className="bg-purple-900 text-white">
              <th className="py-2 px-4">Id</th>
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Mail</th>
              <th className="py-2 px-4">Team</th>
              <th className="py-2 px-4">Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="text-center border-t border-gray-300">
                <td className="py-3 px-4">{employee.id}</td>
                <td className="py-3 px-4">
                  <img src={`http://127.0.0.1:8000${employee.image}`} alt="profile" className="w-10 h-10 rounded-full object-cover mx-auto" />
                </td>
                <td className="py-3 px-4">{employee.username}</td>
                <td className="py-3 px-4">{employee.email}</td>
                <td className="py-3 px-4">{employee.team}</td>
                <td className="py-3 px-4">{employee.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HrDashboard;
