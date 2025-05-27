// components/ui/app-modal.tsx
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Props = {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

export default function AppModal({ isOpen, onClose, title, children, footer, className }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-lg w-full ${className || ""}`}>
        <DialogHeader className="flex justify-between items-center mb-4">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="mb-4">{children}</div>
        {footer && <div className="mt-6 flex justify-end space-x-3">{footer}</div>}
      </DialogContent>
    </Dialog>
  )
}
