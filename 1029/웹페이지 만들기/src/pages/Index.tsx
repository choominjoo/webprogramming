import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, CheckSquare, BarChart3, Users } from "lucide-react";
import { Link } from "react-router-dom";
import campusHero from "@/assets/campus-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${campusHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            캠퍼스 타임 트래커
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-8 max-w-2xl">
            대학생을 위한 직관적인 시간표, 과제, 시험 일정 관리
          </p>
          <div className="flex gap-4">
            <Link to="/signup/student">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 shadow-medium">
                시작하기
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 text-white border-white/30 hover:bg-white/20">
                로그인
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            주요 기능
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 shadow-card hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">시간표 관리</h3>
              <p className="text-muted-foreground">
                드래그 앤 드롭으로 쉽게 시간표를 구성하고 색상으로 과목을 구분하세요
              </p>
            </Card>

            <Card className="p-6 shadow-card hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 rounded-full gradient-secondary flex items-center justify-center mb-4">
                <CheckSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">과제 & 시험</h3>
              <p className="text-muted-foreground">
                마감일을 한눈에 확인하고 완료 상태를 체크하며 효율적으로 관리하세요
              </p>
            </Card>

            <Card className="p-6 shadow-card hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 rounded-full gradient-warm flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">대시보드</h3>
              <p className="text-muted-foreground">
                이번 주 집중도와 수행률을 그래프로 확인하고 학습을 최적화하세요
              </p>
            </Card>

            <Card className="p-6 shadow-card hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">학기별 관리</h3>
              <p className="text-muted-foreground">
                학번 기준으로 자동 생성된 학기별 시간표를 체계적으로 관리하세요
              </p>
            </Card>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Index;
