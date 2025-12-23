# EduManager - Hệ thống Quản lý THPT

Chào mừng bạn đến với **EduManager**. Đây là ứng dụng web quản lý trường học được xây dựng bằng **React**, **TypeScript**, **Vite** và **Tailwind CSS**.

Dự án sử dụng **Vite** để đảm bảo tốc độ phát triển và hiệu năng tối ưu.

---

## 1. Yêu cầu chuẩn bị

Trước khi bắt đầu, hãy đảm bảo bạn có:

*   **Node.js**: Phiên bản 18 trở lên.
*   **Trình quản lý gói**: npm (thường đi kèm với Node.js), yarn hoặc pnpm.
*   **Trình soạn thảo code:** Khuyên dùng [Visual Studio Code (VS Code)](https://code.visualstudio.com/).

---

## 2. Cấu trúc thư mục

Bạn cần tạo các thư mục và lưu các file code theo đúng cấu trúc dưới đây để ứng dụng hoạt động chính xác:

```text
EduManager/
├── index.html
├── index.tsx
├── App.tsx
├── types.ts
├── metadata.json
├── components/
│   └── Layout.tsx
└── pages/
    ├── Login.tsx
    ├── CBHV/
    │   ├── AddStudent.tsx
    │   ├── AddTeacher.tsx
    │   ├── ClassArrangement.tsx
    │   ├── RecordDashboard.tsx
    │   ├── StudentList.tsx
    │   ├── SubjectList.tsx
    │   ├── TeacherList.tsx
    │   └── TransferClass.tsx
    ├── BGH/
    │   ├── ApprovalManager.tsx
    │   ├── ClassManager.tsx
    │   ├── TeachingAssignment.tsx
    │   └── views/
    │       ├── AddClass.tsx
    │       ├── ApprovalDetail.tsx
    │       ├── ApprovalList.tsx
    │       ├── ClassStructureList.tsx
    │       └── ClassStructureMove.tsx
    ├── Teacher/
    │   ├── ClassList.tsx
    │   ├── ConductEvaluation.tsx
    │   ├── GradeAppeals.tsx
    │   ├── mockData.ts
    │   ├── StudentGradesList.tsx
    │   └── TranscriptDetail.tsx
    └── Student/
        ├── Ranking.tsx
        ├── Review.tsx
        └── Transcript.tsx
```

**Lưu ý:** Hãy đảm bảo tên file và tên thư mục viết hoa/thường chính xác như trên (Ví dụ: `Student` viết hoa chữ S).

---

## 3. Hướng dẫn chạy ứng dụng

### Cài đặt và Chạy Development

1.  Mở Terminal tại thư mục dự án.
2.  Cài đặt các thư viện:
    ```bash
    npm install
    ```
3.  Khởi động ứng dụng:
    ```bash
    npm run dev
    ```
4.  Truy cập địa chỉ hiển thị trên terminal (thường là `http://localhost:5173`).

### Build Production

Để đóng gói ứng dụng:
```bash
npm run build
```
File build sẽ được tạo trong thư mục `dist`.

---

## 4. Hướng dẫn sử dụng & Đăng nhập

Sau khi ứng dụng chạy, bạn sẽ thấy màn hình đăng nhập. Do đây là bản Demo frontend, bạn không cần tài khoản thật.

1.  Tại màn hình **Login**, nhấn nút **"Đăng nhập"**.
2.  Một hộp thoại (Modal) sẽ hiện ra cho phép bạn chọn vai trò muốn trải nghiệm:
    *   **Học sinh:** Xem bảng điểm, xếp loại, gửi phúc khảo.
    *   **Giáo viên:** Quản lý lớp chủ nhiệm, nhập điểm, đánh giá hạnh kiểm.
    *   **Cán bộ học vụ:** Quản lý hồ sơ học sinh/giáo viên, xếp lớp.
    *   **Ban Giám Hiệu:** Phê duyệt học bạ, phân công giảng dạy.

---

## 5. Lưu ý kỹ thuật

*   **Offline:** Ứng dụng có thể chạy offline sau khi đã cài đặt dependencies (`npm install`).
*   **Routing:** Ứng dụng sử dụng `HashRouter` (đường dẫn có dạng `/#/students`). Điều này giúp ứng dụng chạy tốt trên các static server mà không cần cấu hình rewrite URL.
*   **Dữ liệu:** Toàn bộ dữ liệu là giả lập (Mock Data) được lưu cứng trong code frontend. Khi bạn tải lại trang (F5), các thay đổi (như thêm mới) sẽ không được lưu lại.

---

**Chúc bạn có trải nghiệm tốt với EduManager!**
