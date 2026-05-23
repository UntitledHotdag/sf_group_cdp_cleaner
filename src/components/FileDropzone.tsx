import { useCallback, useState } from 'react'

type Props = {
  onFile: (file: File) => void
  disabled?: boolean
}

export function FileDropzone({ onFile, disabled }: Props) {
  const [dragOver, setDragOver] = useState(false)

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file || disabled) return
      if (!file.name.toLowerCase().endsWith('.csv')) {
        alert('Please upload a .csv file.')
        return
      }
      onFile(file)
    },
    [onFile, disabled],
  )

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        if (!disabled) setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragOver(false)
        handleFile(e.dataTransfer.files[0])
      }}
      className={`rounded-xl border-2 border-dashed p-12 text-center transition-colors ${
        dragOver
          ? 'border-indigo-400 bg-indigo-50'
          : 'border-slate-300 bg-slate-50 hover:border-slate-400'
      } ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <p className="text-lg font-medium text-slate-700">Drop your CSV here</p>
      <p className="mt-1 text-sm text-slate-500">or</p>
      <label className="mt-4 inline-block cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
        Choose file
        <input
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          disabled={disabled}
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </label>
    </div>
  )
}
