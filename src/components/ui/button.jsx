import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-bold text-sm transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none select-none',
  {
    variants: {
      variant: {
        lime:  [
          'text-black border-0',
          'bg-[length:200%_auto] bg-gradient-to-r from-[#d4ff12] via-[#C9F105] to-[#d4ff12]',
          'shadow-[0_0_18px_rgba(201,241,5,.28)]',
          'hover:shadow-[0_0_28px_rgba(201,241,5,.5)] hover:scale-[1.03]',
        ],
        pink:  'bg-gradient-to-r from-[#ff3d95] to-[#FA2588] text-white shadow-[0_0_12px_rgba(250,37,136,.2)] hover:shadow-[0_0_22px_rgba(250,37,136,.4)] hover:scale-[1.03]',
        ghost: 'bg-white/5 border border-white/12 text-offwhite/65 hover:bg-white/10 hover:text-offwhite/90',
        glass: 'glass text-offwhite/70 hover:bg-white/10 hover:text-offwhite/90',
        link:  'text-lime underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        sm:   'h-8  px-3.5 text-xs',
        md:   'h-10 px-5  text-sm',
        lg:   'h-12 px-7  text-base',
        icon: 'h-9  w-9',
      },
    },
    defaultVariants: { variant: 'lime', size: 'md' },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
})
Button.displayName = 'Button'

export { Button, buttonVariants }
