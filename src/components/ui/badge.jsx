import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold',
  {
    variants: {
      variant: {
        lime:  'bg-lime/10 border border-lime/25 text-lime',
        pink:  'bg-gradient-to-r from-[#ff3d95] to-[#FA2588] text-white',
        ghost: 'bg-white/6 border border-white/12 text-offwhite/55',
        new:   'bg-lime text-black',
      },
    },
    defaultVariants: { variant: 'ghost' },
  }
)

export function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
