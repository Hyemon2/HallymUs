
import { KakaoMap } from '@/components/KakaoMap'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin } from 'lucide-react'

const allBuildings = [
  { id: 1, name: '공학관', description: '공학관', floorRange: '1층~4층', recent: true, lat: 37.8862, lng: 127.7394 },
  { id: 2, name: '대학본부-인문1관', description: '대학본부-인문1관', floorRange: '1층~6층', recent: false, lat: 37.8865, lng: 127.7390 },
  { id: 3, name: '의학관', description: '의학관', floorRange: '1층~6층', recent: true, lat: 37.8860, lng: 127.7400 },
  { id: 4, name: '인문2관', description: '인문2관', floorRange: '3층~5층', recent: false, lat: 37.8858, lng: 127.7385 },
  { id: 5, name: '대학본부별관', description: '대학본부별관', floorRange: '1층~4층', recent: false, lat: 37.8867, lng: 127.7388 },
  { id: 6, name: '실험동물센터', description: '실험동물센터', floorRange: '1층~2층', recent: false, lat: 37.8855, lng: 127.7405 },
  { id: 7, name: '자연과학관', description: '자연과학관', floorRange: 'B1층~6층', recent: true, lat: 37.8870, lng: 127.7398 },
  { id: 8, name: '생명과학관', description: '생명과학관', floorRange: 'B1층~6층', recent: false, lat: 37.8863, lng: 127.7403 },
  { id: 9, name: 'Campus Life Center', description: 'Campus Life Center', floorRange: 'B2층~4층', recent: true, lat: 37.8859, lng: 127.7392 },
  { id: 10, name: '사회경영1관', description: '사회경영1관', floorRange: '1층~6층', recent: false, lat: 37.8866, lng: 127.7396 },
  { id: 11, name: '일송아트홀', description: '일송아트홀', floorRange: 'B1층~3층', recent: false, lat: 37.8864, lng: 127.7401 },
  { id: 12, name: '창업보육센터', description: '창업보육센터', floorRange: '1층~4층', recent: false, lat: 37.8857, lng: 127.7389 },
  { id: 13, name: '사회경영2관', description: '사회경영2관', floorRange: '1층~6층', recent: false, lat: 37.8869, lng: 127.7397 },
  { id: 14, name: '국제관', description: '국제관', floorRange: '1층~6층', recent: false, lat: 37.8861, lng: 127.7387 },
  { id: 15, name: '국제회의관', description: '국제회의관', floorRange: '1층~2층', recent: false, lat: 37.8856, lng: 127.7393 },
  { id: 16, name: '기초교육관', description: '기초교육관', floorRange: '1층~5층', recent: false, lat: 37.8868, lng: 127.7391 },
  { id: 17, name: '일송기념도서관', description: '일송기념도서관', floorRange: 'B1층~5층', recent: false, lat: 37.8865, lng: 127.7399 },
  { id: 18, name: '한림레크리에이션센터', description: '한림레크리에이션센터', floorRange: 'B1층~2층', recent: false, lat: 37.8871, lng: 127.7395 },
  { id: 19, name: '학군단', description: '학군단', floorRange: '1층~2층', recent: false, lat: 37.8854, lng: 127.7386 },
  { id: 20, name: '실내테니스장', description: '실내테니스장', floorRange: '1층', recent: false, lat: 37.8872, lng: 127.7398 },
  { id: 21, name: '의료·바이오융합연구원', description: '의료·바이오융합연구원', floorRange: 'B1층~4층', recent: false, lat: 37.8858, lng: 127.7402 },
  { id: 22, name: '산학협력관', description: '산학협력관', floorRange: '1층~6층', recent: false, lat: 37.8864, lng: 127.7388 },
  { id: 23, name: '도헌글로벌스쿨', description: '도헌글로벌스쿨', floorRange: '1층~5층', recent: false, lat: 37.8866, lng: 127.7404 },
  { id: 24, name: '학생생활관 1관', description: '학생생활관 1관', floorRange: '1층~5층', recent: false, lat: 37.8850, lng: 127.7380 },
  { id: 25, name: '학생생활관 2관', description: '학생생활관 2관', floorRange: '1층~5층', recent: false, lat: 37.8852, lng: 127.7382 },
  { id: 26, name: '학생생활관 3관', description: '학생생활관 3관', floorRange: '1층~5층', recent: false, lat: 37.8854, lng: 127.7384 },
  { id: 27, name: '학생생활관 4관', description: '학생생활관 4관', floorRange: '1층~5층', recent: false, lat: 37.8856, lng: 127.7386 },
  { id: 28, name: '학생생활관 5관', description: '학생생활관 5관', floorRange: '1층~5층', recent: false, lat: 37.8858, lng: 127.7388 },
  { id: 29, name: '학생생활관 6관', description: '학생생활관 6관', floorRange: '1층~5층', recent: false, lat: 37.8860, lng: 127.7390 },
  { id: 30, name: '학생생활관 7관', description: '학생생활관 7관', floorRange: '1층~5층', recent: false, lat: 37.8862, lng: 127.7392 },
  { id: 31, name: '학생생활관 8관', description: '학생생활관 8관', floorRange: '1층~5층', recent: false, lat: 37.8864, lng: 127.7394 },
  { id: 32, name: '체육기자재실', description: '체육기자재실', floorRange: '1층', recent: false, lat: 37.8873, lng: 127.7400 },
  { id: 33, name: 'H Stadium (골프장, 테니스장, 농구장)', description: 'H Stadium (골프장, 테니스장, 농구장)', floorRange: '1층', recent: false, lat: 37.8875, lng: 127.7405 },
  { id: 34, name: 'ILSONG Stadium', description: 'ILSONG Stadium', floorRange: '1층', recent: false, lat: 37.8870, lng: 127.7410 },
  { id: 35, name: '씨름장', description: '씨름장', floorRange: '1층', recent: false, lat: 37.8868, lng: 127.7408 },
  { id: 36, name: '온실', description: '온실', floorRange: '1층', recent: false, lat: 37.8866, lng: 127.7406 },
  { id: 37, name: '한림대학교 춘천성심병원', description: '한림대학교 춘천성심병원', floorRange: 'B3층~12층', recent: false, lat: 37.8845, lng: 127.7375 }
]

export default function CampusMap() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-hallym-blue to-hallym-teal bg-clip-text text-transparent">
          캠퍼스 전체 지도
        </h2>
        <p className="text-muted-foreground">
          한림대학교 캠퍼스 내 모든 건물 위치를 확인하세요
        </p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-hallym-navy/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-hallym-blue">
            <MapPin className="w-5 h-5" />
            캠퍼스 지도
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="w-full h-[600px]">
            <KakaoMap 
              selectedBuilding={null} 
              buildings={allBuildings}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
