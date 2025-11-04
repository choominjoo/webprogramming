import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

interface ClassItem {
  id: number;
  day: number;
  start: number;
  duration: number;
  name: string;
  room: string;
  color: string;
}

interface Semester {
  id: string;
  name: string;
  classes: ClassItem[];
}

const Timetable = () => {
  const timeSlots = Array.from({ length: 14 }, (_, i) => `${9 + i}:00`);
  const days = ['월', '화', '수', '목', '금'];
  
  const colorOptions = [
    { value: '#6366f1', label: '보라' },
    { value: '#ec4899', label: '핑크' },
    { value: '#f97316', label: '오렌지' },
    { value: '#eab308', label: '노랑' },
    { value: '#22c55e', label: '초록' },
    { value: '#06b6d4', label: '시안' },
    { value: '#3b82f6', label: '파랑' },
    { value: '#8b5cf6', label: '바이올렛' },
    { value: '#ef4444', label: '빨강' },
    { value: '#10b981', label: '에메랄드' },
    { value: '#f59e0b', label: '엠버' },
    { value: '#14b8a6', label: '틸' },
  ];

  // 학번에서 입학연도 추출 (예: 2024123456 -> 2024)
  const studentId = "2024123456"; // TODO: 실제 로그인한 사용자의 학번
  const admissionYear = parseInt(studentId.substring(0, 4));
  
  // 입학연도 기준으로 학기 자동 생성
  const generateSemesters = (year: number): Semester[] => {
    const currentYear = new Date().getFullYear();
    const semesters: Semester[] = [];
    
    for (let y = year; y <= currentYear; y++) {
      semesters.push({
        id: `${y}-1`,
        name: `${y}-1학기`,
        classes: [],
      });
      semesters.push({
        id: `${y}-2`,
        name: `${y}-2학기`,
        classes: [],
      });
    }
    
    return semesters;
  };

  const [semesters, setSemesters] = useState<Semester[]>(() => {
    const saved = localStorage.getItem('timetable-semesters');
    return saved ? JSON.parse(saved) : generateSemesters(admissionYear);
  });

  // semesters 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('timetable-semesters', JSON.stringify(semesters));
  }, [semesters]);

  // 현재 연도와 월을 기준으로 학기 결정
  const getCurrentSemester = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // 0-11 -> 1-12
    
    // 3월-8월: 1학기, 9월-2월: 2학기
    const semester = currentMonth >= 3 && currentMonth <= 8 ? 1 : 2;
    return `${currentYear}-${semester}`;
  };

  const [currentSemester, setCurrentSemester] = useState(getCurrentSemester());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassItem | null>(null);
  const [newClass, setNewClass] = useState({
    name: '',
    room: '',
    day: '0',
    start: '0',
    duration: '1',
    color: '#6366f1',
  });

  const getCurrentClasses = () => {
    return semesters.find(s => s.id === currentSemester)?.classes || [];
  };

  const handleAddClass = () => {
    if (newClass.name && newClass.room) {
      const updatedSemesters = semesters.map(semester => {
        if (semester.id === currentSemester) {
          return {
            ...semester,
            classes: [
              ...semester.classes,
              {
                id: Date.now(),
                day: parseInt(newClass.day),
                start: parseInt(newClass.start),
                duration: parseInt(newClass.duration),
                name: newClass.name,
                room: newClass.room,
                color: newClass.color,
              },
            ],
          };
        }
        return semester;
      });
      setSemesters(updatedSemesters);
      setNewClass({ name: '', room: '', day: '0', start: '0', duration: '1', color: '#6366f1' });
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteClass = (classId: number) => {
    const updatedSemesters = semesters.map(semester => {
      if (semester.id === currentSemester) {
        return {
          ...semester,
          classes: semester.classes.filter(c => c.id !== classId),
        };
      }
      return semester;
    });
    setSemesters(updatedSemesters);
  };

  const handleEditClass = (classItem: ClassItem) => {
    setEditingClass(classItem);
    setNewClass({
      name: classItem.name,
      room: classItem.room,
      day: classItem.day.toString(),
      start: classItem.start.toString(),
      duration: classItem.duration.toString(),
      color: classItem.color,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateClass = () => {
    if (editingClass && newClass.name && newClass.room) {
      const updatedSemesters = semesters.map(semester => {
        if (semester.id === currentSemester) {
          return {
            ...semester,
            classes: semester.classes.map(c =>
              c.id === editingClass.id
                ? {
                    ...c,
                    day: parseInt(newClass.day),
                    start: parseInt(newClass.start),
                    duration: parseInt(newClass.duration),
                    name: newClass.name,
                    room: newClass.room,
                    color: newClass.color,
                  }
                : c
            ),
          };
        }
        return semester;
      });
      setSemesters(updatedSemesters);
      setNewClass({ name: '', room: '', day: '0', start: '0', duration: '1', color: '#6366f1' });
      setIsEditDialogOpen(false);
      setEditingClass(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">시간표</h1>
            <p className="text-muted-foreground">주간 강의 일정을 확인하고 관리하세요</p>
          </div>
          <div className="flex gap-2">
            <Select value={currentSemester} onValueChange={setCurrentSemester}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="학기 선택" />
              </SelectTrigger>
              <SelectContent>
                {semesters.map(semester => (
                  <SelectItem key={semester.id} value={semester.id}>
                    {semester.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  과목 추가
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>과목 추가</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>과목명</Label>
                    <Input
                      value={newClass.name}
                      onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                      placeholder="예: 데이터구조론"
                    />
                  </div>
                  <div>
                    <Label>강의실</Label>
                    <Input
                      value={newClass.room}
                      onChange={(e) => setNewClass({ ...newClass, room: e.target.value })}
                      placeholder="예: 공학관 301"
                    />
                  </div>
                  <div>
                    <Label>요일</Label>
                    <Select value={newClass.day} onValueChange={(value) => setNewClass({ ...newClass, day: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {days.map((day, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            {day}요일
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>시작 시간</Label>
                    <Select value={newClass.start} onValueChange={(value) => setNewClass({ ...newClass, start: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>수업 시간 (시간)</Label>
                    <Select value={newClass.duration} onValueChange={(value) => setNewClass({ ...newClass, duration: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((duration) => (
                          <SelectItem key={duration} value={duration.toString()}>
                            {duration}시간
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>색상</Label>
                    <div className="grid grid-cols-6 gap-2 mt-2">
                      {colorOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          className={`w-full aspect-square rounded-lg transition-all ${
                            newClass.color === option.value 
                              ? 'ring-2 ring-offset-2 ring-primary scale-110' 
                              : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: option.value }}
                          onClick={() => setNewClass({ ...newClass, color: option.value })}
                          title={option.label}
                        />
                      ))}
                    </div>
                  </div>
                  <Button onClick={handleAddClass} className="w-full">
                    추가
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>과목 수정</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>과목명</Label>
                    <Input
                      value={newClass.name}
                      onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                      placeholder="예: 데이터구조론"
                    />
                  </div>
                  <div>
                    <Label>강의실</Label>
                    <Input
                      value={newClass.room}
                      onChange={(e) => setNewClass({ ...newClass, room: e.target.value })}
                      placeholder="예: 공학관 301"
                    />
                  </div>
                  <div>
                    <Label>요일</Label>
                    <Select value={newClass.day} onValueChange={(value) => setNewClass({ ...newClass, day: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {days.map((day, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            {day}요일
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>시작 시간</Label>
                    <Select value={newClass.start} onValueChange={(value) => setNewClass({ ...newClass, start: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>수업 시간 (시간)</Label>
                    <Select value={newClass.duration} onValueChange={(value) => setNewClass({ ...newClass, duration: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((duration) => (
                          <SelectItem key={duration} value={duration.toString()}>
                            {duration}시간
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>색상</Label>
                    <div className="grid grid-cols-6 gap-2 mt-2">
                      {colorOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          className={`w-full aspect-square rounded-lg transition-all ${
                            newClass.color === option.value 
                              ? 'ring-2 ring-offset-2 ring-primary scale-110' 
                              : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: option.value }}
                          onClick={() => setNewClass({ ...newClass, color: option.value })}
                          title={option.label}
                        />
                      ))}
                    </div>
                  </div>
                  <Button onClick={handleUpdateClass} className="w-full">
                    수정
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card className="p-6 shadow-card overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-center font-medium text-sm text-muted-foreground">시간</div>
              {days.map((day) => (
                <div key={day} className="text-center font-semibold">
                  {day}요일
                </div>
              ))}
            </div>

            {/* Time Grid */}
            <div className="relative">
              {timeSlots.map((time, timeIndex) => (
                <div key={time} className="grid grid-cols-6 gap-2 border-t border-border">
                  <div className="text-center text-sm text-muted-foreground py-3">
                    {time}
                  </div>
                  {days.map((_, dayIndex) => (
                    <div
                      key={`${dayIndex}-${timeIndex}`}
                      className="relative min-h-[60px] bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer rounded"
                    />
                  ))}
                </div>
              ))}

              {/* Classes Overlay */}
              {getCurrentClasses().map((classItem) => (
                <div
                  key={classItem.id}
                  className="absolute text-white p-3 rounded-lg shadow-soft overflow-hidden group"
                  style={{
                    backgroundColor: classItem.color,
                    left: `${(classItem.day + 1) * (100 / 6)}%`,
                    top: `${classItem.start * 60}px`,
                    width: `${100 / 6 - 1}%`,
                    height: `${classItem.duration * 60 - 8}px`,
                    marginLeft: '0.25rem',
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div 
                      className="flex-1 cursor-pointer"
                      onClick={() => handleEditClass(classItem)}
                    >
                      <div className="text-sm font-semibold mb-1">{classItem.name}</div>
                      <div className="text-xs opacity-90">{classItem.room}</div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 hover:bg-white/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClass(classItem.id);
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4">
          {getCurrentClasses().reduce((acc: ClassItem[], curr) => {
            if (!acc.find(item => item.name === curr.name)) {
              acc.push(curr);
            }
            return acc;
          }, []).map((classItem, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: classItem.color }} />
              <span className="text-sm">{classItem.name}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Timetable;