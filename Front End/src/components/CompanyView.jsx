import { useState } from 'react';
import adminImage from '../assets/images/admin.jpeg'
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

const CompanyView = () => {
  const [company, setCompany] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchdata = async ()=>{
      try {
        const response = await axios.get('http://127.0.0.1:8000/company/allCompanies',{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setCompany(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  },[]);

  const logout = () => {
    localStorage.clear();
    navigate('/');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-18122B text-white px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <input 
            type="text"
            placeholder="Search"
            className="ml-4 bg-EEEEEE text-393053 px-4 py-2 rounded-full focus:outline-none"
          />
        </div>
        <div className="flex items-center">
          <span className="mr-4">Admin</span>
          <div className="rounded-full overflow-hidden h-10 w-10">
            <img src={adminImage} alt="HR Profile" />
          </div>
          <button className='rounded-xl px-4' onClick={logout}>Logout</button>
        </div>
      </div>
      <div className="flex justify-center my-4">
        <button className="bg-393053 text-white px-6 py-2 rounded-full" onClick={()=>navigate('/addCompany')}>Add Company</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-4">
        {company.map((company,index) => (
          <Link to={`/editCompany?id=${company.id}`}>
          <div key={index} className="bg-635985 p-4 rounded-lg shadow-lg text-center">
            <div className="rounded-full overflow-hidden w-24 h-24 mx-auto mb-4">
              <img src={`http://127.0.0.1:8000${company.companyLogo}`} alt="Employee" className="object-cover w-full h-full" />
            </div>
            <h3 className="text-white text-lg font-semibold">{company.companyName}</h3>
            <p className="text-green-500 mt-2">{company.companyAddress}</p>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompanyView;