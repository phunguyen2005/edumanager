import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  UserSquare2,
  BookOpen,
  Users,
  ClipboardCheck,
  Bell,
  MessageSquare,
  Menu,
  ChevronRight,
  LogOut,
  Briefcase,
  School,
  FileCheck,
  FileText,
  UserCheck,
  AlertCircle,
  Trophy,
  Table2,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isBoard = location.pathname.startsWith("/bgh");
  // Fix: Ensure /teachers (plural) does not trigger isTeacher (singular)
  const isTeacher =
    location.pathname.startsWith("/teacher") &&
    !location.pathname.startsWith("/teachers");
  const isStudent =
    location.pathname.startsWith("/student") &&
    !location.pathname.startsWith("/students");

  const staffNavItems = [
    { label: "Học sinh", icon: <GraduationCap size={20} />, path: "/students" },
    { label: "Giáo viên", icon: <UserSquare2 size={20} />, path: "/teachers" },
    { label: "Môn Học", icon: <BookOpen size={20} />, path: "/subjects" },
    { label: "Xếp lớp", icon: <Users size={20} />, path: "/classes" },
    {
      label: "Quản lý điểm",
      icon: <ClipboardCheck size={20} />,
      path: "/records",
    },
  ];

  const boardNavItems = [
    {
      label: "Phân công",
      icon: <Briefcase size={20} />,
      path: "/bgh/assignments",
    },
    { label: "Quản lý lớp", icon: <School size={20} />, path: "/bgh/classes" },
    {
      label: "Phê duyệt",
      icon: <FileCheck size={20} />,
      path: "/bgh/approvals",
    },
  ];

  const teacherNavItems = [
    { label: "Lớp học", icon: <School size={20} />, path: "/teacher/classes" },
    {
      label: "Quản lý điểm",
      icon: <FileText size={20} />,
      path: "/teacher/grades",
    },
    {
      label: "Hạnh kiểm",
      icon: <UserCheck size={20} />,
      path: "/teacher/conduct",
    },
    {
      label: "Phúc khảo",
      icon: <AlertCircle size={20} />,
      path: "/teacher/appeals",
    },
  ];

  const studentNavItems = [
    {
      label: "Bảng điểm",
      icon: <Table2 size={20} />,
      path: "/student/transcript",
    },
    { label: "Xếp loại", icon: <Trophy size={20} />, path: "/student/ranking" },
    {
      label: "Phúc khảo",
      icon: <AlertCircle size={20} />,
      path: "/student/review",
    },
  ];

  let navItems = staffNavItems;
  if (isBoard) navItems = boardNavItems;
  if (isTeacher) navItems = teacherNavItems;
  if (isStudent) navItems = studentNavItems;

  let userProfile = {
    name: "Trần Văn Tú",
    role: "Cán bộ học vụ",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCHx0nI-7id6oVyRENmKEcDyLYz-lNceLBxjZ2abo6S6bjiBAhz1SkBa2vm3P7AVQU9GSkLaFv8VpBpFF2a8KqgqkNsS8UsIIO6PpJTP_-rTHBLPXCglbeb1oM5S1qTvm0fNL0Nc4r41_xPppJy1xhDaczxTeZfLgybDhOgCvopuAW_Tdry41eOrk6mtHJCebh9d3ypnqhxYJW5nuUy1UzqC3vrof3WdktZD5Pdl3fSrCXe1vgS7S_h5PCbVu71v13szvm0SovZUFI",
  };

  if (isBoard) {
    userProfile = {
      name: "Nguyễn Văn An",
      role: "Ban Giám hiệu",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAqcIBt1S_f0uPce4ZsG8p0SbTMRnxt18xFlW57uXIAAUKd7Vkq5PPg4xEa_sXx7T8N6DiZR259MCJMgn7WqsUzrlJn-0tJWiP998yImvEXJ6fbYc09dSq5uVR4IogrcZY4h59HANP8_jnNa6cI9--Xe3CNzDxlS0HqfPpreeHi1CgOgzfPmU7oBfYymzfVlcBqeVMLkM_OUXOAMc9fyY3woNkiwrrtNnAZM-woNt3pyohWYm5nWWbbsp6SPSmJajkik520J1OHt7g",
    };
  } else if (isTeacher) {
    userProfile = {
      name: "Phạm Thị Hương",
      role: "Giáo viên",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAh1u-bvl2BhUpov_BBXH4NstErn9F52118WsJ7Rptu_vrqZ7MbG_mFiyKH_KSMcEdwl1Ww8bkVxZ5_rWYRFZnpscpnyTkfVe_Yhd8lpdGp5sSAlyGSmwpcJ14zwjMY9AfYvLF0KMM5EDC52uGuuw3NzGomplt4ZqNqKMVOM57ySfWOp8Y6lRWKZaqzqSpRgmZFzIuvo0wvk81tg9HZJLXZToGfefv1dcDO1yAT3OuPn1Q67GASZXcAuSBcaLJF9jjzm-lT8GsGmGU",
    };
  } else if (isStudent) {
    userProfile = {
      name: "Nguyễn Văn An",
      role: "Học sinh",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCl5uW_Cqh7u8mDvRgPV5Ys4QWol2yfdY07Ssg71lQ0lRNze4sUETukoQ-QzLRCG2fWS9b1vuHJpEw56-puxI8dd15OA_UnzAJ6YCw68zfnjQlG7VcNQnijm8zYeihZe_0kUX_kqbvhKYQUnaoqifI4XTO9ymywcMjbUuVjxzI4qVYchI9kSjRRnoF1v2wQRhjJSAsmq8-8Cy6zcHIIyU7Qn8oRf_QCE-JyZv6Oa997LIOOksQTGd6izPOFgDWqv_PpyBBSF5N4CTs",
    };
  }

  const getRole = () => {
    const role = localStorage.getItem("role");
    if (role === "cbhv") {
      return "Cán bộ học vụ";
    } else if (role === "bgh") {
      return "Ban giám hiệu";
    } else if (role === "gvbm" || role === "gvcn") {
      return "Giáo viên";
    } else if (role === "hocsinh") {
      return "Học sinh";
    } else {
      return "Học sinh";
    }
  };

  const getName = () => {
    return localStorage.getItem("name");
  };

  return (
    <aside className="w-[280px] h-full flex-shrink-0 flex flex-col border-r border-surface-dim bg-background-light hidden lg:flex">
      <div className="p-6 flex flex-col gap-8 h-full">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2">
          <div
            className="bg-center bg-no-repeat bg-cover rounded-full size-10 shadow-sm"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDOwaKV27JfaBAs4DQ-xwD4K4-f3zdKg1eufKZEIZXQZipSnY46MWe6UVeE4q2VGePhNdALJoxbLAxAefmhy9aAXX19ZgS3QmtH8P-mhW8PpmVpYp7HqxvEh7-p84WfZqEerFroHyuziWcheFr1FnPfW0_XoPF0Mvlr8wSgEI9MS8Y3XOLHu-ur9Hj8CczbfHk_aO3lRhZHMvjMHCQGk2_DIIaBM5SQDlvRk4jTYjWsvrspFyNPuphpyHWyatexSXClS45XoOF9CN0")',
            }}
          ></div>
          <div className="flex flex-col">
            <h1 className="text-text-main text-base font-bold leading-none">
              EduManager
            </h1>
            <p className="text-text-secondary text-xs font-normal mt-1">
              THPT System
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-full transition-colors group ${
                  isActive
                    ? "bg-primary text-text-main font-bold shadow-sm"
                    : "text-text-main hover:bg-surface-dim"
                }`}
              >
                <span
                  className={`${
                    isActive
                      ? "text-text-main"
                      : "text-text-secondary group-hover:text-text-main"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="mt-auto px-4 py-4 border-t border-surface-dim">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div
              className="size-9 rounded-full bg-gray-200 bg-center bg-cover shadow-sm ring-2 ring-white"
              style={{ backgroundImage: `url("${userProfile.avatar}")` }}
            ></div>
            <div className="flex flex-col">
              {}
              <p className="text-xs font-bold text-text-main">
                {userProfile.name}
              </p>
              <p className="text-[10px] text-text-secondary">{getRole()}</p>
            </div>
            <LogOut
              size={16}
              className="ml-auto text-text-secondary hover:text-red-500"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

const Header = ({
  title,
  breadcrumbs,
}: {
  title: string;
  breadcrumbs: string[];
}) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-surface-dim bg-background-light z-10 flex-shrink-0">
      <div className="flex items-center gap-4 lg:hidden">
        <button className="text-text-main p-1">
          <Menu />
        </button>
        <span className="font-bold text-lg">EduManager</span>
      </div>

      <div className="hidden lg:flex items-center text-sm">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <span
              className={`font-medium ${
                index === breadcrumbs.length - 1
                  ? "text-text-main font-bold"
                  : "text-text-secondary"
              }`}
            >
              {crumb}
            </span>
            {index < breadcrumbs.length - 1 && (
              <ChevronRight size={16} className="mx-2 text-text-secondary" />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <button className="flex items-center justify-center size-10 rounded-full bg-surface-dim hover:bg-[#e8e8d8] text-text-main transition-colors">
          <Bell size={20} />
        </button>
        <button className="flex items-center justify-center size-10 rounded-full bg-surface-dim hover:bg-[#e8e8d8] text-text-main transition-colors">
          <MessageSquare size={20} />
        </button>
        <div className="hidden sm:block w-px h-6 bg-surface-dim mx-1"></div>
        <div
          className="bg-center bg-no-repeat size-9 rounded-full bg-cover ring-2 ring-white ml-1 shadow-sm"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBcjQiHvaB-VG0yqw5Vg5BjW52f7H2467x4Ny8u7GRbyh9fvuaI92wrcl_mmcnSOTtfCDzzHg2gPfl9qo8O_6orRDBHrh2U6pMkY2PnaqDNdjj2FkszCnMFPQDJoVt9mLrEps2QIjQfPwuBJgY-3g4xEAP4w14EKgc-nc8NgTBbqmYSNoAqjPfvbZ-H-PXX4PNe42SLJZOjKthPda3jEzIcuEeuLUxQOtT1njKv_Po7KK03MFHMops9eL4kAjhTzl6XKQwlUQez4VI")',
          }}
        ></div>
      </div>
    </header>
  );
};

export const Layout = ({
  children,
  breadcrumbs,
}: {
  children: React.ReactNode;
  breadcrumbs: string[];
}) => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full relative min-w-0 overflow-hidden bg-background-light">
        <Header
          title={breadcrumbs[breadcrumbs.length - 1]}
          breadcrumbs={breadcrumbs}
        />
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
};
