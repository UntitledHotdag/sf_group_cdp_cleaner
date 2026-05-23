type Step = 'upload' | 'map' | 'preview' | 'export'

const STEPS: { id: Step; label: string }[] = [
  { id: 'upload', label: 'Upload' },
  { id: 'map', label: 'Map' },
  { id: 'preview', label: 'Preview' },
  { id: 'export', label: 'Export' },
]

const stepOrder: Step[] = ['upload', 'map', 'preview', 'export']

type Props = {
  current: Step
}

export function StepProgress({ current }: Props) {
  const currentIndex = stepOrder.indexOf(current)

  return (
    <nav aria-label="Progress" className="flex items-center gap-2 text-sm">
      {STEPS.map((step, i) => {
        const done = i < currentIndex
        const active = step.id === current
        return (
          <div key={step.id} className="flex items-center gap-2">
            {i > 0 && <span className="text-slate-300">→</span>}
            <span
              className={
                active
                  ? 'font-semibold text-indigo-600'
                  : done
                    ? 'text-slate-600'
                    : 'text-slate-400'
              }
            >
              {step.label}
            </span>
          </div>
        )
      })}
    </nav>
  )
}

export type { Step }
