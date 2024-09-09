import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

const EditCompany = () => {
    const [companyName, setCompanyName] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [companyLogo, setCompanyLogo] = useState(null);
    const [companyAddress, setCompanyAddress] = useState('');
    const [logoPreview, setLogoPreview] = useState(null);
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`http://127.0.0.1:8000/company/allCompanies/${id}/`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          });
          setCompanyName(data.companyName);
          setCompanyEmail(data.companyEmail);
          setCompanyPhone(data.companyPhone);
          setCompanyLogo(data.companyLogo); 
          setCompanyAddress(data.companyAddress);
          setLogoPreview(`http://127.0.0.1:8000${data.companyLogo}`);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, []);
  
    const handleLogoChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setCompanyLogo(file);
        setLogoPreview(URL.createObjectURL(file));
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('companyName', companyName);
      formData.append('companyEmail', companyEmail);
      formData.append('companyPhone', companyPhone);
      formData.append('companyAddress', companyAddress);
      if (companyLogo instanceof File) {
        formData.append('companyLogo', companyLogo);
      }
      try {
        const response = await axios.put(`http://127.0.0.1:8000/company/allCompanies/${id}/`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        alert('Changes Applied');
        navigate('/admin');
      } catch (error) {
        console.log(error);
      }
    };

    const deleteCompany = async ()=>{
        const isConfimed = window.confirm('Are you sure you want to delete this company?');
        if(!isConfimed){
            return;
        }
        try {
            await axios.delete(`http://127.0.0.1:8000/company/allCompanies/${id}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            console.log('Company deleted');
            alert('Company deleted');
            navigate('/admin');
        } catch (error) {
            console.log(error);
        }
    }
  
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-semibold text-center text-393053 mb-6">Edit Company</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex flex-col items-center">
                  <label htmlFor="logo" className="text-18122B font-semibold mb-2">
                    Company Logo
                  </label>
                  <div className="relative w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-500">No logo</span>
                    )}
                    <input
                      type="file"
                      id="logo"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      accept="image/*"
                      onChange={handleLogoChange}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="company-name"
                    className="block text-18122B text-sm font-bold mb-2"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company-name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-393053 focus:outline-none focus:ring-2 focus:ring-393053"
                    placeholder="Enter company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-18122B text-sm font-bold mb-2"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-393053 focus:outline-none focus:ring-2 focus:ring-393053"
                    placeholder="Enter company address"
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="contact-number"
                    className="block text-18122B text-sm font-bold mb-2"
                  >
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="contact-number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-393053 focus:outline-none focus:ring-2 focus:ring-393053"
                    placeholder="Enter contact number"
                    required
                    value={companyPhone}
                    onChange={(e) => setCompanyPhone(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-18122B text-sm font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-393053 focus:outline-none focus:ring-2 focus:ring-393053"
                    placeholder="Enter company email"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4">
                    <Link to={'/admin'}>
                  <button
                    type="button"
                    className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                  >
                    Cancel
                  </button></Link>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-393053 text-white rounded-lg hover:bg-18122B"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                    onClick={deleteCompany}
                    >Delete</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };
  

export default EditCompany;