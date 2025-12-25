import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Save, User, Mail, Phone, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddTeacher = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        dob: '',
        sex: '',
        address: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Validation
        if (!formData.fullname || !formData.email || !formData.password || !formData.dob || !formData.sex || !formData.phone || !formData.address) {
            alert('Vui lòng điền đầy đủ thông tin (*)');
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch('http://localhost:3001/api/teacher/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (res.ok) {
                alert('Thêm giáo viên thành công!');
                navigate('/teachers');
            } else {
                alert(data.message || 'Thêm giáo viên thất bại');
            }
        } catch (error) {
            console.error(error);
            alert('Lỗi kết nối server');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Layout breadcrumbs={['Quản lý giáo viên', 'Thêm mới GV']}>
            <div className="max-w-[1000px] mx-auto flex flex-col gap-8 p-4 lg:p-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-text-main text-3xl md:text-4xl font-black leading-tight tracking-tight">Thêm Mới Giáo Viên</h1>
                    <p className="text-text-secondary text-base md:text-lg">Tạo hồ sơ giáo viên mới và cấp tài khoản đăng nhập.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-surface-light border border-surface-dim rounded-[2rem] p-6 md:p-10 shadow-sm">
                    <div className="grid grid-cols-12 gap-x-6 gap-y-8">
                        <div className="col-span-12 border-b border-surface-dim pb-2 mb-2">
                            <h3 className="text-lg font-bold text-text-main flex items-center gap-2">
                                <User size={24} className="text-text-secondary" />
                                Thông tin cá nhân
                            </h3>
                        </div>

                        <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
                            <label className="text-text-main text-sm font-normal" htmlFor="fullname">Họ tên <span className="text-red-500">*</span></label>
                            <input
                                id="fullname" type="text" placeholder="Nhập họ tên GV"
                                className="w-full h-14 bg-white rounded-xl border border-surface-dim px-4 text-base text-text-main focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
                                value={formData.fullname} onChange={handleChange}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
                            <label className="text-text-main text-sm font-normal" htmlFor="sex">Giới tính <span className="text-red-500">*</span></label>
                            <select id="sex" className="w-full h-14 bg-white rounded-xl border border-surface-dim px-4 text-base text-text-main focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all shadow-sm appearance-none cursor-pointer"
                                value={formData.sex} onChange={handleChange}>
                                <option value="" disabled>Chọn giới tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                        </div>
                        <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
                            <label className="text-text-main text-sm font-normal" htmlFor="dob">Ngày sinh <span className="text-red-500">*</span></label>
                            <input id="dob" type="date" className="w-full h-14 bg-white rounded-xl border border-surface-dim px-4 text-base text-text-main focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
                                value={formData.dob} onChange={handleChange} />
                        </div>
                        <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
                            <label className="text-text-main text-sm font-normal" htmlFor="phone">Số điện thoại <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input id="phone" type="text" placeholder="SĐT liên hệ" className="w-full h-14 bg-white rounded-xl border border-surface-dim px-4 pl-12 text-base text-text-main focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
                                    value={formData.phone} onChange={handleChange} />
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                            </div>
                        </div>
                        <div className="col-span-12 flex flex-col gap-2">
                            <label className="text-text-main text-sm font-normal" htmlFor="address">Địa chỉ <span className="text-red-500">*</span></label>
                            <textarea id="address" rows={2} className="w-full bg-white rounded-xl border border-surface-dim px-4 py-3 text-base text-text-main focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all shadow-sm resize-none" placeholder="Nhập địa chỉ..."
                                value={formData.address} onChange={handleChange}></textarea>
                        </div>

                        <div className="col-span-12 border-b border-surface-dim pb-2 mb-2 mt-4">
                            <h3 className="text-lg font-bold text-text-main flex items-center gap-2">
                                <Lock size={24} className="text-text-secondary" />
                                Tài khoản đăng nhập
                            </h3>
                        </div>
                        <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
                            <label className="text-text-main text-sm font-normal" htmlFor="email">Email (Tên đăng nhập) <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input id="email" type="email" placeholder="example@school.edu.vn" className="w-full h-14 bg-white rounded-xl border border-surface-dim px-4 pl-12 text-base text-text-main focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
                                    value={formData.email} onChange={handleChange} />
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
                            <label className="text-text-main text-sm font-normal" htmlFor="password">Mật khẩu <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input id="password" type="password" placeholder="Nhập mật khẩu" className="w-full h-14 bg-white rounded-xl border border-surface-dim px-4 pl-12 text-base text-text-main focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
                                    value={formData.password} onChange={handleChange} />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col-reverse md:flex-row justify-end items-center gap-4 mt-10 pt-6 border-t border-surface-dim">
                        <button type="button" onClick={() => navigate('/teachers')} className="w-full md:w-auto px-8 h-12 rounded-full border border-text-main/10 text-text-main font-semibold bg-white hover:bg-surface-dim transition-colors" disabled={loading}>
                            Hủy quay lại
                        </button>
                        <button type="submit" disabled={loading} className="w-full md:w-auto px-8 h-12 rounded-full bg-primary text-text-main font-bold hover:bg-[#eae605] shadow-md transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                            <Save size={20} />
                            {loading ? 'Đang lưu...' : 'Lưu hồ sơ'}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default AddTeacher;