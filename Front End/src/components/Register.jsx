import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('1');
  const [isEmployee, setIsEmployee] = useState(true);
  const [isManager, setIsManager] = useState(false);
  const [image, setImage] = useState(null);

  const register = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('username', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);
      formData.append('is_employee', isEmployee);
      formData.append('is_manager', isManager);
      formData.append('department_id', department);
      if(image) {
        formData.append('image', image);
      }
      try {
          const {data} = await axios.post('http://127.0.0.1:8000/authentication/register/', formData, {
            headers:{
              'Content-Type': 'multipart/form-data',
            }
          });
          localStorage.clear();
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          if(data.role === 'manager') {
            navigate('/manager');
          }
          else if(data.role === 'employee') {
            navigate('/employee');
          }
      } catch (error) {
          console.log(error);
      }
  };
  

  return (
      <div className="min-h-screen bg-[#393053] flex justify-center items-center">
          <div className="w-full max-w-lg">
              <div className="text-center">
                  <img src="logo.png" alt="Logo" className="mx-auto mb-6" />
                  <h1 className="text-4xl font-bold mb-2 text-[#EEEEEE]">Welcome Dev</h1>
              </div>
              <div className="bg-[#635985] shadow-lg rounded-lg p-8">
                  <h2 className="text-2xl font-semibold mb-6 text-[#EEEEEE]">Register</h2>
                  <form onSubmit={register}>
                      <div className="mb-4">
                          <label className="block text-[#EEEEEE] text-sm font-bold mb-2" htmlFor="name">
                              Name
                          </label>
                          <input
                              id="name"
                              type="text"
                              placeholder="Full Name"
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#393053] leading-tight focus:outline-none focus:shadow-outline"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                          />
                      </div>
                      <div className="mb-4">
                          <label className="block text-[#EEEEEE] text-sm font-bold mb-2" htmlFor="email">
                              Email
                          </label>
                          <input
                              id="email"
                              type="email"
                              placeholder="Email"
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#393053] leading-tight focus:outline-none focus:shadow-outline"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                          />
                      </div>
                      <div className="mb-6">
                          <label className="block text-[#EEEEEE] text-sm font-bold mb-2" htmlFor="phone">
                              Phone
                          </label>
                          <input
                              id="phone"
                              type="text"
                              placeholder="Phone number with country code"
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#393053] leading-tight focus:outline-none focus:shadow-outline"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required
                          />
                      </div>
                      <div className="mb-4">
                          <label className="block text-[#EEEEEE] text-sm font-bold mb-2" htmlFor="password">
                              Password
                          </label>
                          <input
                              id="password"
                              type="password"
                              placeholder="Password"
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#393053] leading-tight focus:outline-none focus:shadow-outline"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                          />
                      </div>
                      <div className="mb-4">
                          <label className="block text-[#EEEEEE] text-sm font-bold mb-2">Role</label>
                          <div className="flex items-center">
                              <label className="text-[#EEEEEE] mr-4">
                                  <input
                                      type="radio"
                                      name="role"
                                      value="manager"
                                      checked={isManager}
                                      onChange={() => setIsManager(!isManager)}
                                      className="mr-2"
                                  />
                                  Manager
                              </label>
                              <label className="text-[#EEEEEE]">
                                  <input
                                      type="radio"
                                      name="role"
                                      value="employee"
                                      checked={isEmployee}
                                      onChange={() => setIsEmployee(!isEmployee)}
                                      className="mr-2"
                                  />
                                  Employee
                              </label>
                          </div>
                      </div>
                      <div className="mb-4">
                          <label className="block text-[#EEEEEE] text-sm font-bold mb-2" htmlFor="department">
                              Department
                          </label>
                          <select
                              id="department"
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#393053] leading-tight focus:outline-none focus:shadow-outline"
                              value={department}
                              onChange={(e) => setDepartment(e.target.value)}
                          >
                              <option value="1">Frontend</option>
                              <option value="2">Backend</option>
                              <option value="3">Devops</option>
                              <option value="4">Full Stack</option>
                          </select>
                      </div>
                      <div className="mb-4">
              <label className="block text-[#EEEEEE] text-sm font-bold mb-2" htmlFor="image">
                Upload Image
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#393053] leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
                      <div className="flex items-center justify-between">
                          <button
                              type="submit"
                              className="bg-[#18122B] hover:bg-[#393053] text-[#EEEEEE] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          >
                              Register
                          </button>
                      </div>
                  </form>
                  <p className="text-center text-[#EEEEEE] text-xs mt-6">
                      Already have an account? <a href="/login" className="text-[#18122B]">Sign in</a>
                  </p>
              </div>
          </div>
      </div>
  );
};

export default Register;
