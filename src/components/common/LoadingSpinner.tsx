interface LoadingSpinnerProps {
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function LoadingSpinner({ label = 'Optimizing routing...', size = 'md' }: LoadingSpinnerProps) {
  const spinnerSize = size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-12 h-12' : 'w-8 h-8'

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[200px]">
      <div className={`${spinnerSize} border-3 border-emerald-200 border-t-emerald-600 rounded-full animate-spin`} />
      {label && <p className="mt-3 text-xs font-semibold text-slate-500 animate-pulse">{label}</p>}
    </div>
  )
}
