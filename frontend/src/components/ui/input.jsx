import { cn } from '@/lib/utils'
import { AlertCircle, Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'

const Input = React.forwardRef(({ className, type, error, icon: Icon, label, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type

  return (
    <div className='relative'>
      {label && (
        <label className='block text-sm font-medium text-foreground mb-1.5'>
          {label}
        </label>
      )}
      <div className='relative'>
        {Icon && (
          <Icon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5' />
        )}
        <input
          type={inputType}
          className={cn(
            'flex h-10 w-full rounded-sm border bg-background px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all',
            Icon ? 'pl-10' : 'pl-3',
            error ? 'border-destructive focus-visible:ring-destructive' : 'border-input focus-visible:border-primary',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
            <AlertCircle className='h-5 w-5 text-destructive' />
          </div>
        )}
        {isPassword && (
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none transition-colors'
            aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
          >
            {showPassword
              ? (
                <EyeOff className='h-4 w-4' />
                )
              : (
                <Eye className='h-4 w-4' />
                )}
          </button>
        )}
      </div>
      {error && (
        <p className='mt-1.5 text-xs text-destructive'>{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export { Input }
