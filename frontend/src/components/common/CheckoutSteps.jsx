/**
 * Este componente CheckoutSteps muestra los pasos del proceso de compra.
 * Recibe un array de pasos y el paso actual como props.
 */

import PropTypes from 'prop-types'

export default function CheckoutSteps ({ steps, currentStep }) {
  return (
    <div className='flex flex-wrap justify-between items-center text-muted-foreground mb-5'>
      {steps.map((step, index) => (
        <div
          key={step}
          className={`w-full sm:w-1/3 py-2 border-b-2 flex justify-center items-center 
        ${
          index <= currentStep - 1
            ? 'border-yellow-500 text-foreground font-semibold'
            : 'border-border'
        }
        ${index !== currentStep - 1 ? 'hidden sm:flex' : 'flex'}`}
        >
          {step}
        </div>
      ))}
    </div>

  )
}

CheckoutSteps.prototype = {
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentStep: PropTypes.number.isRequired
}
