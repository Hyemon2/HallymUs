import { useState } from 'react'
import { X, ZoomIn, ZoomOut, RotateCcw, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface FloorPlanModalProps {
  isOpen: boolean
  onClose: () => void
  buildingCode: string
  buildingName: string
  floor: string
}

const floorPlanImages: Record<string, Record<string, string>> = {
  '1': {
    '1층': './floormap/공학관 1층-1.png', // public 폴더 기준 루트 경로로 수정
    '2층': './floormap/공학관 2층-1.png', // 이전 'lovable-uploads' 경로는 예시로 사용되었던 것 같습니다.
    '3층': './floormap/공학관 3층-1.png', // 파일명에 맞춰 수정
    '4층': './floormap/공학관 4층-1.png', // 파일명에 맞춰 수정
  }
}

export default function FloorPlanModal({ isOpen, onClose, buildingCode, buildingName, floor }: FloorPlanModalProps) {
  const [zoomLevel, setZoomLevel] = useState(1.0)
  const [rotation, setRotation] = useState(0)

  if (!isOpen) return null

  const imageSrc = floorPlanImages[buildingCode]?.[floor]

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 3))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.3))
  }

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360)
  }

  const handleReset = () => {
    setZoomLevel(1.0)
    setRotation(0)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-7xl max-h-[95vh] m-4 bg-card/95 backdrop-blur-sm border-hallym-navy/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-hallym-blue flex items-center gap-2">
            {buildingName} - {floor} 평면도
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleZoomOut}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleZoomIn}>
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleRotate}>
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleReset}>
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="relative w-full h-[80vh] bg-gray-50 rounded-lg overflow-auto">
            {imageSrc ? (
              <div 
                className="relative"
                style={{
                  width: `${800 * zoomLevel}px`,
                  height: `${600 * zoomLevel}px`,
                  minWidth: '100%',
                  minHeight: '100%'
                }}
              >
                <img
                  src={imageSrc}
                  alt={`${buildingName} ${floor} 평면도`}
                  className="absolute top-0 left-0 transition-all duration-300 ease-out"
                  style={{ 
                    transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                    transformOrigin: 'top left',
                    width: '800px',
                    height: '600px'
                  }}
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-hallym-blue/20 rounded-full flex items-center justify-center mx-auto">
                    <Building className="w-8 h-8 text-hallym-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-hallym-blue mb-2">
                      평면도 준비 중
                    </h3>
                    <p className="text-muted-foreground">
                      {buildingName} {floor} 평면도가 곧 제공될 예정입니다.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground">
            <div>
              확대/축소: {Math.round(zoomLevel * 100)}% | 회전: {rotation}°
            </div>
            <div className="flex items-center gap-4">
              <span>마우스 휠로 확대/축소 가능</span>
              <span>드래그로 이동 가능</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
