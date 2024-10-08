"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group fixed z-50"
      position="bottom-center" // You can change the position here
      expand={false} // Or any other Sonner props you want to customize
      richColors // Enable rich colors if you want
      toastOptions={{
        duration: 5000, // Set default duration for all toasts
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg ",
          description: "group-[.toast]:text-muted-foreground ",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          // Add more custom classes for different parts of the toast
          title: "group-[.toast]:font-semibold",
          loader: "group-[.toast]:text-muted-foreground",
          closeButton: "group-[.toast]:text-foreground/50 hover:group-[.toast]:text-foreground",
        },
        // You can also add custom styles
        style: {
          // Add any custom styles herez=
          
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
