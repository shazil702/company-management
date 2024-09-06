const Login = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <h1 className="text-3xl font-semibold text-center text-393053 mb-6">Login</h1>

        {/* Form */}
        <form>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-18122B text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-393053 focus:outline-none focus:ring-2 focus:ring-393053 focus:border-transparent"
              id="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-18122B text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-393053 focus:outline-none focus:ring-2 focus:ring-393053 focus:border-transparent"
              id="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          {/* Sign In Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-393053 text-white py-2 rounded-lg hover:bg-18122B transition duration-300"
            >
              Sign In
            </button>
          </div>

          {/* Forgotten Password Link */}
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
