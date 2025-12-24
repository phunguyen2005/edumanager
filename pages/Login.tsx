import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  User,
  Eye,
  School,
  GraduationCap,
  X,
  Briefcase,
  ChevronRight,
  BookOpen,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const result = await res.json();

      if (res.status === 200) {
        // giả sử response: { data: { accessToken, role } }
        localStorage.setItem("accessToken", result.data.accessToken);
        handleRoleSelect(result.data.role);
        return true;
      } else {
        alert(result.message || "Đăng nhập thất bại");
        return false;
      }
    } catch (error) {
      console.error(error);
      alert("Không kết nối được server");
      return false;
    }

    setShowRoleModal(true);
  };

  const handleRoleSelect = (role: string) => {
    localStorage.setItem("role", role);
    if (role === "cbhv") {
      navigate("/students");
    } else if (role === "bgh") {
      navigate("/bgh/assignments");
    } else if (role === "gvbm" || role === "gvcn") {
      navigate("/teacher/classes");
    } else if (role === "hocsinh") {
      navigate("/student/transcript");
    } else {
      alert(`Chức năng đăng nhập cho ${role} đang được phát triển.`);
    }
    setShowRoleModal(false);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-background-light items-center justify-center p-4">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Background"
          className="w-full h-full object-cover opacity-10"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_QkZffvjimURDEcQAlwn5SvaF7rKxlFxtBHZnNLdJ2s4J8l0RnxP8gHGZR2Mad5_DcE2wnu7GWqx5sdJPh3a6hPzWPtJ1kTXUbmSs5uXuTibebGEQfurmxyHH0f7W4he8o5wb1kkUu8Yeo8cmc4Ks_1fQWHKgMsFAYszH3rL-TsUxrcj_Z0bavrb_B45-kYjoh3bR-VmpccL8YO-rktXlW8N6NmgtTpX8YskS1zxgq9CvRN6Lml6nIQJP084Xr96ke6_IIr1ccYg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background-light/80 via-background-light/90 to-background-light"></div>
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-xl border border-surface-dim">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-text-main shadow-sm">
            <School size={32} />
          </div>
          <h1 className="text-2xl font-bold leading-tight text-text-main">
            Đăng nhập Hệ thống
          </h1>
          <p className="text-base text-text-secondary">
            Hệ thống quản lý điểm THPT
          </p>
        </div>

        <form className="flex flex-col gap-5 mt-2" onSubmit={handleLoginSubmit}>
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-medium leading-normal text-text-main pl-1"
              htmlFor="username"
            >
              Tên đăng nhập
            </label>
            <div className="relative flex items-center">
              <User
                size={20}
                className="absolute left-4 text-text-secondary select-none"
              />
              <input
                id="username"
                placeholder="Nhập mã số hoặc tên người dùng"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-full border border-surface-dim bg-background-light focus:border-primary focus:ring-primary h-12 pl-12 pr-4 text-base placeholder:text-text-secondary/60 text-text-main transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-medium leading-normal text-text-main pl-1"
              htmlFor="password"
            >
              Mật khẩu
            </label>
            <div className="relative flex items-center">
              <Lock
                size={20}
                className="absolute left-4 text-text-secondary select-none"
              />
              <input
                id="password"
                placeholder="Nhập mật khẩu của bạn"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-full border border-surface-dim bg-background-light focus:border-primary focus:ring-primary h-12 pl-12 pr-12 text-base placeholder:text-text-secondary/60 text-text-main transition-all"
              />
              <button
                type="button"
                className="absolute right-4 text-text-secondary hover:text-text-main"
              >
                <Eye size={20} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-surface-dim text-primary focus:ring-primary bg-background-light"
              />
              <span className="text-sm text-text-secondary">Ghi nhớ</span>
            </label>
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Quên mật khẩu?
            </a>
          </div>

          <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-primary text-text-main shadow-md hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 text-base font-bold">
            Đăng nhập
          </button>
        </form>

        <div className="mt-2 text-center text-sm text-text-secondary">
          Cần hỗ trợ?{" "}
          <a href="#" className="font-bold text-text-main hover:underline">
            Liên hệ quản trị viên
          </a>
        </div>
      </div>

      <div className="relative z-10 mt-8 text-center">
        <p className="text-xs text-text-secondary/60">
          © 2024 Hệ thống Quản lý Giáo dục. All rights reserved.
        </p>
      </div>

      {/* Role Selection Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-6 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowRoleModal(false)}
              className="absolute right-4 top-4 p-2 text-text-secondary hover:text-text-main hover:bg-surface-dim rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center gap-2 mt-2">
              <div className="size-16 rounded-full bg-surface-dim flex items-center justify-center text-text-main mb-2">
                <School size={32} />
              </div>
              <h2 className="text-2xl font-bold text-text-main">
                Chọn vai trò
              </h2>
              <p className="text-sm text-text-secondary">
                Vui lòng chọn vai trò để tiếp tục
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={() => handleRoleSelect("student")}
                className="group w-full py-4 px-5 bg-white border border-surface-dim hover:bg-surface-dim text-text-main font-bold rounded-2xl text-left shadow-sm active:scale-95 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <GraduationCap size={20} />
                  </div>
                  <span className="text-sm uppercase tracking-wide">
                    Học sinh
                  </span>
                </div>
                <ChevronRight
                  size={18}
                  className="text-text-secondary group-hover:text-text-main transition-colors"
                />
              </button>

              <button
                onClick={() => handleRoleSelect("teacher")}
                className="group w-full py-4 px-5 bg-white border border-surface-dim hover:bg-surface-dim text-text-main font-bold rounded-2xl text-left shadow-sm active:scale-95 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                    <BookOpen size={20} />
                  </div>
                  <span className="text-sm uppercase tracking-wide">
                    Giáo viên
                  </span>
                </div>
                <ChevronRight
                  size={18}
                  className="text-text-secondary group-hover:text-text-main transition-colors"
                />
              </button>

              <button
                onClick={() => handleRoleSelect("staff")}
                className="group w-full py-4 px-5 bg-white border border-surface-dim hover:bg-surface-dim text-text-main font-bold rounded-2xl text-left shadow-sm active:scale-95 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                    <User size={20} />
                  </div>
                  <span className="text-sm uppercase tracking-wide">
                    Cán bộ học vụ
                  </span>
                </div>
                <ChevronRight
                  size={18}
                  className="text-text-secondary group-hover:text-text-main transition-colors"
                />
              </button>

              <button
                onClick={() => handleRoleSelect("board")}
                className="group w-full py-4 px-5 bg-surface-dim/50 border-2 border-primary hover:bg-primary/10 text-text-main font-bold rounded-2xl text-left shadow-sm active:scale-95 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 text-text-main rounded-lg">
                    <Briefcase size={20} />
                  </div>
                  <span className="text-sm uppercase tracking-wide">
                    Ban Giám Hiệu
                  </span>
                </div>
                <ChevronRight
                  size={18}
                  className="text-text-secondary group-hover:text-text-main transition-colors"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
