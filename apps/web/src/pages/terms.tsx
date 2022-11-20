import React from "react"

import MainViewLayout from "../layouts/MainViewLayout"

const TermsAndConditions = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-medium">Terms and Conditions</p>
        <p className="text-sm">This is help text.</p>
      </div>
    </div>
  )
}

TermsAndConditions.getLayout = (page: React.ReactNode) => (
  <MainViewLayout>{page}</MainViewLayout>
)

export default TermsAndConditions
