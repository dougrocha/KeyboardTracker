const ToolTip = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="invisible absolute right-0 z-10 inline-block rounded-md bg-sky-500 py-2 px-3 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity delay-1000 duration-300 group-hover:visible group-hover:opacity-100">
      {children}
    </span>
  )
}

export default ToolTip
