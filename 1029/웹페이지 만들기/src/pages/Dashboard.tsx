import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, CheckSquare, Clock, TrendingUp, Plus, Pencil, Trash2 } from "lucide-react";
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

const Dashboard = () => {
  const [goals, setGoals] = useState([
    { id: 1, text: "데이터구조 과제 완료", completed: true },
    { id: 2, text: "웹 프로그래밍 복습", completed: true },
    { id: 3, text: "알고리즘 스터디 참여", completed: false },
    { id: 4, text: "중간고사 준비", completed: false },
  ]);
  const [newGoal, setNewGoal] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [todayClasses, setTodayClasses] = useState<ClassItem[]>([]);

  // 현재 학기와 오늘 요일의 수업 가져오기
  useEffect(() => {
    const saved = localStorage.getItem('timetable-semesters');
    if (saved) {
      const semesters: Semester[] = JSON.parse(saved);
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1;
      const currentDay = now.getDay(); // 0(일) - 6(토)
      
      // 월요일을 0, 화요일을 1로 변환 (일요일과 토요일 제외)
      const dayIndex = currentDay === 0 ? -1 : currentDay - 1;
      
      if (dayIndex >= 0 && dayIndex <= 4) { // 월-금만
        // 현재 학기 결정
        const semester = currentMonth >= 3 && currentMonth <= 8 ? 1 : 2;
        const currentSemesterId = `${currentYear}-${semester}`;
        
        // 현재 학기의 오늘 요일 수업 필터링
        const currentSemester = semesters.find(s => s.id === currentSemesterId);
        if (currentSemester) {
          const classes = currentSemester.classes
            .filter(c => c.day === dayIndex)
            .sort((a, b) => a.start - b.start);
          setTodayClasses(classes);
        }
      } else {
        setTodayClasses([]);
      }
    }
  }, []);

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, { id: Date.now(), text: newGoal, completed: false }]);
      setNewGoal("");
      setIsDialogOpen(false);
    }
  };

  const toggleGoal = (id: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const deleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">대시보드</h1>
          <p className="text-muted-foreground">이번 주 학습 현황을 한눈에 확인하세요</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 shadow-card">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 rounded-lg gradient-primary">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">12</span>
            </div>
            <p className="text-sm text-muted-foreground">이번 주 수업</p>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 rounded-lg gradient-secondary">
                <CheckSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">5</span>
            </div>
            <p className="text-sm text-muted-foreground">진행 중 과제</p>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 rounded-lg gradient-warm">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">2</span>
            </div>
            <p className="text-sm text-muted-foreground">다가오는 시험</p>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 rounded-lg gradient-primary">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">85%</span>
            </div>
            <p className="text-sm text-muted-foreground">수행률</p>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Weekly Progress */}
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-card">
              <h2 className="text-xl font-semibold mb-6">오늘의 일정</h2>
              
              {todayClasses.length > 0 ? (
                <div className="space-y-4">
                  {todayClasses.map((classItem) => {
                    const startHour = 9 + classItem.start;
                    const time = `${startHour.toString().padStart(2, '0')}:00`;
                    
                    return (
                      <div 
                        key={classItem.id} 
                        className="flex gap-4 p-4 rounded-lg border-l-4"
                        style={{
                          backgroundColor: `${classItem.color}20`,
                          borderLeftColor: classItem.color,
                        }}
                      >
                        <div className="text-sm font-medium text-muted-foreground">{time}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{classItem.name}</h3>
                          <p className="text-sm text-muted-foreground">{classItem.room}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  오늘은 수업이 없습니다.
                </div>
              )}
            </Card>

            <Card className="p-6 shadow-card mt-6">
              <h2 className="text-xl font-semibold mb-6">이번 주 집중도</h2>
              
              <div className="space-y-4">
                {['월', '화', '수', '목', '금'].map((day, index) => (
                  <div key={day}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{day}요일</span>
                      <span className="text-sm text-muted-foreground">{70 + index * 5}%</span>
                    </div>
                    <Progress value={70 + index * 5} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Upcoming Tasks */}
          <div>
            <Card className="p-6 shadow-card">
              <h2 className="text-xl font-semibold mb-6">다가오는 마감일</h2>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">데이터구조 과제 #3</h3>
                    <span className="text-xs bg-destructive text-destructive-foreground px-2 py-1 rounded">
                      D-1
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">내일 23:59까지</p>
                </div>

                <div className="p-4 rounded-lg bg-muted">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">웹 프로그래밍 중간고사</h3>
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                      D-3
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">3일 후</p>
                </div>

                <div className="p-4 rounded-lg bg-muted">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">알고리즘 팀 프로젝트</h3>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                      D-7
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">1주일 후</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-card mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">이번 주 목표</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="ghost">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>새 목표 추가</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="목표를 입력하세요"
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddGoal()}
                      />
                      <Button onClick={handleAddGoal} className="w-full">
                        추가
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="space-y-3">
                {goals.map((goal) => (
                  <div key={goal.id} className="flex items-center gap-3 group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded cursor-pointer"
                      checked={goal.completed}
                      onChange={() => toggleGoal(goal.id)}
                    />
                    <span className={`text-sm flex-1 ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {goal.text}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => deleteGoal(goal.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;