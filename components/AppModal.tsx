// components/ui/app-modal.tsx
"use client"

import { X } from "lucide-react"
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
          <button onClick={onClose}>
            <X className="w-5 h-5 text-slate-500 hover:text-slate-700" />
          </button>
        </DialogHeader>
        <div className="mb-4">{children}</div>
        {footer && <div className="mt-6 flex justify-end space-x-3">{footer}</div>}
      </DialogContent>
    </Dialog>
  )
}
