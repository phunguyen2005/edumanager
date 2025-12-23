export const mockClasses = [
    { id: 1, code: 'L10A1', name: '10A1', dob: 'Nguyễn Văn Hùng', grade: '10', subject: 'Toán', type: 'homeroom' },
    { id: 2, code: 'L10A2', name: '10A2', dob: 'Trần Thị Bình', grade: '10', subject: 'Văn', type: 'teaching' },
    { id: 3, code: 'L11B1', name: '11B1', dob: 'Lê Văn Cường', grade: '11', subject: 'Lý', type: 'teaching' },
];

export const mockAppeals = [
    { id: 1, studentName: 'Phạm Văn C', class: '10A1', mssv: 'HS001', subject: 'Toán', examType: '1 tiết', date: '12/10/2024', content: 'Em nghĩ em làm đúng câu 5 nhưng bị chấm sai ạ.' },
    { id: 2, studentName: 'Lê Thị D', class: '10A2', mssv: 'HS002', subject: 'Văn', examType: 'Giữa kỳ', date: '13/10/2024', content: 'Xin cô xem lại điểm bài văn của em.' },
    { id: 3, studentName: 'Nguyễn Văn E', class: '10A1', mssv: 'HS003', subject: 'Lý', examType: '15 phút', date: '14/10/2024', content: 'Em nộp bài đúng giờ mà bị ghi muộn.' },
];

export const mockStudents = [
    { id: 1, code: 'HS001', name: 'Nguyễn Văn A', class: '10A1', avatarColor: 'bg-blue-100 text-blue-600', initials: 'NA', status: 'sufficient', evaluationStatus: 'evaluated' },
    { id: 2, code: 'HS002', name: 'Trần Thị B', class: '10A1', avatarColor: 'bg-green-100 text-green-600', initials: 'TB', status: 'lacking', evaluationStatus: 'pending' },
    { id: 3, code: 'HS003', name: 'Lê Văn C', class: '10A1', avatarColor: 'bg-yellow-100 text-yellow-600', initials: 'LC', status: 'sufficient', evaluationStatus: 'pending' },
    { id: 4, code: 'HS004', name: 'Phạm Thị D', class: '10A1', avatarColor: 'bg-purple-100 text-purple-600', initials: 'PD', status: 'sufficient', evaluationStatus: 'evaluated' },
    { id: 5, code: 'HS005', name: 'Hoàng Văn E', class: '10A1', avatarColor: 'bg-red-100 text-red-600', initials: 'HE', status: 'sufficient', evaluationStatus: 'pending' },
];

export const mockSubjectGrades = [
    { id: 1, subject: 'Toán', oral: 8, min15: 9, period1: 8.5, semester: 9, average: 8.7 },
    { id: 2, subject: 'Văn', oral: 7, min15: 8, period1: 7.5, semester: 8, average: 7.7 },
    { id: 3, subject: 'Anh', oral: 9, min15: 9, period1: 9.5, semester: 9, average: 9.2 },
    { id: 4, subject: 'Lý', oral: 8, min15: 8.5, period1: 8, semester: 8.5, average: 8.3 },
    { id: 5, subject: 'Hóa', oral: 9, min15: 9, period1: 8.5, semester: 9, average: 8.9 },
];