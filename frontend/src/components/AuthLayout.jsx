import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-purple-950 text-white flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_#8b5cf6,_transparent_25%),radial-gradient(circle_at_bottom_left,_#06b6d4,_transparent_25%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8"
      >
        <div className="flex justify-center mb-4">
          <div className="bg-purple-500/20 p-4 rounded-full">
            <ShieldCheck className="text-purple-300" size={32} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-2">{title}</h1>
        <p className="text-center text-gray-300 mb-6">{subtitle}</p>

        {children}
      </motion.div>
    </div>
  )
}

export default AuthLayout