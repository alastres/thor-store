import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/65 backdrop-blur-sm',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
      'duration-200',
      className
    )}
    {...props} />
))
DialogOverlay.displayName = 'DialogOverlay'

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogOverlay />
    <DialogPrimitive.Content ref={ref}
      className={cn(
        'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl',
        'glass rounded-2xl p-6 shadow-[0_24px_80px_rgba(0,0,0,.8)]',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'duration-200',
        className
      )}
      {...props}
    >
      {children}
      <DialogClose className="absolute right-4 top-4 p-1.5 rounded-lg text-offwhite/35 hover:text-offwhite hover:bg-white/8 transition-colors">
        <X size={15} />
      </DialogClose>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))
DialogContent.displayName = 'DialogContent'

const DialogHeader = ({ className, ...props }) => <div className={cn('mb-5', className)} {...props} />
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn('text-lg font-black tracking-tight', className)} {...props} />
))
DialogTitle.displayName = 'DialogTitle'

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose }
