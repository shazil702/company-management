import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const login = async e => {
    e.preventDefault();
    const user = { email:email,
                   password: password};
                   try {
                     const response = await axios.post('http://127.0.0.1:8000/authentication/login/', user);
                     console.log(response.data);
                     localStorage.clear();
                     localStorage.setItem('access_token', response.data.access_token);
                     localStorage.setItem('refresh_token', response.data.refresh_token);
                     localStorage.setItem('role', response.data.role);
                     if (response.data.role === 'admin') {
                       navigate('/admin');
                     }
                     else if (response.data.role === 'hr') {
                       navigate('/hr');
                     }
                     else if (response.data.role === 'manager') {
                      localStorage.setItem('id', response.data.id);
                       navigate('/manager');
                     }
                     else if (response.data.role === 'employee') {
                       navigate('/employee');
                     }
                   } catch (error) {
                     console.log(error);
                   }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-393053 mb-6">Login</h1>
        <form onSubmit={login}>
          <div className="mb-4">
            <label className="block text-18122B text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-393053 focus:outline-none focus:ring-2 focus:ring-393053 focus:border-transparent"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-18122B text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-393053 focus:outline-none focus:ring-2 focus:ring-393053 focus:border-transparent"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-393053 text-white py-2 rounded-lg hover:bg-18122B transition duration-300"
            >
              Sign In
            </button>
          </div>
          <div className="text-center">
            <a href="#" className="text-635985 hover:underline">
              Forgotten password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
