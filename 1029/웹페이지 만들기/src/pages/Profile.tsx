import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("로그아웃 되었습니다");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">마이페이지</h1>
          <p className="text-muted-foreground">내 정보를 확인하고 설정을 변경하세요</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card className="p-6 shadow-card text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarFallback className="text-2xl gradient-primary text-white">
                홍길동
              </AvatarFallback>
            </Avatar>
            
            <h2 className="text-xl font-bold mb-1">홍길동</h2>
            <p className="text-muted-foreground mb-4">컴퓨터공학과</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">학번</span>
                <span className="font-medium">2024123456</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">학교</span>
                <span className="font-medium">서울대학교</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">가입일</span>
                <span className="font-medium">2024.09.01</span>
              </div>
            </div>

            <Button
              variant="destructive"
              className="w-full mt-6 gap-2"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              로그아웃
            </Button>
          </Card>

          {/* Settings */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 shadow-card">
              <div className="flex items-center gap-2 mb-6">
                <User className="w-5 h-5" />
                <h2 className="text-xl font-semibold">개인 정보</h2>
              </div>

              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">이름</Label>
                    <Input id="name" defaultValue="홍길동" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="student-id">학번</Label>
                    <Input id="student-id" defaultValue="2024123456" disabled />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="university">학교</Label>
                  <Input id="university" defaultValue="서울대학교" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">학과</Label>
                  <Input id="department" defaultValue="컴퓨터공학과" />
                </div>

                <Button type="button" className="w-full">
                  정보 수정
                </Button>
              </form>
            </Card>

            <Card className="p-6 shadow-card">
              <div className="flex items-center gap-2 mb-6">
                <Settings className="w-5 h-5" />
                <h2 className="text-xl font-semibold">비밀번호 변경</h2>
              </div>

              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">현재 비밀번호</Label>
                  <Input id="current-password" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">새 비밀번호</Label>
                  <Input id="new-password" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">새 비밀번호 확인</Label>
                  <Input id="confirm-password" type="password" />
                </div>

                <Button type="button" className="w-full">
                  비밀번호 변경
                </Button>
              </form>
            </Card>

            <Card className="p-6 shadow-card">
              <h2 className="text-xl font-semibold mb-4">통계</h2>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-primary/10">
                  <div className="text-2xl font-bold text-primary mb-1">12</div>
                  <div className="text-sm text-muted-foreground">수강 과목</div>
                </div>
                
                <div className="text-center p-4 rounded-lg bg-secondary/10">
                  <div className="text-2xl font-bold text-secondary mb-1">28</div>
                  <div className="text-sm text-muted-foreground">완료한 과제</div>
                </div>
                
                <div className="text-center p-4 rounded-lg bg-accent/10">
                  <div className="text-2xl font-bold text-accent mb-1">85%</div>
                  <div className="text-sm text-muted-foreground">평균 수행률</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
