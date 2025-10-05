import React, { ReactNode } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  className = '',
  children,
  ...props
}) => {
  // Base classes - NO rounded corners, gradient with glow
  const baseClasses = 'group relative inline-flex items-center justify-center gap-3 font-display uppercase tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-orange/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  // Variant styles
  const variantClasses = {
    primary: 'cta-primary-light text-white',
    outline: 'border border-accent-orange/30 text-accent-orange hover:bg-accent-orange/10 transition-all duration-300'
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base md:text-lg',
    lg: 'px-8 py-4 text-lg md:text-xl',
  }

  const widthClasses = fullWidth ? 'w-full' : ''

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="relative z-10 group-hover:rotate-12 transition-transform duration-300">
          {icon}
        </span>
      )}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="relative z-10 group-hover:rotate-12 transition-transform duration-300">
          {icon}
        </span>
      )}
    </button>
  )
}