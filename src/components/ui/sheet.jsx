import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

const Sheet = DialogPrimitive.Root
const SheetTrigger = DialogPrimitive.Trigger
const SheetClose = DialogPrimitive.Close

const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref}
    className={cn('fixed inset-0 z-50 bg-black/55 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 duration-200', className)}
    {...props} />
))
SheetOverlay.displayName = 'SheetOverlay'

const SheetContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <SheetOverlay />
    <DialogPrimitive.Content ref={ref}
      className={cn(
        'fixed inset-y-0 right-0 z-50 w-72 bg-surface-1/95 backdrop-blur-2xl border-l border-white/8',
        'shadow-[-20px_0_60px_rgba(0,0,0,.7)]',
        'data-[state=open]:animate-slide-in-r data-[state=closed]:animate-slide-out-r',
        className
      )}
      {...props}
    >
      {children}
      <SheetClose className="absolute right-4 top-4 p-1.5 rounded-lg text-offwhite/35 hover:text-offwhite hover:bg-white/8 transition-colors">
        <X size={15} />
      </SheetClose>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))
SheetContent.displayName = 'SheetContent'

const SheetHeader = ({ className, ...props }) => (
  <div className={cn('px-6 pt-6 pb-4 border-b border-white/8', className)} {...props} />
)

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetClose }
