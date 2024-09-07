import { useState } from 'react';
import adminImage from '../assets/images/admin.jpeg'
import { useEffect } from 'react';
import axios from 'axios';

const CompanyView = () => {
  const [company, setCompany] = useState([]);
  useEffect(()=>{
    const fetchdata = async ()=>{
      try {
        const response = await axios.get('http://127.0.0.1:8000/company/allCompanies');
        setCompany(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  },[]);
console.log(company);

  
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
        {/* HR Profile */}
        <div className="flex items-center">
          <span className="mr-4">Admin</span>
          <div className="rounded-full overflow-hidden h-10 w-10">
            <img src={adminImage} alt="HR Profile" />
          </div>
        </div>
      </div>
      <div className="flex justify-center my-4">
        <button className="bg-393053 text-white px-6 py-2 rounded-full">Add Company</button>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-4">
        {/* Card Template */}
        {company.map((company,index) => (
          <div key={index} className="bg-635985 p-4 rounded-lg shadow-lg text-center">
            <div className="rounded-full overflow-hidden w-24 h-24 mx-auto mb-4">
              <img src={`http://127.0.0.1:8000${company.companyLogo}`} alt="Employee" className="object-cover w-full h-full" />
            </div>
            <h3 className="text-white text-lg font-semibold">{company.companyName}</h3>
            <p className="text-green-500 mt-2">{company.conpanyAddress}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyView;
