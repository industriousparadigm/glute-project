import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'font-display font-semibold uppercase tracking-wider transition-all duration-300 rounded-none focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2'
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90 active:bg-primary/80',
    secondary: 'bg-ink text-white hover:bg-ink/90 active:bg-ink/80',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
  }
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  const widthClasses = fullWidth ? 'w-full' : ''
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${widthClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}