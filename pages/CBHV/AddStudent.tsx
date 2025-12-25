import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Save, User, Phone, Calendar } from 'lucide-react'; // Added icons
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentId: '',
    fullname: '',
    dob: '',
    sex: '',
    address: '',
    parentContact: '',
    yoe: new Date().getFullYear()
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validation basic
    if (!formData.studentId || !formData.fullname || !formData.dob || !formData.sex || !formData.parentContact) {
      alert('Vui lòng điền đầy đủ các trường bắt buộc (*)');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('http://localhost:3001/api/student/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (res.ok) {
        alert('Thêm học sinh thành công! Thông tin đăng nhập mặc định đã được tạo.');
        navigate('/students'); // Go back to list
      } else {
        alert(result.message || 'Thêm học sinh thất bại');
      }
    } catch (error) {
      console.error(error);
      alert('Lỗi kết nối server');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout breadcrumbs={['Quản lý học sinh', 'Thêm mới HS']}>
      <div className="max-w-[1000px] mx-auto flex flex-col gap-8 p-4 lg:p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-text-main text-3xl md:text-4xl font-black leading-tight tracking-tight">Thêm Mới Học Sinh</h1>
          <p className="text-text-secondary text-base md:text-lg">Tạo hồ sơ học sinh mới. Học sinh sau khi tạo sẽ nằm trong danh sách <strong>Chờ xếp lớp</strong>.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-surface-light border border-surface-dim rounded-[2rem] p-6 md:p-10 shadow-sm">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 border-b border-surface-dim pb-2 mb-2">
              <h3 className="text-lg font-bold text-text-main flex items-center gap-2">
                <User size={24} className="text-text-secondary" />
                Thông tin hồ sơ
              </h3>
            </div>

            <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
              <label className="text-text-main text-sm font-normal" htmlFor="studentId">Mã HS <span className="text-red-500">*</span></label>
              <input
                id="studentId"
                value={formData.studentId}
                onChange={handleChange}
                type="text"
                placeholder="VD: HS2024001"
                className="w-full h-14 bg-white rounded-xl border border-surface-dim px-4 text-base text-text-main placeholder:text-text-secondary/70 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
              />
            </div>

            <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
              <label className="text-text-main text-sm font-normal" htmlFor="fullname">Họ tên <span className="text-red-500">*</span></label>
              <input
                id="fullname"
                value={formData.fullname}
                onChange={handleChange}
                type="text"
                placeholder="Nhập họ và tên đầy đủ"
                className="w-full h-14 bg-white rounded-xl border border-surface-dim px-4 text-base text-text-main placeholder:text-text-secondary/70 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
              />
            </div>

            <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
              <label className="text-text-main text-sm font-normal" htmlFor="dob">Ngày sinh <span className="text-red-500">*</span></label>
              <input
                id="dob"
                value={formData.dob}
                onChange={handleChange}
                type="date"
                className="w-full h-14 bg-white rounded-xl border border-surface-dim px-4 text-base text-text-main focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
              />
            </div>

            <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
              <label className="text-text-main text-sm font-normal" htmlFor="sex">Giới tính <span className="text-red-500">*</span></label>
              <select
                id="sex"
                value={formData.sex}
                onChange={handleChange}
                className="w-full h-14 bg-white rounded-xl border border-surface-dim px-4 text-base text-text-main focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all shadow-sm appearance-none cursor-pointer">
                <option value="" disabled>Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>

            {/* Thay thế Select Class bằng Year of Enrollment & Parent Contact */}
            <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
              <label className="text-text-main text-sm font-normal" htmlFor="yoe">Năm nhập học <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  id="yoe"
                  value={formData.yoe}
                  onChange={handleChange}
                  type="number"
                  className="w-full h-14 bg-white rounded-xl border border-surface-dim px-4 pl-12 text-base text-text-main focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
                />
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
              </div>
            </div>

            <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
              <label className="text-text-main text-sm font-normal" htmlFor="parentContact">Liên hệ Phụ Huynh <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  id="parentContact"
                  value={formData.parentContact}
                  onChange={handleChange}
                  type="text"
                  placeholder="SĐT Phụ huynh"
                  className="w-full h-14 bg-white rounded-xl border border-surface-dim px-4 pl-12 text-base text-text-main placeholder:text-text-secondary/70 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
                />
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
              </div>
            </div>

            <div className="col-span-12 flex flex-col gap-2">
              <label className="text-text-main text-sm font-normal" htmlFor="address">Địa chỉ liên hệ</label>
              <textarea
                id="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                placeholder="Nhập số nhà, tên đường, phường/xã, quận/huyện..."
                className="w-full bg-white rounded-xl border border-surface-dim px-4 py-3 text-base text-text-main placeholder:text-text-secondary/70 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all shadow-sm resize-none"
              ></textarea>
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row justify-end items-center gap-4 mt-10 pt-6 border-t border-surface-dim">
            <button
              type="button"
              onClick={() => navigate('/students')}
              className="w-full md:w-auto px-8 h-12 rounded-full border border-text-main/10 text-text-main font-semibold bg-white hover:bg-surface-dim transition-colors"
              disabled={loading}
            >
              Hủy quay lại
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-8 h-12 rounded-full bg-primary text-text-main font-bold hover:bg-[#eae605] shadow-md transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <Save size={20} />
              {loading ? 'Đang lưu...' : 'Lưu hồ sơ'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddStudent;