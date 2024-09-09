import axios from "axios";
import { useState } from "react";

const AddEmployee = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const mail = {
            email: email,
        };
        try{
            const {data} = await axios.post('http://127.0.0.1:8000/hr/send_email/',mail);
            console.log(data);
        }
        catch(error){
            console.log(error);
        }
    };
    return (
      <div className="min-h-screen bg-[#EEEEEE] flex justify-center items-center">
        <div className="bg-[#18122B] w-1/3 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-[#EEEEEE] mb-6 text-center">
            Enter Employee Email
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-[#635985] text-sm font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 bg-[#393053] text-[#EEEEEE] border border-[#EEEEEE] rounded-md focus:outline-none focus:border-[#635985]"
                placeholder="name@email.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="mt-6 text-center">
              <button
                type="submit"
                className="bg-[#635985] text-white py-2 px-6 rounded-md hover:bg-[#524370] transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default AddEmployee;
  