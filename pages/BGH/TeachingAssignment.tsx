import React from 'react';
import { Layout } from '../../components/Layout';

const TeachingAssignment: React.FC = () => {
  return (
    <Layout breadcrumbs={['Ban Giám Hiệu', 'Phân công giảng dạy']}>
      <div className="max-w-[1440px] mx-auto p-4 lg:p-8 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl lg:text-[24px] font-semibold text-text-main tracking-tight mb-1">
              Phân công giảng dạy
            </h2>
            <p className="text-text-secondary text-base">
              Thiết lập giáo viên chủ nhiệm và giáo viên bộ môn cho các lớp học năm 2024-2025.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-surface-light hover:bg-surface-dim border border-surface-dim text-text-main px-5 py-2.5 rounded-full font-medium text-sm transition-all">
              <span className="material-symbols-outlined !text-[20px]">file_upload</span>
              Nhập từ Excel
            </button>
            <button className="flex items-center gap-2 bg-primary hover:bg-[#eae605] text-text-main px-5 py-2.5 rounded-full font-bold text-sm shadow-sm transition-all active:scale-95">
              <span className="material-symbols-outlined !text-[20px]">save</span>
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

        <div className="bg-surface-light rounded-3xl border border-surface-dim shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-dim bg-[#fafaf5]">
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider w-[100px]">
                    Lớp
                  </th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider min-w-[220px]">
                    Giáo viên chủ nhiệm
                  </th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider min-w-[200px]">
                    Toán học
                  </th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider min-w-[200px]">
                    Ngữ Văn
                  </th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider min-w-[200px]">
                    Tiếng Anh
                  </th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider min-w-[200px]">
                    Vật lý
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-dim">
                {[
                  { class: '10A1', count: 42, homeroom: 'Nguyễn Thị Mai (GV001)', math: 'Phạm Văn Minh', lit: 'Lê Thu Hà', eng: '', phy: 'Trương Văn Long', engError: true },
                  { class: '10A2', count: 40, homeroom: 'Hoàng Văn Thái (GV005)', math: 'Đinh Văn Nam', lit: 'Nguyễn Thị Hồng', eng: 'Trần Minh Tú', phy: 'Phạm Thị Lan' },
                  { class: '10A3', count: 41, homeroom: 'Nguyễn Thị Cúc (GV006)', math: 'Phan Thị Ánh', lit: 'Bùi Văn Kiên', eng: 'David Smith', phy: 'Trương Văn Long' },
                  { class: '11A1', count: 38, homeroom: '', math: 'Phạm Văn Minh', lit: 'Lê Thu Hà', eng: 'David Smith', phy: 'Trương Văn Long', homeroomError: true },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-surface-dim/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-text-main">{row.class}</span>
                        <span className="text-xs text-text-secondary">{row.count} học sinh</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="relative group">
                        <select defaultValue={row.homeroom} className="w-full py-2 pl-3 pr-8 bg-white border border-surface-dim rounded-lg text-sm text-text-main focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer hover:border-text-secondary/50 transition-colors">
                          <option value="">-- Chọn GVCN --</option>
                          {row.homeroom && <option value={row.homeroom}>{row.homeroom}</option>}
                          <option value="gv_new">Lê Thị Lan (GV003)</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary !text-[18px]">
                          arrow_drop_down
                        </span>
                      </div>
                      {row.homeroomError && <span className="text-[10px] text-red-500 mt-1 block flex items-center gap-1"><span className="material-symbols-outlined !text-[12px]">error</span> Chưa chọn GVCN</span>}
                    </td>
                    <td className="py-4 px-6">
                      <div className="relative">
                         <select defaultValue={row.math} className="w-full py-2 pl-3 pr-8 bg-white border border-surface-dim rounded-lg text-sm text-text-main focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer hover:border-text-secondary/50 transition-colors">
                          <option>{row.math || '-- Chọn GV --'}</option>
                          <option>Hoàng Thị Thảo</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary !text-[18px]">arrow_drop_down</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                       <div className="relative">
                         <select defaultValue={row.lit} className="w-full py-2 pl-3 pr-8 bg-white border border-surface-dim rounded-lg text-sm text-text-main focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer hover:border-text-secondary/50 transition-colors">
                          <option>{row.lit || '-- Chọn GV --'}</option>
                          <option>Nguyễn Bích Ngọc</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary !text-[18px]">arrow_drop_down</span>
                      </div>
                    </td>
                     <td className="py-4 px-6">
                       <div className="relative">
                         <select defaultValue={row.eng} className="w-full py-2 pl-3 pr-8 bg-white border border-surface-dim rounded-lg text-sm text-text-main focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer hover:border-text-secondary/50 transition-colors">
                          <option value="">{row.eng || '-- Chọn GV --'}</option>
                          <option>David Smith</option>
                          <option>Nguyễn Tuấn Anh</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary !text-[18px]">arrow_drop_down</span>
                      </div>
                       {row.engError && <span className="text-[10px] text-red-500 mt-1 block flex items-center gap-1"><span className="material-symbols-outlined !text-[12px]">error</span> Chưa chọn GV</span>}
                    </td>
                    <td className="py-4 px-6">
                       <div className="relative">
                         <select defaultValue={row.phy} className="w-full py-2 pl-3 pr-8 bg-white border border-surface-dim rounded-lg text-sm text-text-main focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer hover:border-text-secondary/50 transition-colors">
                          <option>{row.phy || '-- Chọn GV --'}</option>
                           <option>Đỗ Thị Hạnh</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary !text-[18px]">arrow_drop_down</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-6 py-4 bg-surface-light border-t border-surface-dim">
            <span className="text-sm text-text-secondary">
              Hiển thị <span className="font-bold text-text-main">1-5</span> trên{' '}
              <span className="font-bold text-text-main">36</span> lớp học
            </span>
            <div className="flex items-center gap-2">
              <button className="size-8 flex items-center justify-center rounded-lg border border-surface-dim hover:bg-surface-dim text-text-secondary disabled:opacity-50">
                <span className="material-symbols-outlined !text-[18px]">chevron_left</span>
              </button>
              <button className="size-8 flex items-center justify-center rounded-lg bg-primary text-text-main text-sm font-bold shadow-sm">
                1
              </button>
              <button className="size-8 flex items-center justify-center rounded-lg border border-surface-dim hover:bg-surface-dim text-text-main text-sm">
                2
              </button>
              <button className="size-8 flex items-center justify-center rounded-lg border border-surface-dim hover:bg-surface-dim text-text-main text-sm">
                3
              </button>
               <span className="text-text-secondary px-1">...</span>
              <button className="size-8 flex items-center justify-center rounded-lg border border-surface-dim hover:bg-surface-dim text-text-secondary">
                <span className="material-symbols-outlined !text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TeachingAssignment;