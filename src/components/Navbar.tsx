import { NavLink } from "react-router-dom";
import { Book, Home, Calendar, ChartBar } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Book, label: "Library", path: "/library" },
    { icon: Calendar, label: "Schedule", path: "/schedule" },
    { icon: ChartBar, label: "Progress", path: "/progress" },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 border border-gray-300 bg-background p-1 rounded shadow">
      <div className="flex justify-around">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center text-xs transition-all",
                isActive ? "text-accent" : "text-muted-foreground"
              )
            }
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
