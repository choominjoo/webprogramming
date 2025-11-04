import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus, Calendar, AlertCircle, CalendarIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  priority: string;
  completed: boolean;
  type: string;
}

const Assignments = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 1,
      title: '데이터구조 과제 #3',
      course: '데이터구조론',
      dueDate: '2024-11-04',
      priority: 'high',
      completed: false,
      type: 'assignment',
    },
    {
      id: 2,
      title: '웹 프로그래밍 중간고사',
      course: '웹 프로그래밍',
      dueDate: '2024-11-06',
      priority: 'high',
      completed: false,
      type: 'exam',
    },
    {
      id: 3,
      title: '알고리즘 팀 프로젝트',
      course: '알고리즘',
      dueDate: '2024-11-10',
      priority: 'medium',
      completed: false,
      type: 'project',
    },
    {
      id: 4,
      title: '운영체제 과제 #2',
      course: '운영체제',
      dueDate: '2024-11-15',
      priority: 'medium',
      completed: false,
      type: 'assignment',
    },
    {
      id: 5,
      title: '데이터베이스 실습',
      course: '데이터베이스',
      dueDate: '2024-10-30',
      priority: 'low',
      completed: true,
      type: 'assignment',
    },
  ]);

  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    course: '',
    dueDate: new Date(),
    type: 'assignment',
    customType: '',
  });

  const getDaysUntil = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive text-destructive-foreground';
      case 'medium':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const toggleComplete = (id: number) => {
    setAssignments(assignments.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const handleAddAssignment = () => {
    if (newAssignment.title && newAssignment.course) {
      const assignmentType = newAssignment.customType || newAssignment.type;
      
      if (newAssignment.customType && !customCategories.includes(newAssignment.customType)) {
        setCustomCategories([...customCategories, newAssignment.customType]);
      }

      const daysUntil = getDaysUntil(format(newAssignment.dueDate, 'yyyy-MM-dd'));
      const priority = daysUntil <= 2 ? 'high' : daysUntil <= 7 ? 'medium' : 'low';

      setAssignments([
        ...assignments,
        {
          id: Date.now(),
          title: newAssignment.title,
          course: newAssignment.course,
          dueDate: format(newAssignment.dueDate, 'yyyy-MM-dd'),
          priority,
          completed: false,
          type: assignmentType,
        },
      ]);

      setNewAssignment({
        title: '',
        course: '',
        dueDate: new Date(),
        type: 'assignment',
        customType: '',
      });
      setIsAddDialogOpen(false);
    }
  };

  const deleteAssignment = (id: number) => {
    setAssignments(assignments.filter(item => item.id !== id));
  };

  const allTypes = ['assignment', 'exam', 'project', ...customCategories];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'assignment': return '과제';
      case 'exam': return '시험';
      case 'project': return '프로젝트';
      default: return type;
    }
  };

  const filterByType = (type: string) => {
    if (type === 'all') return assignments;
    return assignments.filter(a => a.type === type);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">과제 & 시험</h1>
            <p className="text-muted-foreground">마감일을 확인하고 학습 계획을 세우세요</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                새 항목 추가
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>새 항목 추가</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>제목</Label>
                  <Input
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                    placeholder="예: 데이터구조 과제 #3"
                  />
                </div>
                <div>
                  <Label>과목명</Label>
                  <Input
                    value={newAssignment.course}
                    onChange={(e) => setNewAssignment({ ...newAssignment, course: e.target.value })}
                    placeholder="예: 데이터구조론"
                  />
                </div>
                <div>
                  <Label>카테고리</Label>
                  <Select
                    value={newAssignment.type}
                    onValueChange={(value) => setNewAssignment({ ...newAssignment, type: value, customType: '' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="assignment">과제</SelectItem>
                      <SelectItem value="exam">시험</SelectItem>
                      <SelectItem value="project">프로젝트</SelectItem>
                      {customCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                      <SelectItem value="custom">+ 새 카테고리</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {newAssignment.type === 'custom' && (
                  <div>
                    <Label>새 카테고리 이름</Label>
                    <Input
                      value={newAssignment.customType}
                      onChange={(e) => setNewAssignment({ ...newAssignment, customType: e.target.value })}
                      placeholder="카테고리 이름 입력"
                    />
                  </div>
                )}
                <div>
                  <Label>마감일</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newAssignment.dueDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newAssignment.dueDate ? (
                          format(newAssignment.dueDate, "PPP", { locale: ko })
                        ) : (
                          <span>날짜 선택</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={newAssignment.dueDate}
                        onSelect={(date) => date && setNewAssignment({ ...newAssignment, dueDate: date })}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Button onClick={handleAddAssignment} className="w-full">
                  추가
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="assignment">과제</TabsTrigger>
            <TabsTrigger value="exam">시험</TabsTrigger>
            <TabsTrigger value="project">프로젝트</TabsTrigger>
            {customCategories.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          {['all', ...allTypes].map((tabValue) => (
            <TabsContent key={tabValue} value={tabValue} className="space-y-4">
              {filterByType(tabValue).map((item) => (
                <Card key={item.id} className="p-6 shadow-card hover:shadow-medium transition-shadow group">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => toggleComplete(item.id)}
                      className="mt-1"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className={`text-lg font-semibold mb-1 ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{item.course}</p>
                        </div>
                        
                        <div className="flex gap-2 items-center">
                          <Badge variant="outline" className="capitalize">
                            {getTypeLabel(item.type)}
                          </Badge>
                          {!item.completed && (
                            <Badge className={getPriorityColor(item.priority)}>
                              {getDaysUntil(item.dueDate) <= 1 ? (
                                <span className="flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  D-{getDaysUntil(item.dueDate)}
                                </span>
                              ) : (
                                `D-${getDaysUntil(item.dueDate)}`
                              )}
                            </Badge>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => deleteAssignment(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                    </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>마감일: {item.dueDate}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default Assignments;
