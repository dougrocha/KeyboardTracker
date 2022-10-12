import { useTheme } from "next-themes"
import React, { useEffect, useState } from "react"
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
    if (theme === "system") setTheme("light")
  }, [theme, setTheme])

  if (!mounted) {
    return null
  }

  console.log(theme)

  return (
    <div
      className="h-6 w-6 transition-all"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark")
      }}
    >
      {theme === "dark" ? (
        <SunIcon className="h-full w-full" />
      ) : (
        <MoonIcon className="h-full w-full" />
      )}
    </div>
  )
}

export default ThemeToggle
