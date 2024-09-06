import adminImage from '../assets/images/admin.jpeg'
import logo from '../assets/images/logo.jpg'

const CompanyView = () => {
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
          <span className="mr-4">HR Name</span>
          <div className="rounded-full overflow-hidden h-10 w-10">
            <img src={adminImage} alt="HR Profile" />
          </div>
        </div>
      </div>
      <div className="flex justify-center my-4">
        <button className="bg-393053 text-white px-6 py-2 rounded-l-full">Present</button>
        <button className="bg-white border border-393053 text-393053 px-6 py-2 rounded-r-full">Leave</button>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-4">
        {/* Card Template */}
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-635985 p-4 rounded-lg shadow-lg text-center">
            <div className="rounded-full overflow-hidden w-24 h-24 mx-auto mb-4">
              <img src={logo} alt="Employee" className="object-cover w-full h-full" />
            </div>
            <h3 className="text-white text-lg font-semibold">Company Name</h3>
            <p className="text-green-500 mt-2">Worked 3 hours 35 mins</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyView;
