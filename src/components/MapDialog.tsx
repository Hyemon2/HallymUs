import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { KakaoMap } from '@/components/KakaoMap' // KakaoMap 컴포넌트 임포트 확인

interface Building {
  id: number
  name: string
  description: string
  floorRange: string
  recent: boolean
  lat: number
  lng: number
}

interface MapDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedBuilding: Building | null
  buildings: Building[] // MapDialog가 받는 buildings prop
}

export function MapDialog({ open, onOpenChange, selectedBuilding, buildings }: MapDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-[500px] h-[500px] p-0">
        <DialogHeader className="p-4 pb-0">
            <DialogTitle style={{ color: '#005EBD' }}>
            {selectedBuilding?.name} 위치
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 p-4 pt-0">
          <KakaoMap
            selectedBuilding={selectedBuilding}
            buildings={buildings} 
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}