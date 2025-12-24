import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";

const TeachingAssignment: React.FC = () => {
  const [teachers, setTeachers] = useState<any[]>([]);

  const fetchTeachers = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        console.error("Không tìm thấy accessToken");
        return;
      }

      const res = await fetch("http://localhost:3001/api/teacher", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();

      if (res.status === 200) {
        setTeachers(result.data); // giả sử BE trả { data: [...] }
      } else {
        console.error("Fetch teacher failed:", result);
      }
    } catch (error) {
      console.error("Fetch teacher error:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const renderTeacherOptions = () =>
    teachers.map((gv) => (
      <option key={gv._id} value={gv._id}>
        {gv.fullname}
      </option>
    ));

  return (
    <Layout breadcrumbs={["Ban Giám Hiệu", "Phân công giảng dạy"]}>
      <div className="max-w-[1440px] mx-auto p-4 lg:p-8 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl lg:text-[24px] font-semibold text-text-main tracking-tight mb-1">
              Phân công giảng dạy
            </h2>
            <p className="text-text-secondary text-base">
              Thiết lập giáo viên chủ nhiệm và giáo viên bộ môn cho các lớp học
              năm 2024-2025.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-surface-light hover:bg-surface-dim border border-surface-dim text-text-main px-5 py-2.5 rounded-full font-medium text-sm transition-all">
              <span className="material-symbols-outlined !text-[20px]">
                file_upload
              </span>
              Nhập từ Excel
            </button>
            <button className="flex items-center gap-2 bg-primary hover:bg-[#eae605] text-text-main px-5 py-2.5 rounded-full font-bold text-sm shadow-sm transition-all active:scale-95">
              <span className="material-symbols-outlined !text-[20px]">
                save
              </span>
              Lưu phân công
            </button>
          </div>
        </div>

        <div className="bg-surface-light rounded-2xl p-4 shadow-sm border border-surface-dim flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          <div className="relative flex-1 min-w-[200px]">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary !text-[20px]">
              search
            </span>
            <input
              className="w-full pl-11 pr-4 py-3 bg-surface-dim border-none rounded-xl text-text-main placeholder-text-secondary focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm"
              placeholder="Tìm kiếm lớp học..."
              type="text"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="relative min-w-[160px] flex-1 lg:flex-none">
              <span className="text-[10px] font-bold text-text-secondary absolute left-4 top-1.5 uppercase tracking-wider">
                Khối
              </span>
              <select className="w-full pt-5 pb-1.5 px-4 bg-surface-dim border-none rounded-xl text-text-main text-sm font-medium focus:ring-2 focus:ring-primary focus:bg-white appearance-none cursor-pointer">
                <option>Tất cả khối</option>
                <option>Khối 10</option>
                <option>Khối 11</option>
                <option>Khối 12</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-main !text-[20px]">
                expand_more
              </span>
            </div>
            <div className="relative min-w-[160px] flex-1 lg:flex-none">
              <span className="text-[10px] font-bold text-text-secondary absolute left-4 top-1.5 uppercase tracking-wider">
                Trạng thái
              </span>
              <select className="w-full pt-5 pb-1.5 px-4 bg-surface-dim border-none rounded-xl text-text-main text-sm font-medium focus:ring-2 focus:ring-primary focus:bg-white appearance-none cursor-pointer">
                <option>Tất cả</option>
                <option>Chưa đủ GV</option>
                <option>Đã đủ GV</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-main !text-[20px]">
                expand_more
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-6 text-center whitespace-nowrap">Lớp</th>
                <th className="py-3 px-6 text-center whitespace-nowrap">Giáo viên chủ nhiệm</th>
                <th className="py-3 px-6 text-center whitespace-nowrap">Toán</th>
                <th className="py-3 px-6 text-center whitespace-nowrap">Văn</th>
                <th className="py-3 px-6 text-center whitespace-nowrap">Hoá</th>
                <th className="py-3 px-6 text-center whitespace-nowrap">Ngữ văn</th>
                <th className="py-3 px-6 text-center whitespace-nowrap">Lịch sử</th>
                <th className="py-3 px-6 text-center whitespace-nowrap">Địa lí</th>
                <th className="py-3 px-6 text-center whitespace-nowrap">Sinh học</th>
                <th className="py-3 px-6 text-center whitespace-nowrap">Tiếng anh</th>
                <th className="py-3 px-6 text-center whitespace-nowrap">Giáo dục công dân</th>
                <th className="py-3 px-6 text-center whitespace-nowrap">Công nghệ</th>
                <th className="py-3 px-6 text-center whitespace-nowrap">Giáo dục quốc phòng</th>
                <th className="py-3 px-6 text-center whitespace-nowrap">Giáo dục thể chất</th>
                <th className="py-3 px-6 text-center whitespace-nowrap">Tin học</th>
              </tr>
            </thead>

            <tbody>
              {["10A1", "10A2", "10A3"].map((lop) => (
                <tr key={lop} className="border-b">
                  <td className="py-3 px-4 font-medium">{lop}</td>

                  {/* GVCN */}
                  <td className="py-3 px-4">
                    <select className="w-full py-2 px-3 border rounded-lg">
                      <option value="">-- Chọn GVCN --</option>
                      {renderTeacherOptions()}
                    </select>
                  </td>

                  {/* Toán */}
                  <td className="py-3 px-4">
                    <select className="w-full py-2 px-3 border rounded-lg">
                      <option value="">-- Chọn GV --</option>
                      {renderTeacherOptions()}
                    </select>
                  </td>

                  {/* Văn */}
                  <td className="py-3 px-4">
                    <select className="w-full py-2 px-3 border rounded-lg">
                      <option value="">-- Chọn GV --</option>
                      {renderTeacherOptions()}
                    </select>
                  </td>

                  {/* Anh */}
                  <td className="py-3 px-4">
                    <select className="w-full py-2 px-3 border rounded-lg">
                      <option value="">-- Chọn GV --</option>
                      {renderTeacherOptions()}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default TeachingAssignment;
