interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100)

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-muted-ink mb-2">
        <span>Запитання {current} з {total}</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full bg-line rounded-full h-2">
        <div
          className="bg-clay h-2 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
