import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';

// Academic Staff (CBHV) Pages
import StudentList from './pages/CBHV/StudentList';
import AddStudent from './pages/CBHV/AddStudent';
import TransferClass from './pages/CBHV/TransferClass';
import TeacherList from './pages/CBHV/TeacherList';
import AddTeacher from './pages/CBHV/AddTeacher';
import SubjectList from './pages/CBHV/SubjectList';
import ClassArrangement from './pages/CBHV/ClassArrangement';
import ClassDetail from './pages/CBHV/ClassDetail';
import RecordDashboard from './pages/CBHV/RecordDashboard';

// Board of Management (BGH) Pages
import TeachingAssignment from './pages/BGH/TeachingAssignment';
import ClassManager from './pages/BGH/ClassManager';
import ApprovalManager from './pages/BGH/ApprovalManager';

// Teacher Pages
import ClassList from './pages/Teacher/ClassList';
import ConductEvaluation from './pages/Teacher/ConductEvaluation';
import GradeAppeals from './pages/Teacher/GradeAppeals';
import StudentGradesList from './pages/Teacher/StudentGradesList';
import TranscriptDetail from './pages/Teacher/TranscriptDetail';

// Student Pages
import Ranking from './pages/Student/Ranking';
import Review from './pages/Student/Review';
import Transcript from './pages/Student/Transcript';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Navigate to="/students" replace />} />

        {/* Student Routes */}
        <Route path="/students" element={<StudentList />} />
        <Route path="/students/add" element={<AddStudent />} />
        <Route path="/students/transfer" element={<TransferClass />} />

        {/* Teacher Routes (CBHV view) */}
        <Route path="/teachers" element={<TeacherList />} />
        <Route path="/teachers/add" element={<AddTeacher />} />

        {/* Subject Routes */}
        <Route path="/subjects" element={<SubjectList />} />

        {/* Class Routes */}
        <Route path="/classes" element={<ClassArrangement />} />
        <Route path="/classes/:id" element={<ClassDetail />} />

        {/* Record Routes */}
        <Route path="/records" element={<RecordDashboard />} />

        {/* Board Routes (BGH) */}
        <Route path="/bgh/assignments" element={<TeachingAssignment />} />
        <Route path="/bgh/classes" element={<ClassManager />} />
        <Route path="/bgh/approvals" element={<ApprovalManager />} />

        {/* Teacher Routes (Teacher Role) */}
        <Route path="/teacher/classes" element={<ClassList />} />
        <Route path="/teacher/conduct" element={<ConductEvaluation />} />
        <Route path="/teacher/appeals" element={<GradeAppeals />} />
        <Route path="/teacher/grades" element={<StudentGradesList />} />
        <Route path="/teacher/transcript" element={<TranscriptDetail />} />

        {/* Student Routes (Student Role) */}
        <Route path="/student/ranking" element={<Ranking />} />
        <Route path="/student/review" element={<Review />} />
        <Route path="/student/transcript" element={<Transcript />} />

        {/* Redirect for generic teacher path */}
        <Route path="/teacher" element={<Navigate to="/teacher/classes" replace />} />

        {/* Redirect for generic student path */}
        <Route path="/student" element={<Navigate to="/student/transcript" replace />} />

        {/* Fallback for board legacy path if any */}
        <Route path="/board/*" element={<Navigate to="/bgh/assignments" replace />} />

      </Routes>
    </Router>
  );
}

export default App;