import * as React from 'react'
import { cn } from '@/lib/utils'

// Glass card — glassmorphic by default
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref}
    className={cn('glass transition-all duration-200 hover:-translate-y-1 hover:border-lime/20 hover:shadow-[0_8px_32px_rgba(201,241,5,.06)]', className)}
    {...props} />
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col gap-1.5 p-5', className)} {...props} />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn('font-bold leading-snug', className)} {...props} />
))
CardTitle.displayName = 'CardTitle'

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-5 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center p-5 pt-0', className)} {...props} />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardContent, CardFooter }
