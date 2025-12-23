import React from 'react';
import { Layout } from '../../components/Layout';
import { Plus, Search, Filter, Edit, Trash2, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeacherList = () => {
  const navigate = useNavigate();

  const teachers = [
    { id: 'GV2023001', name: 'Nguyễn Văn Hùng', specialization: 'Toán học', degree: 'Thạc sĩ', email: 'hung.nv@school.edu.vn', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqcIBt1S_f0uPce4ZsG8p0SbTMRnxt18xFlW57uXIAAUKd7Vkq5PPg4xEa_sXx7T8N6DiZR259MCJMgn7WqsUzrlJn-0tJWiP998yImvEXJ6fbYc09dSq5uVR4IogrcZY4h59HANP8_jnNa6cI9--Xe3CNzDxlS0HqfPpreeHi1CgOgzfPmU7oBfYymzfVlcBqeVMLkM_OUXOAMc9fyY3woNkiwrrtNnAZM-woNt3pyohWYm5nWWbbsp6SPSmJajkik520J1OHt7g' },
    { id: 'GV2023012', name: 'Trần Thị Bình', specialization: 'Ngữ văn', degree: 'Cử nhân', email: 'binh.tt@school.edu.vn', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAh1u-bvl2BhUpov_BBXH4NstErn9F52118WsJ7Rptu_vrqZ7MbG_mFiyKH_KSMcEdwl1Ww8bkVxZ5_rWYRFZnpscpnyTkfVe_Yhd8lpdGp5sSAlyGSmwpcJ14zwjMY9AfYvLF0KMM5EDC52uGuuw3NzGomplt4ZqNqKMVOM57ySfWOp8Y6lRWKZaqzqSpRgmZFzIuvo0wvk81tg9HZJLXZToGfefv1dcDO1yAT3OuPn1Q67GASZXcAuSBcaLJF9jjzm-lT8GsGmGU' },
    { id: 'GV2023028', name: 'Lê Văn Đức', specialization: 'Vật lý', degree: 'Thạc sĩ', email: 'duc.lv@school.edu.vn', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHx0nI-7id6oVyRENmKEcDyLYz-lNceLBxjZ2abo6S6bjiBAhz1SkBa2vm3P7AVQU9GSkLaFv8VpBpFF2a8KqgqkNsS8UsIIO6PpJTP_-rTHBLPXCglbeb1oM5S1qTvm0fNL0Nc4r41_xPppJy1xhDaczxTeZfLgybDhOgCvopuAW_Tdry41eOrk6mtHJCebh9d3ypnqhxYJW5nuUy1UzqC3vrof3WdktZD5Pdl3fSrCXe1vgS7S_h5PCbVu71v13szvm0SovZUFI' },
    { id: 'GV2023035', name: 'Phạm Thị Mai', specialization: 'Tiếng Anh', degree: 'Cử nhân', email: 'mai.pt@school.edu.vn', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFnr40A77Gup57_ZgpTXGyYByxPwUDdzcEKadp2-Xmvz-6B8_R_d16wg1qZh84FbusRAbxlGjHxyTWrJetokYoEvTLmqGYb4vc83CDWiCWbmcELSdqnOJIojgGRjt1a190spT2K-WrV51Fs3IQxfpmh10GI2aHeTT5OENKPZgHNdr-XX95aT58AeRpwzLtHblxAVNjkK2c2xfvGs3SN9bEo1DaoPrXFXvKYYailk-p272YGbXT3m_xPK82jbK8qnNSviV9cBGEta4' },
    { id: 'GV2023041', name: 'Hoàng Văn Nam', specialization: 'Hóa học', degree: 'Tiến sĩ', email: 'nam.hv@school.edu.vn', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcBnZ0pM2EKuclrF9mg_0QFZXVTjLX15vnmNHB5jsvBrnGo_8SMPF5vkbjvKvsU1JexpODyciKXUuCv03w6N0oDOaK8fwdDYeEmuhcgCXFLjvg2oELc9tdykr1iU2ZuTbngzCBh85X0mm4Z2_RmihNEJqAU8YIuSzJdUkh00hYisIZK7KakqF93eHNvNkCkJwA9pqvthyFI4K3CQnIHEzhcjhGGjal8Coacfz4GRbcZEqdP2WGLB43Kha4X2BK-b0_u6zVEM3FpjA' },
  ];

  const getDegreeColor = (degree: string) => {
      switch(degree) {
          case 'Thạc sĩ': return 'bg-blue-50 text-blue-600 font-bold';
          case 'Cử nhân': return 'bg-purple-50 text-purple-600 font-bold';
          case 'Tiến sĩ': return 'bg-orange-50 text-orange-600 font-bold';
          default: return 'bg-gray-100 text-gray-700';
      }
  }

  return (
    <Layout breadcrumbs={['Trang chủ', 'Giáo viên', 'Danh sách']}>
        <div className="max-w-[1440px] mx-auto p-4 lg:p-8 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-2xl lg:text-[28px] font-bold text-text-main tracking-tight mb-1">Danh sách giáo viên</h2>
                    <p className="text-text-secondary text-base">Quản lý hồ sơ, bằng cấp và phân công chuyên môn của giáo viên.</p>
                </div>
                <button 
                    onClick={() => navigate('/teachers/add')}
                    className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-text-main px-5 py-2.5 rounded-full font-bold text-sm shadow-sm transition-all active:scale-95 w-fit"
                >
                    <Plus size={20} />
                    Thêm giáo viên mới
                </button>
            </div>

            {/* Filters */}
            <div className="bg-surface-light rounded-2xl p-4 shadow-sm border border-surface-dim flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                    <input 
                        className="w-full pl-11 pr-4 py-3 bg-surface-dim border-none rounded-xl text-text-main placeholder-text-secondary focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm" 
                        placeholder="Tìm kiếm tên hoặc mã GV..." 
                        type="text"
                    />
                </div>
                <div className="flex flex-wrap gap-3">
                    <div className="relative min-w-[160px] flex-1 lg:flex-none">
                        <span className="text-[10px] font-bold text-text-secondary absolute left-4 top-1.5 uppercase tracking-wider">Chuyên môn</span>
                        <select className="w-full pt-5 pb-1.5 px-4 bg-surface-dim border-none rounded-xl text-text-main text-sm font-bold focus:ring-2 focus:ring-primary focus:bg-white appearance-none cursor-pointer">
                            <option>Tất cả</option>
                            <option>Toán học</option>
                            <option>Ngữ văn</option>
                            <option>Tiếng Anh</option>
                        </select>
                    </div>
                    <div className="relative min-w-[160px] flex-1 lg:flex-none">
                        <span className="text-[10px] font-bold text-text-secondary absolute left-4 top-1.5 uppercase tracking-wider">Bằng cấp</span>
                        <select className="w-full pt-5 pb-1.5 px-4 bg-surface-dim border-none rounded-xl text-text-main text-sm font-bold focus:ring-2 focus:ring-primary focus:bg-white appearance-none cursor-pointer">
                            <option>Tất cả</option>
                            <option>Cử nhân</option>
                            <option>Thạc sĩ</option>
                            <option>Tiến sĩ</option>
                        </select>
                    </div>
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-surface-dim hover:bg-[#e8e8d8] rounded-xl text-text-main font-bold transition-colors lg:w-auto w-full">
                        <Filter size={20} />
                        <span className="text-sm">Bộ lọc khác</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-surface-light rounded-3xl border border-surface-dim shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-surface-dim bg-[#fafaf5]">
                                <th className="py-4 px-6 w-12 text-center"><input type="checkbox" className="rounded-full border-gray-300 text-primary focus:ring-primary size-5" /></th>
                                <th className="py-4 px-6 text-[11px] font-extrabold text-text-secondary uppercase tracking-wider">Mã GV</th>
                                <th className="py-4 px-6 text-[11px] font-extrabold text-text-secondary uppercase tracking-wider">Họ và tên</th>
                                <th className="py-4 px-6 text-[11px] font-extrabold text-text-secondary uppercase tracking-wider">Chuyên môn</th>
                                <th className="py-4 px-6 text-[11px] font-extrabold text-text-secondary uppercase tracking-wider">Bằng cấp</th>
                                <th className="py-4 px-6 text-[11px] font-extrabold text-text-secondary uppercase tracking-wider">Email liên hệ</th>
                                <th className="py-4 px-6 text-[11px] font-extrabold text-text-secondary uppercase tracking-wider text-right">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-dim">
                            {teachers.map((teacher) => (
                                <tr key={teacher.id} className="hover:bg-surface-dim/30 transition-colors group">
                                    <td className="py-5 px-6 text-center"><input type="checkbox" className="rounded-full border-gray-300 text-primary focus:ring-primary size-5" /></td>
                                    <td className="py-5 px-6 text-sm font-bold text-text-main">{teacher.id}</td>
                                    <td className="py-5 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-full bg-gray-100 bg-cover shadow-sm" style={{backgroundImage: `url("${teacher.avatar}")`}}></div>
                                            <span className="text-sm font-bold text-text-main">{teacher.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6 text-sm font-medium text-text-main">{teacher.specialization}</td>
                                    <td className="py-5 px-6">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs ${getDegreeColor(teacher.degree)}`}>
                                            {teacher.degree}
                                        </span>
                                    </td>
                                    <td className="py-5 px-6 text-sm text-text-secondary font-medium">{teacher.email}</td>
                                    <td className="py-5 px-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-text-secondary hover:text-text-main hover:bg-surface-dim rounded-full transition-colors">
                                                <Edit size={18} />
                                            </button>
                                            <button className="p-2 text-text-secondary hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-6 bg-surface-light border-t border-surface-dim gap-4">
                    <span className="text-sm text-text-secondary">Hiển thị <span className="font-bold text-text-main">1-5</span> trên <span className="font-bold text-text-main">58</span> giáo viên</span>
                    <div className="flex items-center gap-2">
                        <button className="size-9 flex items-center justify-center rounded-full border border-surface-dim hover:bg-surface-dim text-text-secondary disabled:opacity-50 transition-colors">
                            <ChevronLeft size={18} />
                        </button>
                        <button className="size-9 flex items-center justify-center rounded-full bg-primary text-text-main text-sm font-bold shadow-sm">1</button>
                        <button className="size-9 flex items-center justify-center rounded-full border border-surface-dim hover:bg-surface-dim text-text-main text-sm font-medium transition-colors">2</button>
                        <button className="size-9 flex items-center justify-center rounded-full border border-surface-dim hover:bg-surface-dim text-text-main text-sm font-medium transition-colors">3</button>
                        <span className="text-text-secondary text-sm px-1 font-medium">...</span>
                        <button className="size-9 flex items-center justify-center rounded-full border border-surface-dim hover:bg-surface-dim text-text-main text-sm font-medium transition-colors">6</button>
                        <button className="size-9 flex items-center justify-center rounded-full border border-surface-dim hover:bg-surface-dim text-text-secondary transition-colors">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}
export default TeacherList;