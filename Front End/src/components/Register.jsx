import axios from "axios";
import { useState } from "react";

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const register = async e => {
        e.preventDefault();
        const user = {
            username: name,
            email: email,
            phone: phone,
            password: password,
        };
        try{
            const data = await axios.post('http://127.0.0.1:8000/authentication/register/',user)
            console.log(data);
        }catch(error){
            console.log(error);
        }
    }
    
  return (
    <div className="min-h-screen bg-393053 flex justify-center items-center">
      <div className="w-full max-w-lg">
        <div className="text-center">
          <img src="logo.png" alt="Logo" className="mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-2 text-EEEEEE">Welcome Dev</h1>
        </div>
        <div className="bg-635985 shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-EEEEEE">Register</h2>
          <form onSubmit={register}>
            <div className="mb-4">
              <label className="block text-EEEEEE text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Full Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-393053 leading-tight focus:outline-none focus:shadow-outline"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-EEEEEE text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-393053 leading-tight focus:outline-none focus:shadow-outline"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-EEEEEE text-sm font-bold mb-2" htmlFor="confirm-password">
                Phone
              </label>
              <input
                id="phone"
                type="text"
                placeholder="phone number with coutry code"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-393053 leading-tight focus:outline-none focus:shadow-outline"
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-EEEEEE text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-393053 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-18122B hover:bg-393053 text-EEEEEE font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Register
              </button>
            </div>
          </form>
          <p className="text-center text-EEEEEE text-xs mt-6">
            Already have an account? <a href="/login" className="text-18122B">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
