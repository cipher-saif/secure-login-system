import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import InputField from '../components/InputField'

function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post('/api/auth/login', formData)
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Welcome Back 💜" subtitle="Login to your secure dashboard">
      <form onSubmit={handleSubmit}>
        <InputField icon={Mail} name="email" placeholder="Email" onChange={handleChange} />
        <InputField icon={Lock} type="password" name="password" placeholder="Password" onChange={handleChange} />

        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 py-3 rounded-xl font-semibold hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="text-center mt-4 text-gray-300">
        New here? <Link to="/register" className="text-cyan-300">Create account</Link>
      </p>
    </AuthLayout>
  )
}

export default Login
