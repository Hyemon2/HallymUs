import { Search, Map, Users, GraduationCap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface HomeSectionProps {
  onSectionChange: (section: string) => void
}

export function HomeSection({ onSectionChange }: HomeSectionProps) {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full relative overflow-hidden">
      {/* Background blobs and lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-hallym-blue/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-hallym-teal/30 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-hallym-sky/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-hallym-light/25 rounded-full blur-xl animate-bounce"></div>

        <div className="absolute top-60 left-1/4 w-16 h-16 bg-gradient-to-r from-hallym-blue/30 to-hallym-teal/30 transform rotate-45 animate-spin-slow blur-sm"></div>
        <div className="absolute top-32 right-1/3 w-12 h-12 bg-gradient-to-r from-hallym-sky/40 to-hallym-light/40 transform rotate-12 animate-bounce blur-sm"></div>
        <div className="absolute bottom-60 right-1/4 w-20 h-20 bg-gradient-to-r from-hallym-teal/30 to-hallym-navy/30 transform -rotate-45 animate-pulse blur-md"></div>

        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-hallym-blue/50 to-transparent animate-pulse"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-hallym-teal/50 to-transparent animate-pulse"></div>
      </div>

      {/* Main heading and description */}
      <div className="text-center space-y-6 py-12 relative z-10">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-hallym-blue via-hallym-teal to-hallym-sky bg-clip-text text-transparent dark:text-white">
            캠퍼스 길찾기가 어려우신가요?
          </h1>
          <p className="text-xl text-muted-foreground dark:text-white max-w-2xl mx-auto">
            한림대학교 캠퍼스 내 모든 건물과 강의실을
            <br />
            쉽고 빠르게 찾을 수 있습니다
          </p>
        </div>

        {/* Search Input field */}
        <div className="relative w-full max-w-lg mx-auto mt-8 flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <Search className="absolute left-5 w-5 h-5 text-gray-400 dark:text-gray-500" />
          <Input
            type="text"
            placeholder="건물명 또는 강의실 번호를 입력하세요."
            className="flex-grow pl-14 pr-4 py-3 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-900 dark:text-white bg-transparent"
          />
        </div>
      </div>

      {/* Navigation Cards - already centered using mx-auto */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto relative z-10 mt-12">
        <Card
          className="cursor-pointer hover:scale-105 transition-all duration-300 bg-gradient-to-br from-hallym-blue/10 to-hallym-teal/10 border-hallym-blue/20 hover:border-hallym-teal/40"
          onClick={() => onSectionChange('building-search')}
        >
          <CardContent className="p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-hallym-blue to-hallym-teal rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-hallym-blue dark:text-white">건물 찾기</h3>
            <p className="text-muted-foreground dark:text-gray-300">
              건물명으로 즉시 검색
            </p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:scale-105 transition-all duration-300 bg-gradient-to-br from-hallym-teal/10 to-hallym-sky/10 border-hallym-teal/20 hover:border-hallym-sky/40"
          onClick={() => onSectionChange('classroom-search')}
        >
          <CardContent className="p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-hallym-teal to-hallym-sky rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-hallym-teal dark:text-white">강의실 찾기</h3>
            <p className="text-muted-foreground dark:text-gray-300">
              강의실 번호로 위치 확인
            </p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:scale-105 transition-all duration-300 bg-gradient-to-br from-hallym-sky/10 to-hallym-light/10 border-hallym-sky/20 hover:border-hallym-light/40"
          onClick={() => onSectionChange('campus-map')}
        >
          <CardContent className="p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-hallym-sky to-hallym-light rounded-full flex items-center justify-center">
              <Map className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-hallym-sky dark:text-white">캠퍼스 맵</h3>
            <p className="text-muted-foreground dark:text-gray-300">
              캠퍼스 전체 지도 보기
            </p>
          </CardContent>
        </Card>
      </div>

      {/* "시작하기" button below the cards, now navigating to 'building-search' */}
      <Button
        className="mt-12 w-64 h-14 bg-gradient-to-r from-hallym-blue to-hallym-teal text-white text-xl font-bold rounded-full shadow-lg hover:from-hallym-blue/90 hover:to-hallym-teal/90 transition-all duration-300 relative z-10"
        onClick={() => onSectionChange('building-search')} // Changed navigation target to 'building-search'
      >
        시작하기
      </Button>
    </div>
  )
}