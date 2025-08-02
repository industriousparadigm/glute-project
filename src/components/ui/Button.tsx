import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  children,
  ...props
}) => {
  // Base classes following UX brief: inline-flex items-center gap-2 px-6 py-3 bg-[brand.orange] text-[white] rounded-[8px] shadow transition hover:scale-[1.02] focus:ring
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-display font-semibold uppercase tracking-wider transition-all duration-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 hover:scale-[1.02] active:scale-[0.98]'
  
  // Single primary style only - solid orange with white text
  const colorClasses = 'bg-[#FF5E1B] text-white hover:bg-[#E54515] active:bg-[#CC3D12]'
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed hover:scale-100 active:scale-100' : 'cursor-pointer'
  const widthClasses = fullWidth ? 'w-full' : ''
  
  return (
    <button
      className={`${baseClasses} ${colorClasses} ${sizeClasses[size]} ${disabledClasses} ${widthClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}