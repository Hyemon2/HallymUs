import { useState } from 'react'
import { MapPin, Map as MapIcon, Plus, Minus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const buildings = [
  { id: 1, name: '공학관' },
  { id: 2, name: '대학본부-인문1관' },
  { id: 3, name: '의학관' },
  { id: 4, name: '인문2관' },
  { id: 5, name: '대학본부별관' },
  { id: 6, name: '실험동물센터' },
  { id: 7, name: '자연과학관' },
  { id: 8, name: '생명과학관' },
  { id: 9, name: 'Campus Life Center' },
  { id: 10, name: '사회·경영1관' },
  { id: 11, name: '일송아트홀' },
  { id: 12, name: '창업보육센터' },
  { id: 13, name: '사회·경영2관' },
  { id: 14, name: '국제관' },
  { id: 15, name: '국제학위관' },
  { id: 16, name: '기초교육관' },
  { id: 17, name: '일송기념도서관' },
  { id: 18, name: '한림메디케이션센터' },
  { id: 19, name: '학군단' },
  { id: 20, name: '실내테니스장' },
  { id: 21, name: '의료·바이오융합연구원' },
  { id: 22, name: '산학협력관' },
  { id: 23, name: '도헌글로벌스쿨' },
  { id: 24, name: '학생생활관 1관' },
  { id: 25, name: '학생생활관 2관' },
  { id: 26, name: '학생생활관 3관' },
  { id: 27, name: '학생생활관 4관' },
  { id: 28, name: '학생생활관 5관' },
  { id: 29, name: '학생생활관 6관' },
  { id: 30, name: '학생생활관 7관' },
  { id: 31, name: '학생생활관 8관' },
  { id: 32, name: '체육 기자재실' },
  { id: 33, name: 'H Stadium (골프장, 테니스장, 농구장)' },
  { id: 34, name: 'ILSONG Stadium' },
  { id: 35, name: '씨름장' },
  { id: 36, name: '온실' }
]

export function CampusMapSection() {
  const [selectedBuilding, setSelectedBuilding] = useState<typeof buildings[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [zoomLevel, setZoomLevel] = useState(1)

  const filteredBuildings = buildings.filter(building =>
    building.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 2))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5))
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-left space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-hallym-blue to-hallym-teal bg-clip-text text-transparent dark:text-white flex items-center gap-2">
          <MapIcon className="w-8 h-8 text-hallym-blue dark:text-white" />
          한림대학교 캠퍼스 맵
        </h2>
        <p className="text-muted-foreground dark:text-white">
          캠퍼스 내 건물 위치를 확인하고 길찾기를 이용하세요
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-auto md:h-auto bg-card/50 backdrop-blur-sm border-hallym-navy/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-hallym-blue dark:text-white relative">
                <MapPin className="w-5 h-5" />
                캠퍼스 맵
                <div className="absolute top-0 right-0 z-10 flex gap-2">
                  <Button variant="outline" size="icon" onClick={handleZoomIn}>
                    <Plus className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleZoomOut}>
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full p-4 relative">
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <img
                  src="./schoolmap.png"
                  alt="한림대학교 캠퍼스 맵"
                  className="w-full h-full object-contain"
                  style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border-hallym-navy/20">
            <CardHeader>
              <CardTitle className="text-hallym-blue dark:text-white">건물 목록</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
              {filteredBuildings.map((building) => (
                <div
                  key={building.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-hallym-blue/10 ${
                    selectedBuilding?.id === building.id
                      ? 'bg-gradient-to-r from-hallym-blue/20 to-hallym-teal/20 border border-hallym-blue/40'
                      : 'bg-background/50 border border-border/50'
                  }`}
                  onClick={() => setSelectedBuilding(building)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-hallym-blue text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {building.id}
                      </div>
                      <div className="font-medium text-foreground dark:text-white">{building.name}</div>
                    </div>
                    <MapPin className="w-4 h-4 text-muted-foreground dark:text-white" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}