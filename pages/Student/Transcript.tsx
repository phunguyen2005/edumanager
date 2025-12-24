import React, { useState, useEffect } from "react";
import { TranscriptSubject } from "../../types";
import { Layout } from "../../components/Layout";

const Transcript: React.FC = () => {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [studentInfo, setStudentInfo] = useState<any>(null);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await fetch(
        "http://localhost:3001/api/student/subject-grades",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();

      if (res.status === 200) {
        setSubjects(result.data);

        if (result.data.length > 0) {
          setStudentInfo({
            studentId: result.data[0].studentId,
            studentName: result.data[0].studentName,
          });
          localStorage.setItem("name", result.data.studentName);
        }
      } else {
        console.error("Fetch info failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <Layout breadcrumbs={["Học sinh", "Bảng điểm"]}>
      <div className="max-w-[1440px] mx-auto p-4 lg:p-8 flex flex-col gap-6">
        {/* Title & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl lg:text-[24px] font-semibold text-text-main tracking-tight mb-1">
              Bảng điểm học kỳ
            </h2>
            <p className="text-text-secondary text-base">
              Xem chi tiết điểm số các môn học trong học kỳ hiện tại.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-surface-light hover:bg-surface-dim border border-surface-dim text-text-main px-5 py-2.5 rounded-full font-medium text-sm transition-all">
              <span className="material-symbols-outlined !text-[20px]">
                print
              </span>
              In bảng điểm
            </button>
            <button className="flex items-center gap-2 bg-primary hover:bg-[#5066d6] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-sm transition-all active:scale-95">
              <span className="material-symbols-outlined !text-[20px]">
                check_circle
              </span>
              Xác nhận điểm
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-surface-light rounded-2xl p-4 shadow-sm border border-surface-dim flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          <div className="relative flex-1 min-w-[200px] lg:max-w-[300px]">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary !text-[20px]">
              search
            </span>
            <input
              className="w-full pl-11 pr-4 py-3 bg-surface-dim border-none rounded-xl text-text-main placeholder-text-secondary focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm outline-none"
              placeholder="Tìm môn học..."
              type="text"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="relative min-w-[180px] flex-1 lg:flex-none">
              <span className="text-[10px] font-bold text-text-secondary absolute left-4 top-1.5 uppercase tracking-wider">
                Năm học
              </span>
              <select className="w-full pt-5 pb-1.5 px-4 bg-surface-dim border-none rounded-xl text-text-main text-sm font-medium focus:ring-2 focus:ring-primary focus:bg-white appearance-none cursor-pointer outline-none">
                <option>2024 - 2025</option>
                <option>2023 - 2024</option>
                <option>2022 - 2023</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-main !text-[20px]">
                expand_more
              </span>
            </div>
            <div className="relative min-w-[180px] flex-1 lg:flex-none">
              <span className="text-[10px] font-bold text-text-secondary absolute left-4 top-1.5 uppercase tracking-wider">
                Học kỳ
              </span>
              <select className="w-full pt-5 pb-1.5 px-4 bg-surface-dim border-none rounded-xl text-text-main text-sm font-medium focus:ring-2 focus:ring-primary focus:bg-white appearance-none cursor-pointer outline-none">
                <option>Học kỳ 1</option>
                <option>Học kỳ 2</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-main !text-[20px]">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-surface-light rounded-3xl border border-surface-dim shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-dim bg-[#fafaf5]">
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider w-[80px]">
                    STT
                  </th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider min-w-[200px]">
                    Môn học
                  </th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider min-w-[150px]">
                    15 phút
                  </th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider min-w-[100px]">
                    1 tiết
                  </th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider min-w-[100px]">
                    Thi cuối kỳ
                  </th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider min-w-[100px] text-right">
                    Tổng kết
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-dim">
                {subjects.length > 0 ? (
                  subjects.map((subject, index) => (
                    <tr
                      key={subject._id}
                      className="hover:bg-surface-dim/30 transition-colors"
                    >
                      {/* STT */}
                      <td className="py-4 px-6 text-sm text-text-secondary">
                        {index + 1}
                      </td>

                      {/* Môn học */}
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium text-text-main">
                          {subject.subjectName}
                        </span>
                      </td>

                      {/* 15 phút */}
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-surface-dim rounded text-sm font-medium">
                          {subject.hs1?.toFixed(1)}
                        </span>
                      </td>

                      {/* 1 tiết */}
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-surface-dim rounded text-sm font-medium">
                          {subject.hs2?.toFixed(1)}
                        </span>
                      </td>

                      {/* Thi cuối kỳ */}
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-surface-dim rounded text-sm font-medium">
                          {subject.hs3?.toFixed(1)}
                        </span>
                      </td>

                      {/* Tổng kết – tạm tính */}
                      <td className="py-4 px-6 text-right font-bold">
                        {(
                          (subject.hs1 + subject.hs2 * 2 + subject.hs3 * 3) /
                          6
                        ).toFixed(1)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-6 text-center text-text-secondary"
                    >
                      Không có dữ liệu điểm
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Transcript;
