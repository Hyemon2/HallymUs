
import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { Sun, Moon } from "lucide-react"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    themeSwitch?: boolean
    checked?: boolean
  }
>(({ className, themeSwitch = false, checked = false, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      themeSwitch 
        ? cn(
            "peer inline-flex h-10 w-20 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
            checked 
              ? "bg-gradient-to-r from-hallym-navy to-hallym-blue" 
              : "bg-gradient-to-r from-hallym-sky to-hallym-teal"
          )
        : "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        themeSwitch
          ? cn(
              "pointer-events-none flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-lg ring-0 transition-all duration-500 ease-out",
              checked ? "translate-x-10" : "translate-x-1"
            )
          : "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    >
      {themeSwitch && (
        checked ? (
          <Moon className="h-4 w-4 text-hallym-navy" />
        ) : (
          <Sun className="h-4 w-4 text-hallym-teal" />
        )
      )}
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
