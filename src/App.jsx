import { Routes, Route } from "react-router-dom";
import MedicalWorkable from "./components/NoteWhisper";
import DoctorDashboard from "./components/DoctorDashboard";
import PatientDetail from "./components/PatientDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MedicalWorkable />} />
      <Route path="/doctordashboard" element={<DoctorDashboard />} />
      <Route path="/patient/:id" element={<PatientDetail/>}/>
    </Routes>
  );
}
