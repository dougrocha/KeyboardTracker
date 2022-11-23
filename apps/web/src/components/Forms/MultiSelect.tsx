interface MultiSelectProps {
  label: string
  children: React.ReactNode
}

const MultiSelect = ({ label, children }: MultiSelectProps) => {
  return (
    <fieldset className="flex h-full flex-col px-4">
      <legend className="block text-sm font-medium text-gray-700">
        {label}
      </legend>

      <div className="space-y-4">{children}</div>
    </fieldset>
  )
}

export default MultiSelect
