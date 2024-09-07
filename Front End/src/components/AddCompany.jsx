const AddCompany = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <h1 className="text-3xl font-semibold text-center text-393053 mb-6">Create Company</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side - Company Details */}
          <div className="space-y-4">
            {/* Company Logo */}
            <div className="flex flex-col items-center">
              <label htmlFor="logo" className="text-18122B font-semibold mb-2">
                Company Logo
              </label>
              <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                <input
                  type="file"
                  id="logo"
                  className="absolute opacity-0 w-full h-full cursor-pointer"
                  accept="image/*"
                />
                <img src="" alt="Logo" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="company-name" className="block text-18122B text-sm font-bold mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="company-name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-393053 focus:outline-none focus:ring-2 focus:ring-393053"
                placeholder="Enter company name"
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-18122B text-sm font-bold mb-2">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-393053 focus:outline-none focus:ring-2 focus:ring-393053"
                placeholder="Enter company address"
              />
            </div>
          </div>

          {/* Right Side - Contact Details */}
          <div className="space-y-4">
            {/* Contact Number */}
            <div>
              <label htmlFor="contact-number" className="block text-18122B text-sm font-bold mb-2">
                Contact Number
              </label>
              <input
                type="tel"
                id="contact-number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-393053 focus:outline-none focus:ring-2 focus:ring-393053"
                placeholder="Enter contact number"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-18122B text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-393053 focus:outline-none focus:ring-2 focus:ring-393053"
                placeholder="Enter company email"
              />
            </div>

            {/* Save/Cancel Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-393053 text-white rounded-lg hover:bg-18122B"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
