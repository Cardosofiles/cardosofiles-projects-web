'use client'

import { Loader2, X } from 'lucide-react'
import type { JSX } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface DeleteModalProps {
  isOpen: boolean
  isLoading: boolean
  onClose: () => void
  onConfirm: () => void
}

const DeleteModal = ({ isOpen, isLoading, onClose, onConfirm }: DeleteModalProps): JSX.Element => {
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="w-[90vw] max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
        </DialogHeader>
        <p className="py-4">
          Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.
        </p>
        <DialogFooter>
          <div className="flex w-full gap-3 md:w-auto">
            <Button variant="outline" onClick={onClose} className="flex-1 md:flex-none">
              <X className="h-4 w-4" />
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 md:flex-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Excluindo...
                </>
              ) : (
                'Excluir'
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { DeleteModal }
