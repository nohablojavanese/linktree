import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/shadcn/ui/card";
import { Input } from "@/components/shadcn/ui/input";
import { Separator } from "@/components/shadcn/ui/separator";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  BarChart,
  Calendar as CalendarIcon,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Home,
  Plus,
} from "lucide-react";
export default function Component() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar */}
      <aside className="w-64 p-4 bg-white shadow-sm overflow-y-auto">
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Avg. Done</h2>
            <p className="text-sm text-gray-500">Est. 30min</p>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end h-32">
              {["May", "June", "July", "Aug"].map((month, index) => (
                <div
                  key={month}
                  className="w-1/5 bg-blue-500 rounded-t-lg"
                  style={{ height: `${[60, 80, 50, 100][index]}%` }}
                ></div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>May</span>
              <span>June</span>
              <span>July</span>
              <span>Aug</span>
            </div>
          </CardContent>
        </Card>
        <nav className="space-y-1">
          <NavItem icon={<Home size={18} />} label="Home" count={28} />
          <NavItem
            icon={<CheckCircle size={18} />}
            label="Completed"
            count={0}
          />
          <NavItem
            icon={<CalendarIcon size={18} />}
            label="Today"
            count={0}
            active
          />
          <NavItem icon="🔥" label="This is a higher list" count={4} />
          <NavItem icon="🦷" label="this is one list" count={0} />
          <NavItem icon="🧠" label="Brains" count={18} />
          <NavItem icon={<Plus size={18} />} label="Create new list..." />
        </nav>
        <Card className="mt-6">
          <CardContent className="flex items-center justify-between p-4">
            <Button variant="default" className="text-sm text-gray-600">
              Upgrade to Pro
            </Button>
            <CalendarIcon className="w-5 h-5 text-gray-400" />
          </CardContent>
        </Card>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto text-gray-600">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              className="bg-gray-100 text-gray-600 rounded-full"
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              Calendar
            </Button>
            <Button
              variant="destructive"
              className="bg-red-600 text-white rounded-full"
            >
              <DotsVerticalIcon className="w-4 h-4 mr-2" />
              Tasks
            </Button>
          </div>
          <Button variant="ghost" className="text-gray-600">
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>
        <Card>
          <CardHeader className="flex flex-row items-center">
            <CalendarIcon className="w-8 h-8 mr-2 bg-gray-100 p-1 rounded" />
            <div>
              <p className="text-sm text-gray-500">Monday, September 9.</p>
              <h2 className="text-xl font-semibold text-gray-900">Today</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Input
                placeholder="Write a new task..."
                className="flex-grow rounded-full"
              />
              <Button
                variant="outline"
                className="whitespace-nowrap rounded-full"
              >
                Today
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <p className="text-gray-500">You&apos;re all done!</p>
          </CardContent>
        </Card>
      </main>

      {/* Right Sidebar */}
      <aside className="w-64 p-4 bg-white shadow-sm overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-900">Mon, Sep 9</h2>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              Today
            </Button>
            <Button variant="ghost" size="sm">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="text-xs text-gray-500 w-10">{i + 10}:00</span>
              <Separator className="flex-grow" />
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode | string;
  label: string;
  count?: number;
  active?: boolean;
}

function NavItem({ icon, label, count, active = false }: NavItemProps) {
  return (
    <a
      href="#"
      className={`flex items-center p-2 rounded-md ${
        active ? "bg-gray-100" : "hover:bg-gray-50"
      }`}
    >
      {typeof icon === "string" ? (
        <span className="w-5 h-5 mr-3 text-center">{icon}</span>
      ) : (
        <span className="w-5 h-5 mr-3 text-gray-500">{icon}</span>
      )}
      <span
        className={`flex-grow ${active ? "font-medium" : ""} text-gray-700`}
      >
        {label}
      </span>
      {count !== undefined && (
        <span className="text-sm text-gray-500">{count}</span>
      )}
    </a>
  );
}
