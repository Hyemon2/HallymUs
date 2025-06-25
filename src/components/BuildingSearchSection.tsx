
import { useState } from 'react'
import { Search, MapPin, Clock, Navigation } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapDialog } from '@/components/MapDialog'

const allBuildings = [
  { id: 1, name: '공학관', description: '공학관', floorRange: '1층~4층', recent: true, lat: 37.8862820238177, lng: 127.73570637792658 },
  { id: 2, name: '대학본부-인문1관', description: '대학본부-인문1관', floorRange: '1층~6층', recent: false, lat: 37.88651056600519, lng: 127.7380560576684 },
  { id: 3, name: '의학관', description: '의학관', floorRange: '1층~6층', recent: true, lat: 37.885893807864896, lng: 127.73727691230881 },
  { id: 4, name: '인문2관', description: '인문2관', floorRange: '3층~5층', recent: false, lat: 37.88632111698226, lng: 127.73737779725585 },
  { id: 5, name: '대학본부별관', description: '대학본부별관', floorRange: '1층~4층', recent: false, lat: 37.88667294925645, lng: 127.73873973492844 },
  { id: 6, name: '실험동물센터', description: '실험동물센터', floorRange: '1층~2층', recent: false, lat: 37.886297240424454, lng: 127.73687454508551 },
  { id: 7, name: '자연과학관', description: '자연과학관', floorRange: 'B1층~6층', recent: true, lat: 37.88579927723485, lng: 127.73690652687773 },
  { id: 8, name: '생명과학관', description: '생명과학관', floorRange: 'B1층~6층', recent: false, lat: 37.88522924269095, lng: 127.73585788838098 },
  { id: 9, name: 'Campus Life Center', description: 'Campus Life Center', floorRange: 'B2층~4층', recent: true, lat: 37.886533504769766, lng: 127.74014223838915 },
  { id: 10, name: '사회경영1관', description: '사회경영1관', floorRange: '1층~6층', recent: false, lat: 37.88838250813627, lng: 127.7383731503975 },
  { id: 11, name: '일송아트홀', description: '일송아트홀', floorRange: 'B1층~3층', recent: false, lat: 37.8869387560792, lng: 127.73693777658669 },
  { id: 12, name: '창업보육센터', description: '창업보육센터', floorRange: '1층~4층', recent: false, lat: 37.884937364914286, lng: 127.7357100501589 },
  { id: 13, name: '사회경영2관', description: '사회경영2관', floorRange: '1층~6층', recent: false, lat: 37.8878014815578, lng: 127.73836166403493 },
  { id: 14, name: '국제관', description: '국제관', floorRange: '1층~6층', recent: false, lat: 37.88674442217429, lng: 127.74098555326404 },
  { id: 15, name: '국제회의관', description: '국제회의관', floorRange: '1층~2층', recent: false, lat: 37.88403127872424, lng: 127.73833254233234 },
  { id: 16, name: '기초교육관', description: '기초교육관', floorRange: '1층~5층', recent: false, lat: 37.88839020212821, lng: 127.73786451502583 },
  { id: 17, name: '일송기념도서관', description: '일송기념도서관', floorRange: '1층~5층', recent: false, lat: 37.88495278783055, lng: 127.73720500922705 },
  { id: 18, name: '한림레크리에이션센터', description: '한림레크리에이션센터', floorRange: '1층~2층', recent: false, lat: 37.884511106141694, lng: 127.73867835149707 },
  { id: 19, name: '학군단', description: '학군단', floorRange: '1층~2층', recent: false, lat: 37.888332774130994, lng: 127.7391200906033 },
  { id: 20, name: '실내테니스장', description: '실내테니스장', floorRange: '1층', recent: false, lat: 37.88743498217984, lng: 127.74110642335901 },
  { id: 21, name: '의료·바이오융합연구원', description: '의료·바이오융합연구원', floorRange: '1층~6층', recent: false, lat: 37.885906795825, lng: 127.73772059858824 },
  { id: 22, name: '산학협력관', description: '산학협력관', floorRange: '1층~6층', recent: false, lat: 37.887197302670735, lng: 127.73809133184864 },
  { id: 23, name: '도헌글로벌스쿨', description: '도헌글로벌스쿨', floorRange: '1층~2층', recent: false, lat: 37.88455895407163, lng: 127.73643379130615 },
  { id: 24, name: '학생생활관 1관', description: '학생생활관 1관', floorRange: 'B1층~9층', recent: false, lat: 37.88556792774508, lng: 127.74075209841767 },
  { id: 25, name: '학생생활관 2관', description: '학생생활관 2관', floorRange: '1층~5층', recent: false, lat: 37.885897175004686, lng: 127.74068719189461 },
  { id: 26, name: '학생생활관 3관', description: '학생생활관 3관', floorRange: '1층~5층', recent: false, lat: 37.88588483938837, lng: 127.74121565631256 },
  { id: 27, name: '학생생활관 4관', description: '학생생활관 4관', floorRange: '1층~5층', recent: false, lat: 37.88626570975081, lng: 127.74082161032595 },
  { id: 28, name: '학생생활관 5관', description: '학생생활관 5관', floorRange: '1층~5층', recent: false, lat: 37.88632980439525, lng: 127.74137357876296 },
  { id: 29, name: '학생생활관 6관', description: '학생생활관 6관', floorRange: '1층~5층', recent: false, lat: 37.88612413652811, lng: 127.74184326870662 },
  { id: 30, name: '학생생활관 7관', description: '학생생활관 7관', floorRange: '1층~5층', recent: false, lat: 37.88663023590351, lng: 127.74159257544298 },
  { id: 31, name: '학생생활관 8관', description: '학생생활관 8관', floorRange: '1층~15층', recent: false, lat: 37.88719514191081, lng: 127.74130268152653 },
  { id: 32, name: '체육기자재실', description: '체육기자재실', floorRange: '1층', recent: false, lat: 37.88755632922546, lng: 127.73938231263963 },
  { id: 33, name: 'H Stadium (골프장, 테니스장, 농구장)', description: 'H Stadium (골프장, 테니스장, 농구장)', floorRange: '1층', recent: false, lat: 37.88782500135036, lng: 127.73676472525447 },
  { id: 34, name: 'ILSONG Stadium', description: 'ILSONG Stadium', floorRange: '1층', recent: false, lat: 37.88763462232252, lng: 127.73982643796403 },
  { id: 35, name: '씨름장', description: '씨름장', floorRange: '1층', recent: false, lat: 37.88757420750407, lng: 127.74083756263792 },
  { id: 36, name: '온실', description: '온실', floorRange: '1층', recent: false, lat: 37.88665402441883, lng: 127.73564755750229 },
];

export function BuildingSearchSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBuilding, setSelectedBuilding] = useState<typeof allBuildings[0] | null>(null)
  const [mapOpen, setMapOpen] = useState(false)

  const filteredBuildings = searchTerm === ''
    ? []
    : allBuildings.filter(building => {
      const nameMatch = building.name.toLowerCase().includes(searchTerm.toLowerCase());
      const idMatch = String(building.id).includes(searchTerm);

      return nameMatch || idMatch;
    });

  const recentBuildings = allBuildings.filter(building => building.recent)

  const handleLocationView = (building: typeof allBuildings[0]) => {
    setSelectedBuilding(building)
    setMapOpen(true)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-hallym-blue to-hallym-teal bg-clip-text text-transparent">
          건물 찾기
        </h2>
        <p className="text-muted-foreground">
          원하는 건물을 빠르게 검색하고 위치를 확인하세요
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="건물명 또는 건물 번호로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 py-6 text-lg bg-background/50 backdrop-blur-sm border-hallym-blue/30 focus:border-hallym-teal transition-all duration-500 ease-out"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border-hallym-navy/20 transition-all duration-500 ease-out hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-hallym-blue">
                <Search className="w-5 h-5" />
                검색 결과 ({filteredBuildings.length}개)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
              {searchTerm === '' ? (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">검색어를 입력해주세요.</p>
                  <p className="text-sm text-muted-foreground mt-2">건물명 또는 건물 번호로 검색할 수 있습니다.</p>
                </div>
              ) : filteredBuildings.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">검색 결과가 없습니다.</p>
                  <p className="text-sm text-muted-foreground mt-2">다른 키워드로 검색해보세요.</p>
                </div>
              ) : (
                filteredBuildings.map((building) => (
                  <div
                    key={building.id}
                    className="p-4 bg-background/50 rounded-lg border border-border/50 hover:bg-hallym-blue/5 hover:border-hallym-blue/40
                     transition-all duration-500 ease-out cursor-pointer transform hover:scale-[1.02] hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg text-foreground">{building.name}</h3>
                          {building.recent && (
                            <Badge variant="outline" className="text-hallym-teal border-hallym-teal">
                              최근 방문
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {building.floorRange}
                          </div>
                          <div className="flex items-center gap-1">
                            <Navigation className="w-4 h-4" />
                            건물 번호: {building.id}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Button
                          size="sm"
                          onClick={() => handleLocationView(building)}
                          className="bg-gradient-to-r from-hallym-blue to-hallym-teal hover:from-hallym-teal hover:to-hallym-sky 
                          transition-all duration-500 ease-out transform hover:scale-105"
                        >
                          위치 보기
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border-hallym-navy/20 transition-all duration-500 ease-out hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-hallym-teal">
                <Clock className="w-5 h-5" />
                최근 방문한 건물
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentBuildings.map((building) => (
                <div
                  key={building.id}
                  className="p-3 bg-background/50 rounded-lg border border-border/50 hover:bg-hallym-teal/5 
                  hover:border-hallym-teal/40 transition-all duration-500 ease-out cursor-pointer transform hover:scale-[1.02]"
                  onClick={() => handleLocationView(building)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-foreground">{building.name}</div>
                      <div className="text-sm text-muted-foreground">{building.floorRange}</div>
                    </div>
                    <Navigation className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

      </div>
      <MapDialog
        open={mapOpen}
        onOpenChange={setMapOpen}
        selectedBuilding={selectedBuilding}
        buildings={allBuildings}
      />
    </div>
  )
}
