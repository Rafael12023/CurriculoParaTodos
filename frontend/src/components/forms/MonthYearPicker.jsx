function MonthYearPicker({ value, onChange, disabled = false, label, required = false }) {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 50 }, (_, i) => currentYear - 40 + i)
  
  const months = [
    { value: '01', label: 'Janeiro' },
    { value: '02', label: 'Fevereiro' },
    { value: '03', label: 'Março' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Maio' },
    { value: '06', label: 'Junho' },
    { value: '07', label: 'Julho' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Setembro' },
    { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' },
    { value: '12', label: 'Dezembro' },
  ]

  const [year, month] = value ? value.split('-') : ['', '']

  const handleMonthChange = (newMonth) => {
    if (year) {
      onChange(`${year}-${newMonth}`)
    } else {
      onChange(`${currentYear}-${newMonth}`)
    }
  }

  const handleYearChange = (newYear) => {
    if (month) {
      onChange(`${newYear}-${month}`)
    } else {
      onChange(`${newYear}-01`)
    }
  }

  return (
    <div>
      {label && (
        <label className="input-label">
          {label} {required && '*'}
        </label>
      )}
      <div className="flex gap-2">
        <select
          className="input-field flex-1"
          value={month}
          onChange={(e) => handleMonthChange(e.target.value)}
          disabled={disabled}
        >
          <option value="">Mês</option>
          {months.map(m => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
        <select
          className="input-field w-24"
          value={year}
          onChange={(e) => handleYearChange(e.target.value)}
          disabled={disabled}
        >
          <option value="">Ano</option>
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default MonthYearPicker
