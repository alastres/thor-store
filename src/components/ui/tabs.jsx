import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List ref={ref}
    className={cn('inline-flex items-center gap-1 rounded-xl bg-surface-2/80 backdrop-blur border border-white/8 p-1', className)}
    {...props} />
))
TabsList.displayName = 'TabsList'

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger ref={ref}
    className={cn(
      'rounded-lg px-4 py-1.5 text-[12px] font-semibold transition-all',
      'text-offwhite/40 hover:text-offwhite/70',
      'data-[state=active]:bg-lime data-[state=active]:text-black data-[state=active]:font-extrabold data-[state=active]:shadow-[0_0_14px_rgba(201,241,5,.3)]',
      className
    )}
    {...props} />
))
TabsTrigger.displayName = 'TabsTrigger'

const TabsContent = TabsPrimitive.Content

export { Tabs, TabsList, TabsTrigger, TabsContent }
