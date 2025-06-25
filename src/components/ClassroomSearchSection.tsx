import { useState, useEffect } from 'react';
import { Search, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FloorPlanModal from './FloorPlanModal';

export function ClassroomSearchSection() {
  const [classroomSearch, setClassroomSearch] = useState('');
  const [selectedBuildingCode, setSelectedBuildingCode] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [searchMode, setSearchMode] = useState<'classroom' | 'building'>('classroom');
  const [availableFloors, setAvailableFloors] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buildings = [
    { code: '1', name: '공학관', floorRange: '1층~4층' },
    { code: '2', name: '대학본부-인문1관', floorRange: '1층~6층' },
    { code: '3', name: '의학관', floorRange: '1층~6층' },
    { code: '4', name: '인문2관', floorRange: '3층~5층' },
    { code: '5', name: '대학본부별관', floorRange: '1층~4층' },
    { code: '7', name: '자연과학관', floorRange: 'B1층~6층' },
    { code: '8', name: '생명과학관', floorRange: 'B1층~6층' },
    { code: '9', name: 'Campus Life Center', floorRange: 'B2층~4층' },
    { code: '10', name: '사회경영1관', floorRange: '1층~6층' },
    { code: '13', name: '사회경영2관', floorRange: '1층~6층' },
    { code: '14', name: '국제관', floorRange: '1층~6층' },
    { code: '16', name: '기초교육관', floorRange: '1층~5층' },
  ];

  useEffect(() => {
    if (selectedBuildingCode) {
      const building = buildings.find(b => b.code === selectedBuildingCode);
      if (building) {
        const floorsArray: string[] = [];
        const floorRange = building.floorRange;

        const rangeParts = floorRange.split('~');
        if (rangeParts.length === 2) {
          let startFloorStr = rangeParts[0];
          let endFloorStr = rangeParts[1];

          let currentFloor = 0;
          let maxFloor = 0;

          if (startFloorStr.startsWith('B')) {
            const basementNum = parseInt(startFloorStr.substring(1).replace('층', ''), 10);
            for (let i = basementNum; i >= 1; i--) {
              floorsArray.push(`B${i}층`);
            }
          } else {
            currentFloor = parseInt(startFloorStr.replace('층', ''), 10);
          }

          maxFloor = parseInt(endFloorStr.replace('층', ''), 10);

          for (let i = currentFloor || 1; i <= maxFloor; i++) {
            floorsArray.push(`${i}층`);
          }
        } else if (floorRange.endsWith('층')) {
            const numFloor = parseInt(floorRange.replace('층', ''), 10);
            for (let i = 1; i <= numFloor; i++) {
                floorsArray.push(`${i}층`);
            }
        }

        setAvailableFloors(floorsArray);
      } else {
        setAvailableFloors([]);
      }
      setSelectedFloor('');
    } else {
      setAvailableFloors([]);
      setSelectedFloor('');
    }
  }, [selectedBuildingCode]);

  const handleShowFloorPlan = () => {
    if (selectedBuildingCode && selectedFloor) {
      setIsModalOpen(true);
    }
  };

  const selectedBuilding = buildings.find(b => b.code === selectedBuildingCode);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-hallym-blue via-hallym-teal to-hallym-sky bg-clip-text text-transparent dark:text-white">
          강의실 찾기
        </h1>
        <p className="text-lg text-muted-foreground dark:text-white">
          건물별로 평면도를 확인하고 강의실 위치를 찾아보세요
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          variant={searchMode === 'classroom' ? 'default' : 'outline'}
          onClick={() => setSearchMode('classroom')}
          className={`transition-all duration-500 ease-out transform hover:scale-105 ${
            searchMode === 'classroom' ? 'bg-gradient-to-r from-hallym-blue to-hallym-teal shadow-lg' : 'hover:shadow-md'
          }`}
        >
          <Search className="w-4 h-4 mr-2" />
          강의실 번호로 찾기
        </Button>
        <Button
          variant={searchMode === 'building' ? 'default' : 'outline'}
          onClick={() => setSearchMode('building')}
          className={`transition-all duration-500 ease-out transform hover:scale-105 ${
            searchMode === 'building' ? 'bg-gradient-to-r from-hallym-blue to-hallym-teal shadow-lg' : 'hover:shadow-md'
          }`}
        >
          <Building className="w-4 h-4 mr-2" />
          건물별로 찾기
        </Button>
      </div>

      {searchMode === 'classroom' && (
        <Card className="bg-card/50 backdrop-blur-sm border-hallym-navy/20 transition-all duration-500 ease-out hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-hallym-blue dark:text-white">강의실 번호로 검색</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="예: 1101, 10318, 2519..."
                  value={classroomSearch}
                  onChange={(e) => setClassroomSearch(e.target.value)}
                  className="dark:text-white dark:placeholder:text-gray-300 transition-all duration-500 ease-out focus:shadow-md"
                  disabled
                />
              </div>
              <Button 
                className="bg-gradient-to-r from-hallym-blue to-hallym-teal hover:from-hallym-teal hover:to-hallym-sky transition-all duration-500 ease-out transform hover:scale-105"
                disabled
              >
                <Search className="w-4 h-4 mr-2" />
                검색
              </Button>
            </div>
            <div className="text-sm text-muted-foreground dark:text-gray-300 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="font-medium mb-1">📢 준비 중인 기능입니다</p>
              <p>강의실 번호로 검색하는 기능은 현재 개발 중입니다. 당분간은 "건물별로 찾기" 기능을 이용해주세요.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {searchMode === 'building' && (
        <Card className="bg-card/50 backdrop-blur-sm border-hallym-navy/20 transition-all duration-500 ease-out hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-hallym-blue dark:text-white">건물별 검색</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium dark:text-white">건물 선택</label>
                <Select value={selectedBuildingCode} onValueChange={setSelectedBuildingCode}>
                  <SelectTrigger className="dark:text-white transition-all duration-500 ease-out focus:shadow-md">
                    <SelectValue placeholder="건물을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {buildings.map((building) => (
                      <SelectItem key={building.code} value={building.code}>
                        {building.code}관 - {building.name} ({building.floorRange})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium dark:text-white">층 선택</label>
                <Select
                  value={selectedFloor}
                  onValueChange={setSelectedFloor}
                  disabled={!selectedBuildingCode || availableFloors.length === 0}
                >
                  <SelectTrigger className="dark:text-white transition-all duration-500 ease-out focus:shadow-md">
                    <SelectValue placeholder="층을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableFloors.map((floor) => (
                      <SelectItem key={floor} value={floor}>
                        {floor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  className="w-full bg-gradient-to-r from-hallym-blue to-hallym-teal hover:from-hallym-teal hover:to-hallym-sky transition-all duration-500 ease-out transform hover:scale-105 disabled:opacity-50"
                  onClick={handleShowFloorPlan}
                  disabled={!selectedBuildingCode || !selectedFloor}
                >
                  <Building className="w-4 h-4 mr-2" />
                  평면도 보기
                </Button>
              </div>
            </div>
            
            {selectedBuildingCode && selectedFloor && (
              <div className="mt-4 p-4 bg-gradient-to-r from-hallym-blue/5 to-hallym-teal/5 rounded-lg border border-hallym-blue/20">
                <div className="text-center space-y-2">
                  <h4 className="font-semibold text-hallym-blue">
                    선택된 정보
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>{selectedBuilding?.name}</strong> ({selectedBuildingCode}관) - <strong>{selectedFloor}</strong>
                  </p>
                  {selectedBuildingCode === '1' && ['1층', '2층', '3층', '4층'].includes(selectedFloor) && (
                    <p className="text-xs text-hallym-teal">
                      ✨ 평면도가 준비되어 있습니다!
                    </p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card className="bg-gradient-to-r from-hallym-blue/10 to-hallym-teal/10 border-hallym-blue/20 transition-all duration-500 ease-out hover:shadow-lg">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold text-hallym-blue dark:text-white mb-2">
            강의실 찾기 도움말
          </h3>
          <p className="text-muted-foreground dark:text-gray-300">
            <strong>강의실 번호로 찾기:</strong> 추후 제공됩니다. 조금만 더 기다려주세요!
            <br />
            <strong>건물별로 찾기:</strong> 특정 건물과 층을 선택하여 평면도를 확인할 수 있습니다.
            <br />
            <em className="text-hallym-teal">현재 공학관(1관) 1~4층 평면도가 제공되고 있습니다.</em>
          </p>
        </CardContent>
      </Card>

      <FloorPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        buildingCode={selectedBuildingCode}
        buildingName={selectedBuilding?.name || ''}
        floor={selectedFloor}
      />
    </div>
  );
}