import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Attendance = ()=>{
    const current_date = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState(current_date);
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchEmployees = async ()=>{
            const userDate = {
                date: date
            }
            try {
                const response = await axios.post('http://127.0.0.1:8000/hr/view_attendance/',userDate,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
                setEmployees(response.data);
                console.log(response.data);
                
            } catch (error) {
                console.error(error);
            }
        }
        fetchEmployees();
    },[])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userDate = {
            date: date
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/hr/view_attendance/',userDate,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            setEmployees(response.data);
            console.log(response.data);
            
        } catch (error) {
            console.error(error);
        }
    }
    const logout = () => {
        localStorage.clear();
        navigate('/');
      }
    return(
        <div className="overflow-x-auto">
            <div className="flex justify-center items-center m-4">
  <h1 className="font-bold text-2xl">Weekly attendance</h1>
  <form onSubmit={handleSubmit}>
  <input 
    type="text" 
    className="mx-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-393053 focus:border-transparent" 
    placeholder="Enter date"
    value={date}
    onChange={(e)=>setDate(e.target.value)}
  />
  <button 
    className="bg-393053 text-white px-4 py-2 rounded-md hover:bg-635985 focus:outline-none focus:ring-2 focus:ring-393053 focus:ring-opacity-50">
    Submit
  </button>
  </form>
  <button 
    className="bg-393053 text-white px-4 py-2 mx-6 rounded-md hover:bg-635985 focus:outline-none focus:ring-2 focus:ring-393053 focus:ring-opacity-50"
    onClick={logout}>
    Logout
  </button>
</div>

        <table className="min-w-full bg-gray-100 border border-gray-200">
          <thead>
            <tr className="bg-purple-900 text-white">
              <th className="py-2 px-4">Id</th>
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Mail</th>
              <th className="py-2 px-4">clock In</th>
              <th className="py-2 px-4">Clock out</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employee.id} className="text-center border-t border-gray-300">
                <td className="py-3 px-4">{employee.id}</td>
                <td className="py-3 px-4">
                  <img src={`http://127.0.0.1:8000${employee.employee.image}`} alt="profile" className="w-10 h-10 rounded-full object-cover mx-auto" />
                </td>
                <td className="py-3 px-4">{employee.employee.username}</td>
                <td className="py-3 px-4">{employee.employee.email}</td>
                <td className="py-3 px-4">{employee.clock_in}</td>
                <td className="py-3 px-4">{employee.clock_out}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}
export default Attendance