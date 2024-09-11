import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeProfile = () => {
    const [employee, setEmployee] = useState([]);
    const [clockIn, setClockIn] = useState('');
    const [clockOut, setClockOut] = useState('');
    const [clockButton, setClockButton] = useState('Clock In');
    const navigate = useNavigate();
    const date = new Date().toISOString().split('T')[0];
    
    const handleClockIn = async () => {
      const formatTimeWithMicroseconds = (date) => {
        return date.toISOString().slice(11, 23); // 'hh:mm:ss.uuu' format
      };
    
      if (clockButton === 'Clock In') {
        const clockInTime = formatTimeWithMicroseconds(new Date());
        setClockIn(clockInTime);
        localStorage.setItem('clockIn', clockInTime); // Store clockIn directly in localStorage
        setClockButton('Clock Out');
      } else if (clockButton === 'Clock Out') {
        const clockOutTime = formatTimeWithMicroseconds(new Date());
        setClockOut(clockOutTime);
    
        try {
          const response = await axios.post('http://127.0.0.1:8000/hr/add_attendance/', {
            employee_id: employee.id,
            clock_in: localStorage.getItem('clockIn'), // Get clockIn from localStorage
            clock_out: clockOutTime,
            date: new Date().toISOString().slice(0, 10), // 'YYYY-MM-DD' format for the date
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          });
          console.log(response.data);
          localStorage.removeItem('clockIn'); // Fix typo (removeItemK -> removeItem)
        } catch (error) {
          console.log(error);
        }
      }
    };
    
    console.log(clockIn);
    
    useEffect(()=>{
        const fetchEmployee = async ()=>{
          try {
            const response = await axios.get('http://127.0.0.1:8000/hr/employee_detail/',{
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            }
            );
            setEmployee(response.data);
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchEmployee();
      },[]);
      const logout = () => {
        localStorage.clear();
        navigate('/');
      }
    return (
        <div className="min-h-screen bg-[#393053] flex justify-center items-center">
  <div className="bg-[#18122B] w-2/3 p-8 rounded-lg shadow-lg">
  <div className="absolute top-4 right-4">
      <button
        className="bg-[#635985] text-white py-2 px-6 rounded-md hover:bg-[#524370] transition"
        onClick={handleClockIn}
      >
        {clockButton}
      </button>
    </div>
    <h1 className="text-2xl font-bold text-[#EEEEEE] mb-6 text-center">
      Employee Profile
    </h1>
    <div className="flex justify-center mb-6">
      <img
        src={`http://127.0.0.1:8000${employee.image}`}
        alt=""
        className="rounded-full w-32 h-32 object-cover border-4 border-[#635985]"
      />
    </div>
    <div className="grid grid-cols-2 gap-6">
      <div>
        <label className="block text-[#635985] text-sm font-semibold mb-1">
          Name
        </label>
        <p className="text-[#EEEEEE] bg-[#393053] px-4 py-2 rounded-md">
          {employee.username}
        </p>
      </div>
      <div>
        <label className="block text-[#635985] text-sm font-semibold mb-1">
          Email
        </label>
        <p className="text-[#EEEEEE] bg-[#393053] px-4 py-2 rounded-md">
          {employee.email}
        </p>
      </div>
      <div>
        <label className="block text-[#635985] text-sm font-semibold mb-1">
          Phone
        </label>
        <p className="text-[#EEEEEE] bg-[#393053] px-4 py-2 rounded-md">
          {employee.phone}
        </p>
      </div>
      <div>
        <label className="block text-[#635985] text-sm font-semibold mb-1">
          Department
        </label>
        <p className="text-[#EEEEEE] bg-[#393053] px-4 py-2 rounded-md">
          {employee.department?.departmentName}
        </p>
      </div>
    </div>
    <div className="mt-8 text-center">
      <button
        className="bg-[#635985] text-white py-2 px-6 rounded-md hover:bg-[#524370] transition"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  </div>
</div>
     
    );
  };
  
  export default EmployeeProfile;
  