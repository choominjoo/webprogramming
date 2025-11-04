import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, CheckSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { to: "/dashboard", icon: Home, label: "홈" },
    { to: "/timetable", icon: Calendar, label: "시간표" },
    { to: "/assignments", icon: CheckSquare, label: "과제" },
    { to: "/profile", icon: User, label: "마이페이지" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-card border-b border-border shadow-soft z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="px-4 py-2 rounded-lg gradient-primary">
              <span className="text-lg font-bold text-white">Campus Time Tracker</span>
            </div>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                  location.pathname === to
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
