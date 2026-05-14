function InputField({ icon: Icon, ...props }) {
  return (
    <div className="flex items-center bg-white/10 rounded-xl px-4 py-3 mb-4 border border-white/10 focus-within:border-purple-400 transition">
      <Icon className="text-gray-300 mr-3" size={18} />

      <input
        {...props}
        className="bg-transparent outline-none w-full text-white placeholder-gray-400"
      />
    </div>
  )
}

export default InputField