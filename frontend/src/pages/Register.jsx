import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import InputField from '../components/InputField'

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ username: '', email: '', password: '' })
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
      await axios.post('/api/auth/register', formData)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Create Account ✨" subtitle="Securely join your cyber vault">
      <form onSubmit={handleSubmit}>
        <InputField icon={User} name="username" placeholder="Username" onChange={handleChange} />
        <InputField icon={Mail} name="email" placeholder="Email" onChange={handleChange} />
        <InputField icon={Lock} type="password" name="password" placeholder="Password" onChange={handleChange} />

        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-xl font-semibold hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <p className="text-center mt-4 text-gray-300">
        Already have an account? <Link to="/" className="text-purple-300">Login</Link>
      </p>
    </AuthLayout>
  )
}

export default Register
