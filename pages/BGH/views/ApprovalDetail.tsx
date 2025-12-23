import React, { useState } from 'react';
import { ViewState } from '../../../types';

interface Props {
  onChangeView: (view: ViewState) => void;
}

const ApprovalDetail: React.FC<Props> = ({ onChangeView }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-[1440px] mx-auto p-4 lg:p-8 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-[24px] font-semibold text-text-main tracking-tight mb-1">
            Duyệt Học bạ Lớp 12A1
          </h2>
          <p className="text-text-secondary text-base">
            Xem xét chi tiết và phê duyệt học bạ từng học sinh trong lớp.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-[#eae605] text-text-main px-5 py-2.5 rounded-full font-bold text-sm shadow-sm transition-all active:scale-95 w-fit">
          <span className="material-symbols-outlined !text-[20px]">checklist</span>
          Duyệt tất cả học bạ trong lớp
        </button>
      </div>

      <div className="bg-surface-light rounded-2xl p-4 shadow-sm border border-surface-dim flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
        <div className="relative flex-1 min-w-[200px]">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary !text-[20px]">
            search
          </span>
          <input
            className="w-full pl-11 pr-4 py-3 bg-surface-dim border-none rounded-xl text-text-main placeholder-text-secondary focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm"
            placeholder="Tìm kiếm theo tên/Mã HS..."
            type="text"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative min-w-[140px] flex-1 lg:flex-none">
            <span className="text-[10px] font-bold text-text-secondary absolute left-4 top-1.5 uppercase tracking-wider">
              Năm học
            </span>
            <select className="w-full pt-5 pb-1.5 px-4 bg-surface-dim border-none rounded-xl text-text-main text-sm font-medium focus:ring-2 focus:ring-primary focus:bg-white appearance-none cursor-pointer">
              <option>2023 - 2024</option>
              <option>2022 - 2023</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-main !text-[20px]">
              expand_more
            </span>
          </div>
          <div className="relative min-w-[140px] flex-1 lg:flex-none">
            <span className="text-[10px] font-bold text-text-secondary absolute left-4 top-1.5 uppercase tracking-wider">
              Học kỳ
            </span>
            <select className="w-full pt-5 pb-1.5 px-4 bg-surface-dim border-none rounded-xl text-text-main text-sm font-medium focus:ring-2 focus:ring-primary focus:bg-white appearance-none cursor-pointer">
              <option>Học kỳ II</option>
              <option>Học kỳ I</option>
              <option>Cả năm</option>
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
              <option>Chờ duyệt</option>
              <option>Đã duyệt</option>
              <option>Thiếu thông tin</option>
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
                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider w-12 text-center">
                  <span className="material-symbols-outlined text-[18px]">radio_button_unchecked</span>
                </th>
                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Mã HS</th>
                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Họ tên</th>
                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Ngày sinh</th>
                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Giới tính</th>
                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">
                  Xếp loại HL
                </th>
                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Hạnh kiểm</th>
                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">
                  Trạng thái Học bạ
                </th>
                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider text-right">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-dim">
              {[
                { id: 'HS12001', name: 'Nguyễn Thị Mai Anh', dob: '15/05/2006', gender: 'Nữ', hl: 'Giỏi', hk: 'Tốt', status: 'pending' },
                { id: 'HS12002', name: 'Trần Minh Đức', dob: '22/11/2006', gender: 'Nam', hl: 'Khá', hk: 'Khá', status: 'approved' },
                { id: 'HS12003', name: 'Lê Văn Hùng', dob: '05/02/2006', gender: 'Nam', hl: '-', hk: 'Tốt', status: 'missing' },
                { id: 'HS12004', name: 'Phạm Thu Hà', dob: '12/09/2006', gender: 'Nữ', hl: 'Giỏi', hk: 'Tốt', status: 'pending' },
                { id: 'HS12005', name: 'Vũ Văn Nam', dob: '30/01/2006', gender: 'Nam', hl: 'Khá', hk: 'Khá', status: 'approved' },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-surface-dim/30 transition-colors group">
                  <td className="py-4 px-6 text-center">
                    <input className="text-primary focus:ring-primary size-4" name="student_select" type="radio" />
                  </td>
                  <td className="py-4 px-6 text-[14px] font-medium text-text-secondary">{row.id}</td>
                  <td className="py-4 px-6 text-[14px] font-semibold text-text-main">{row.name}</td>
                  <td className="py-4 px-6 text-[14px] text-text-main">{row.dob}</td>
                  <td className="py-4 px-6 text-[14px] text-text-main">{row.gender}</td>
                  <td className={`py-4 px-6 text-[14px] font-medium ${row.hl === 'Giỏi' ? 'text-green-700' : row.hl === 'Khá' ? 'text-blue-700' : 'text-gray-500'}`}>{row.hl}</td>
                  <td className="py-4 px-6 text-[14px] text-text-main">{row.hk}</td>
                  <td className="py-4 px-6">
                    {row.status === 'pending' && (
                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                        <span className="size-1.5 rounded-full bg-orange-500 mr-1.5"></span>
                        Chờ duyệt
                      </span>
                    )}
                    {row.status === 'approved' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                        <span className="size-1.5 rounded-full bg-green-500 mr-1.5"></span>
                        Đã duyệt
                      </span>
                    )}
                    {row.status === 'missing' && (
                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                        <span className="size-1.5 rounded-full bg-red-500 mr-1.5"></span>
                        Thiếu thông tin
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-dim text-text-main hover:bg-[#e8e8d8] rounded-lg text-xs font-semibold transition-colors" onClick={() => setShowModal(true)}>
                        <span className="material-symbols-outlined !text-[16px]">visibility</span>
                        Xem Preview
                      </button>
                      <button
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm ${row.status === 'pending' ? 'bg-primary text-text-main hover:bg-[#eae605]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                        disabled={row.status !== 'pending'}
                      >
                        <span className="material-symbols-outlined !text-[16px]">check_circle</span>
                        Duyệt
                      </button>
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
            <span className="font-bold text-text-main">42</span> học sinh
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
            <button className="size-8 flex items-center justify-center rounded-lg border border-surface-dim hover:bg-surface-dim text-text-secondary">
              <span className="material-symbols-outlined !text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white w-full max-w-4xl h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">
            <div className="px-8 py-5 border-b border-surface-dim flex items-center justify-between bg-surface-light">
              <div>
                <h3 className="text-xl font-bold text-text-main">Chi tiết Học bạ: Nguyễn Thị Mai Anh</h3>
                <p className="text-sm text-text-secondary">Lớp 12A1 - Năm học 2023-2024</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="size-10 flex items-center justify-center rounded-full bg-surface-dim hover:bg-[#e8e8d8] text-text-main transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 bg-surface-dim/30">
              <div className="bg-white p-8 shadow-sm rounded-xl min-h-full border border-surface-dim">
                <div className="flex justify-between items-start mb-8 border-b border-dashed border-gray-300 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="size-20 bg-gray-200 rounded-lg"></div>
                    <div>
                      <h4 className="text-lg font-bold uppercase">Sở Giáo Dục & Đào Tạo TP.HCM</h4>
                      <p className="text-sm">Trường THPT Chuyên Lê Hồng Phong</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <h2 className="text-2xl font-bold text-text-main uppercase">Học Bạ Học Sinh</h2>
                    <p className="text-sm text-text-secondary">Mã số: HS12001</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <h5 className="font-bold text-text-secondary text-xs uppercase mb-3 tracking-wider">
                      Thông tin cá nhân
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Họ và tên:</span>{' '}
                        <span className="font-semibold">Nguyễn Thị Mai Anh</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Ngày sinh:</span> <span className="font-semibold">15/05/2006</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Giới tính:</span> <span className="font-semibold">Nữ</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Dân tộc:</span> <span className="font-semibold">Kinh</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-bold text-text-secondary text-xs uppercase mb-3 tracking-wider">
                      Kết quả tổng hợp
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Điểm TBCN:</span>{' '}
                        <span className="font-bold text-lg text-primary-600">8.8</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Học lực:</span>{' '}
                        <span className="font-semibold text-green-600">Giỏi</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Hạnh kiểm:</span>{' '}
                        <span className="font-semibold text-green-600">Tốt</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Danh hiệu:</span> <span className="font-semibold">Học sinh Giỏi</span>
                      </div>
                    </div>
                  </div>
                </div>
                <h5 className="font-bold text-text-secondary text-xs uppercase mb-3 tracking-wider">Bảng điểm chi tiết</h5>
                <table className="w-full text-sm border-collapse border border-gray-200 mb-6">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-200 px-4 py-2 text-left">Môn học</th>
                      <th className="border border-gray-200 px-4 py-2 text-center w-24">HK1</th>
                      <th className="border border-gray-200 px-4 py-2 text-center w-24">HK2</th>
                      <th className="border border-gray-200 px-4 py-2 text-center w-24">Cả năm</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2 font-medium">Toán học</td>
                      <td className="border border-gray-200 px-4 py-2 text-center">8.5</td>
                      <td className="border border-gray-200 px-4 py-2 text-center">9.0</td>
                      <td className="border border-gray-200 px-4 py-2 text-center font-bold">8.8</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2 font-medium">Ngữ văn</td>
                      <td className="border border-gray-200 px-4 py-2 text-center">8.0</td>
                      <td className="border border-gray-200 px-4 py-2 text-center">8.5</td>
                      <td className="border border-gray-200 px-4 py-2 text-center font-bold">8.3</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2 font-medium">Tiếng Anh</td>
                      <td className="border border-gray-200 px-4 py-2 text-center">9.5</td>
                      <td className="border border-gray-200 px-4 py-2 text-center">9.0</td>
                      <td className="border border-gray-200 px-4 py-2 text-center font-bold">9.3</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2 font-medium">Vật lý</td>
                      <td className="border border-gray-200 px-4 py-2 text-center">8.8</td>
                      <td className="border border-gray-200 px-4 py-2 text-center">8.5</td>
                      <td className="border border-gray-200 px-4 py-2 text-center font-bold">8.7</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="px-8 py-5 border-t border-surface-dim bg-surface-light flex justify-between items-center">
              <p className="text-sm text-text-secondary italic">
                Hành động này sẽ cập nhật trạng thái học bạ của học sinh.
              </p>
              <div className="flex gap-3">
                <button
                   onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-full border border-red-200 bg-red-50 text-red-700 font-bold text-sm hover:bg-red-100 transition-colors"
                >
                  Từ chối
                </button>
                <button
                   onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-full bg-primary text-text-main font-bold text-sm shadow-sm hover:bg-[#eae605] transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined !text-[18px]">check</span>
                  Duyệt Học bạ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalDetail;