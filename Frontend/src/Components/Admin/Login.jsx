import React, { useState } from 'react';
import { useAppContext } from '../../../Context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {
  const { axios, setToken, navigate } = useAppContext();

  // Set default values for email and password
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('12345');
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post('/api/admin/login', { email, password });

      if (data.success) {
        // Store token
        localStorage.setItem('token', data.token);
        setToken(data.token);

        // Set axios header for future requests
        axios.defaults.headers.common['token'] = data.token;

        toast.success('Logged in successfully!');
        navigate('/admin'); // redirect to admin dashboard
      } else {
        toast.error(data.message || 'Invalid credentials');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg bg-white">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">
            <span className="text-primary">Admin</span> Login
          </h1>
          <p className="font-light text-gray-500">
            Enter your credentials to access the admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="text-gray-600">
          <div className="flex flex-col mb-4">
            <label className="text-sm mb-1 font-medium">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              required
              placeholder="Enter your email"
              className="border-b-2 border-gray-300 p-2 outline-none focus:border-primary transition"
            />
          </div>

          <div className="flex flex-col mb-6">
            <label className="text-sm mb-1 font-medium">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              required
              placeholder="Enter your password"
              className="border-b-2 border-gray-300 p-2 outline-none focus:border-primary transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-primary py-3 font-medium text-white rounded cursor-pointer hover:bg-primary/90 transition ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
