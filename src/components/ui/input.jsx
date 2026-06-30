import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      'flex h-10 w-full rounded-lg bg-surface-2 border border-white/8 px-4 py-2 text-sm text-offwhite',
      'placeholder:text-offwhite/25 outline-none',
      'focus:border-lime/40 focus:shadow-[0_0_0_2px_rgba(201,241,5,.12)] transition-all',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      className
    )}
    {...props}
  />
))
Input.displayName = 'Input'

export { Input }
