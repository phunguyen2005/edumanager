# Tài liệu Đặc tả Backend - Module CBHV (Cán bộ học vụ)

Tài liệu này liệt kê các chức năng Frontend trong thư mục `pages/CBHV` và đề xuất các API Backend tương ứng cần phát triển.

## 1. Quản lý Học sinh
**Giao diện:** `StudentList.tsx`, `AddStudent.tsx`

| Chức năng Frontend | Method | Endpoint API | Mô tả | Request Body/Params |
| :--- | :--- | :--- | :--- | :--- |
| **Lấy danh sách học sinh** | `GET` | `/api/students` | Lấy danh sách học sinh có phân trang, lọc theo lớp, tìm kiếm theo tên/mã. | `page`, `limit`, `classId`, `search` |
| **Lấy chi tiết học sinh** | `GET` | `/api/students/:id` | Lấy thông tin chi tiết một học sinh để hiển thị form sửa. | `id` (Param) |
| **Thêm mới học sinh** | `POST` | `/api/students` | Tạo hồ sơ học sinh mới. | `{ id, fullName, dob, gender, classId, address, ... }` |
| **Cập nhật học sinh** | `PUT` | `/api/students/:id` | Cập nhật thông tin học sinh đã có. | `{ fullName, dob, ... }` |
| **Xóa học sinh** | `DELETE` | `/api/students/:id` | Xóa (hoặc ẩn) học sinh khỏi hệ thống. | `id` (Param) |

## 2. Quản lý Giáo viên
**Giao diện:** `TeacherList.tsx`, `AddTeacher.tsx`

| Chức năng Frontend | Method | Endpoint API | Mô tả | Request Body/Params |
| :--- | :--- | :--- | :--- | :--- |
| **Lấy danh sách giáo viên** | `GET` | `/api/teachers` | Lấy danh sách GV có phân trang, lọc theo chuyên môn, bằng cấp. | `page`, `limit`, `specialization`, `degree`, `search` |
| **Thêm mới giáo viên** | `POST` | `/api/teachers` | Tạo hồ sơ giáo viên mới. | `{ id, fullName, dob, gender, phone, email, specialization, degree }` |
| **Cập nhật giáo viên** | `PUT` | `/api/teachers/:id` | Cập nhật thông tin giáo viên. | `{ fullName, phone, email, ... }` |
| **Xóa giáo viên** | `DELETE` | `/api/teachers/:id` | Xóa giáo viên khỏi hệ thống. | `id` (Param) |

## 3. Quản lý Môn học
**Giao diện:** `SubjectList.tsx`

| Chức năng Frontend | Method | Endpoint API | Mô tả | Request Body/Params |
| :--- | :--- | :--- | :--- | :--- |
| **Lấy danh sách môn học** | `GET` | `/api/subjects` | Lấy danh sách tất cả môn học. | `search` |
| **Thêm môn học** | `POST` | `/api/subjects` | Tạo môn học mới. | `{ name, type, sessions, coefficient }` |
| **Cập nhật môn học** | `PUT` | `/api/subjects/:id` | Sửa thông tin môn học. | `{ name, sessions, coefficient, status }` |
| **Đổi trạng thái môn** | `PATCH` | `/api/subjects/:id/status` | Kích hoạt hoặc ngưng áp dụng môn học. | `{ status: 'active' | 'inactive' }` |

## 4. Xếp lớp (Class Arrangement)
**Giao diện:** `ClassArrangement.tsx`

| Chức năng Frontend | Method | Endpoint API | Mô tả | Request Body/Params |
| :--- | :--- | :--- | :--- | :--- |
| **Lấy HS chờ xếp lớp** | `GET` | `/api/students/pending` | Lấy danh sách học sinh chưa có lớp hoặc đang chờ xếp. | `year`, `grade` |
| **Lấy danh sách lớp** | `GET` | `/api/classes/status` | Lấy danh sách các lớp kèm sĩ số hiện tại/tối đa. | `year`, `grade` |
| **Xếp học sinh vào lớp** | `POST` | `/api/classes/:classId/add-students` | Thêm một hoặc nhiều học sinh vào lớp. | `{ studentIds: [] }` |
| **Xóa HS khỏi lớp** | `DELETE` | `/api/classes/:classId/students/:studentId` | Gỡ học sinh khỏi lớp (trả về danh sách chờ). | `classId`, `studentId` |

## 5. Chuyển lớp (Transfer Class)
**Giao diện:** `TransferClass.tsx`

| Chức năng Frontend | Method | Endpoint API | Mô tả | Request Body/Params |
| :--- | :--- | :--- | :--- | :--- |
| **Tìm kiếm học sinh** | `GET` | `/api/students/search` | Tìm nhanh học sinh để chuyển lớp. | `query` (Mã hoặc Tên) |
| **Lấy lớp khả dụng** | `GET` | `/api/classes/available` | Lấy các lớp có thể chuyển đến (cùng khối, còn chỗ). | `grade` |
| **Thực hiện chuyển lớp** | `POST` | `/api/students/transfer` | Ghi nhận chuyển lớp, cập nhật lịch sử. | `{ studentId, targetClassId, reason, semester }` |

## 6. Lập Học bạ (Academic Records)
**Giao diện:** `RecordDashboard.tsx`

| Chức năng Frontend | Method | Endpoint API | Mô tả | Request Body/Params |
| :--- | :--- | :--- | :--- | :--- |
| **Lấy tình trạng học bạ** | `GET` | `/api/academic-records/status` | Lấy danh sách HS trong lớp và trạng thái đủ/thiếu điểm. | `year`, `semester`, `classId` |
| **Xem chi tiết học bạ** | `GET` | `/api/academic-records/:studentId` | Lấy bảng điểm chi tiết của một học sinh để in/xem trước. | `year`, `semester` |
| **Xuất học bạ (PDF)** | `GET` | `/api/academic-records/:studentId/export` | Tải về file PDF học bạ (hoặc xử lý ở Client với data trên). | `format=pdf` |

---
*Lưu ý: Các API trên là đề xuất dựa trên giao diện Frontend hiện có. Khi triển khai Backend cần chú ý xác thực (Authorization) để đảm bảo chỉ role CBHV mới được gọi các API này.*
