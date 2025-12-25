import React, { useEffect, useState } from "react";
import { mockClasses } from "./mockData";
import { Layout } from "../../components/Layout";
import { Link } from "react-router-dom";

const ClassList: React.FC = () => {
    const homeroomClasses = mockClasses.filter((c) => c.type === "homeroom");
    const teachingClasses = mockClasses.filter((c) => c.type === "teaching");
    const [classTeach, setClassTeach] = useState<any | null>(null);
    const [teachLoading, setTeachLoading] = useState<boolean>(false);
    const [cnLoading, setCnLoading] = useState<boolean>(false);
    const [classCn, setClassCn] = useState<any | null>(null);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                setCnLoading(true);
                setTeachLoading(true);
                const accessToken = localStorage.getItem("accessToken");
                if (!accessToken) throw new Error("Unauthorize");

                const [cnRes, teachRes] = await Promise.all([
                    fetch("http://localhost:3001/api/class", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }),
                    fetch("http://localhost:3001/api/class", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken}`,
                        },
                    })
                ]);

                if (!cnRes.ok) {
                    const errData = await cnRes.json();
                    throw new Error(errData.message || "Fetch lớp chủ nhiệm thất bại");
                }

                if (!teachRes.ok) {
                    const errData = await teachRes.json();
                    throw new Error(errData.message || "Fetch lớp giảng dạy thất bại");
                }

                const cnData = await cnRes.json();
                const teachData = await teachRes.json();

                console.log("fetch lop chu nhiem", cnData);
                console.log("fetch lop giang day", teachData);

                //setClassCn(cnData.data);
                setClassCn([]);
                setClassTeach(teachData.data);
            } catch (error) {
                console.error(
                    error instanceof Error ? error.message : "Đã có lỗi xảy ra. Hãy thử lại!"
                );
            } finally {
                setCnLoading(false);
                setTeachLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Layout breadcrumbs={["Giáo viên", "Danh sách lớp học"]}>
            <div className="p-4 lg:p-8 max-w-[1440px] mx-auto space-y-8 animate-fade-in">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-text-main">
                            Danh sách lớp học
                        </h2>
                        <p className="text-text-secondary mt-1 text-base">
                            Quản lý thông tin hồ sơ và dữ liệu học tập của học
                            sinh toàn trường.
                        </p>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="bg-surface-light p-4 rounded-2xl shadow-sm border border-surface-dim flex flex-col lg:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary">
                            search
                        </span>
                        <input
                            className="w-full pl-11 pr-4 py-3 bg-surface-dim border-none rounded-xl text-text-main placeholder-text-secondary focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-medium"
                            placeholder="Tìm kiếm tên hoặc mã Lớp..."
                            type="text"
                        />
                    </div>
                    <div className="flex gap-3 w-full lg:w-auto flex-wrap">
                        <div className="relative min-w-[140px] flex-1">
                            <label className="absolute -top-2 left-3 px-1 bg-surface-light text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                                Lớp
                            </label>
                            <select className="w-full px-4 py-3 bg-surface-light border border-surface-dim rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary text-text-main cursor-pointer appearance-none">
                                <option>Tất cả</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none text-lg">
                                expand_more
                            </span>
                        </div>
                        <div className="relative min-w-[140px] flex-1">
                            <label className="absolute -top-2 left-3 px-1 bg-surface-light text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                                Năm học
                            </label>
                            <select className="w-full px-4 py-3 bg-surface-light border border-surface-dim rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary text-text-main cursor-pointer appearance-none">
                                <option>2023 - 2024</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none text-lg">
                                expand_more
                            </span>
                        </div>
                        <button className="flex items-center justify-center gap-2 px-5 py-3 bg-surface-dim hover:bg-[#e8e8d8] rounded-xl text-sm font-bold text-text-main transition-colors">
                            <span className="material-symbols-outlined text-lg">
                                filter_list
                            </span>
                            <span>Bộ lọc khác</span>
                        </button>
                    </div>
                </div>

                {/* Homeroom Section */}
                <section>
                    <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-4 pl-1">
                        Danh sách lớp chủ nhiệm
                    </h3>
                    {cnLoading ? (
                        <p className="text-center">Đang tải...</p>
                    ) : classCn?.length === 0 || !classCn ? (
                        <p className="text-center">
                            Bạn chưa được phân công chủ nhiệm lớp nào
                        </p>
                    ) : (
                        <div className="bg-surface-light rounded-3xl shadow-sm border border-surface-dim overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#fafaf5] text-xs font-bold text-text-secondary uppercase border-b border-surface-dim">
                                            <th className="px-6 py-4 w-10"></th>
                                            <th className="px-6 py-4">Mã Lớp</th>
                                            <th className="px-6 py-4">Tên Lớp</th>
                                            <th className="px-6 py-4">GVCN</th>
                                            <th className="px-6 py-4 text-center">
                                                Khối
                                            </th>
                                            <th className="px-6 py-4">Sĩ số</th>
                                            <th className="px-6 py-4 text-right">
                                                Hành động
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-surface-dim text-sm">
                                        {classCn.map((cls) => (
                                            <tr
                                                key={cls._id}
                                                className="hover:bg-surface-dim/30 transition-colors"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="w-4 h-4 rounded-full border-2 border-surface-dim"></div>
                                                </td>
                                                <td className="px-6 py-4 text-text-main font-bold">
                                                    {cls._id}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-xs font-bold">
                                                        {cls.className}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-text-main font-medium">
                                                    {cls.homeroomTeacher || "Chưa có"}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="bg-surface-dim text-text-secondary px-2 py-1 rounded text-xs font-bold">
                                                        {cls.grade}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-text-main font-medium">
                                                    {cls.quantity}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Link
                                                        to={`/teacher/grades/${cls._id}`}
                                                        className="text-text-main hover:text-primary-hover hover:underline text-sm font-bold"
                                                    >
                                                        Xem lớp
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </section>

                {/* Teaching Section */}
                {teachLoading ? (
                    <p className="text-center">Dang tai...</p>
                ) : (
                    <section>
                        <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-4 pl-1">
                            Danh sách lớp giảng dạy
                        </h3>
                        
                        {classTeach?.length === 0 || !classTeach ? (
                            <p className="text-center">
                                Bạn chưa được phân công giảng dạy lớp nào
                            </p>
                        ) : (
                            <div className="bg-surface-light rounded-3xl shadow-sm border border-surface-dim overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                    <tr className="bg-[#fafaf5] text-xs font-bold text-text-secondary uppercase border-b border-surface-dim">
                                        <th className="px-6 py-4 w-10"></th>
                                        <th className="px-6 py-4">Mã Lớp</th>
                                        <th className="px-6 py-4">Tên Lớp</th>
                                        <th className="px-6 py-4">GVCN</th>
                                        <th className="px-6 py-4 text-center">
                                            Khối
                                        </th>
                                        <th className="px-6 py-4">Môn</th>
                                        <th className="px-6 py-4 text-right">
                                            Hành động
                                        </th>
                                    </tr>
                                </thead>
                                        <tbody className="divide-y divide-surface-dim text-sm">
                                            {classTeach.map((cls: any) => (
                                                <tr
                                                    key={cls._id}
                                                    className="hover:bg-surface-dim/30 transition-colors"
                                                >
                                                    <td className="px-6 py-4 w-10">
                                                        <div className="w-4 h-4 rounded-full border-2 border-surface-dim"></div>
                                                    </td>
                                                    <td className="px-6 py-4 text-text-main font-bold">
                                                        {cls._id}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg text-xs font-bold">
                                                            {cls.className}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-text-main font-medium">
                                                        {cls.fullname ||
                                                            cls.homeroomTeacher }
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="bg-surface-dim text-text-secondary px-2 py-1 rounded text-xs font-bold">
                                                            {cls.grade}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-text-main font-medium">
                                                        {cls.quantity}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <Link
                                                            to={
                                                                `/teacher/inputGrades/${cls._id}`
                                                            }
                                                            className="text-text-main hover:text-primary-hover hover:underline text-sm font-bold"
                                                        >
                                                            Xem lớp
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="px-6 py-4 border-t border-surface-dim flex justify-between items-center text-sm">
                                    <span className="text-text-secondary">
                                        Hiển thị{" "}
                                        <span className="font-bold text-text-main">
                                            1-5
                                        </span>{" "}
                                        trên{" "}
                                        <span className="font-bold text-text-main">
                                            {classTeach.length}
                                        </span>{" "}
                                        học sinh
                                    </span>
                                    <div className="flex gap-2">
                                        <button className="size-8 flex items-center justify-center rounded-lg bg-primary text-text-main font-bold shadow-sm">
                                            1
                                        </button>
                                        <button className="size-8 flex items-center justify-center rounded-lg border border-surface-dim hover:bg-surface-dim text-text-main font-medium">
                                            2
                                        </button>
                                        <button className="size-8 flex items-center justify-center rounded-lg border border-surface-dim hover:bg-surface-dim text-text-main font-medium">
                                            3
                                        </button>
                                        <span className="size-8 flex items-center justify-center text-text-secondary">
                                            ...
                                        </span>
                                        <button className="size-8 flex items-center justify-center rounded-lg border border-surface-dim hover:bg-surface-dim text-text-secondary">
                                            <span className="material-symbols-outlined text-lg">
                                                chevron_right
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                )}
            </div>
        </Layout>
    );
};

export default ClassList;
