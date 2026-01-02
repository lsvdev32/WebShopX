import { AlertCircle } from 'lucide-react'
import PropTypes from 'prop-types'

const RadioGroup = ({ label, options, value, onChange, error }) => {
  return (
    <div className='space-y-2'>
      <label className='block text-sm font-medium text-gray-700'>{label}</label>
      <div className='space-y-2'>
        {options.map((option) => (
          <label key={option.value} className='flex items-center space-x-2'>
            <input
              type='radio'
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300'
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <div className='flex items-center mt-1'>
          <AlertCircle className='h-4 w-4 text-red-500 mr-1' />
          <p className='text-xs text-red-500'>{error}</p>
        </div>
      )}
    </div>
  )
}

RadioGroup.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
}

export default RadioGroup
