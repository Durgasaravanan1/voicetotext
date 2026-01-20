// // // import { useRef, useState } from "react";
// // // import { useNavigate } from "react-router-dom";

// // // export default function MedicalWorkable() {
// // //   const navigate = useNavigate();

// // //   const mediaRecorderRef = useRef(null);
// // //   const audioChunksRef = useRef([]);
// // //   const fileInputRef = useRef(null);

// // //   const [status, setStatus] = useState("READY");

// // //   /* -------- RECORD -------- */
// // //   const startRecording = async () => {
// // //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
// // //     audioChunksRef.current = [];

// // //     const recorder = new MediaRecorder(stream);
// // //     mediaRecorderRef.current = recorder;

// // //     recorder.ondataavailable = (e) => {
// // //       if (e.data.size > 0) audioChunksRef.current.push(e.data);
// // //     };

// // //     recorder.onstop = () => {
// // //       stream.getTracks().forEach((t) => t.stop());
// // //       setStatus("READY");
// // //     };

// // //     recorder.start();
// // //     setStatus("RECORDING");
// // //   };

// // //   const stopRecording = () => {
// // //     if (mediaRecorderRef.current) {
// // //       mediaRecorderRef.current.stop();
// // //     }
// // //   };

// // //   /* -------- UPLOAD -------- */
// // //   const handleUpload = () => {
// // //     fileInputRef.current.click();
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-white flex justify-center p-5 font-mono">
// // //       <div className="w-full max-w-[1200px]">
// // //         {/* HEADER */}
// // //         <div className="bg-cyan-400 rounded-t-[30px] px-6 py-5 flex justify-between items-center">
// // //           <div className="text-xl font-bold flex items-center gap-2">
// // //             🎤 <span>NOTEWHISPER</span>
// // //           </div>

// // //           <div className="bg-white border-[3px] border-black px-6 py-2 font-bold">
// // //             {status}
// // //           </div>
// // //         </div>

// // //         {/* DIVIDER */}
// // //         <div className="h-[5px] bg-black w-full" />

// // //         {/* MAIN CONTAINER */}
// // //         <div className="border-[5px] border-cyan-400 border-t-0 rounded-b-[30px] p-8">
// // //           {/* VOICE INPUT */}
// // //           <div className="border-[5px] border-black p-8 flex justify-between items-center">
// // //             <div className="text-lg">VOICE_INPUT</div>

// // //             <div className="flex gap-5">
// // //               <button
// // //                 onMouseDown={startRecording}
// // //                 onMouseUp={stopRecording}
// // //                 className="bg-red-500 text-white border-[4px] border-black px-8 py-3 font-bold active:scale-95"
// // //               >
// // //                 ● START
// // //               </button>

// // //               <button
// // //                 onClick={handleUpload}
// // //                 className="bg-blue-500 text-white border-[4px] border-black px-8 py-3 font-bold active:scale-95"
// // //               >
// // //                 ↑ UPLOAD
// // //               </button>

// // //               <input
// // //                 type="file"
// // //                 ref={fileInputRef}
// // //                 accept="audio/*"
// // //                 hidden
// // //               />
// // //             </div>
// // //           </div>

// // //           {/* OUTPUT BOX */}
// // //           <div className="border-[5px] border-black mt-10 h-[300px]" />

// // //           {/* FOOTER TEXT */}
// // //           <div className="text-center mt-6">
// // //             Record or upload a medical voice note
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // import { useRef, useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // export default function MedicalWorkable({ demoRef }) {
// //   const navigate = useNavigate();

// //   const mediaRecorderRef = useRef(null);
// //   const audioChunksRef = useRef([]);
// //   const fileInputRef = useRef(null);

// //   const [status, setStatus] = useState("READY");
// //   const [isRecording, setIsRecording] = useState(false);
// //   const [showForm, setShowForm] = useState(false);

// //   const [form, setForm] = useState({
// //     patient_id: "",
// //     patient_name: "",
// //     symptoms: "",
// //     medicines: "",
// //     doctor_notes: "",
// //     follow_up_required: false,
// //   });

// //   /* ================= START RECORDING ================= */
// //   const startRecording = async () => {
// //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

// //     audioChunksRef.current = []; // ✅ RESET
// //     const recorder = new MediaRecorder(stream, {
// //       mimeType: "audio/webm",
// //     });

// //     mediaRecorderRef.current = recorder;

// //     recorder.ondataavailable = (e) => {
// //       if (e.data && e.data.size > 0) {
// //         audioChunksRef.current.push(e.data);
// //       }
// //     };

// //     recorder.onstop = async () => {
// //       const blob = new Blob(audioChunksRef.current, {
// //         type: "audio/webm",
// //       });

// //       await sendAudio(blob, "recording.webm");
// //       stream.getTracks().forEach((t) => t.stop());
// //     };

// //     recorder.start();
// //     setIsRecording(true);
// //     setStatus("RECORDING...");
// //   };

// //   /* ================= STOP RECORDING ================= */
// //   const stopRecording = () => {
// //     if (!mediaRecorderRef.current) return;

// //     setIsRecording(false);
// //     setStatus("PROCESSING...");
// //     mediaRecorderRef.current.stop();
// //   };

// //   /* ================= UPLOAD AUDIO ================= */
// //   const handleUpload = async (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     setStatus("PROCESSING...");
// //     await sendAudio(file, file.name);
// //   };

// //   /* ================= SEND AUDIO (COMMON) ================= */
// //   const sendAudio = async (audio, filename) => {
// //     try {
// //       const formData = new FormData();
// //       formData.append("audio", audio, filename);

// //       const res = await fetch("http://localhost:3001/api/medibot/voice", {
// //         method: "POST",
// //         body: formData,
// //       });

// //       const data = await res.json();

// //       // ✅ ALWAYS UPDATE FORM WITH NEW RESPONSE
// //       setForm({
// //         patient_id: data.patient_id || "",
// //         patient_name: data.patient_name || "",
// //         symptoms: data.symptoms || "",
// //         medicines: data.medicines || "",
// //         doctor_notes: data.doctor_notes || "",
// //         follow_up_required: !!data.follow_up_required,
// //       });

// //       setShowForm(true);
// //       setStatus("READY");
// //     } catch (err) {
// //       console.error(err);
// //       setStatus("ERROR");
// //     }
// //   };

// //   /* ================= CONFIRM ================= */
// //   const confirmData = async () => {
// //     await fetch("http://localhost:3001/api/medibot/confirm", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(form),
// //     });

// //     navigate("/doctordashboard");
// //   };

// //   /* ================= UI — EXACT SAME ================= */
// //   return (
// //     <section ref={demoRef} className="py-12 bg-white">
// //       <div className="max-w-5xl mx-auto px-4">

// //         {/* LIVE DEMO UI */}
// //         {!showForm && (
// //           <div className="rounded-3xl border-4 border-cyan-400 bg-white shadow-xl overflow-hidden">

// //             <div className="bg-cyan-400 px-6 py-4 flex justify-between items-center border-b-4 border-black font-mono">
// //               <span>🎤 NOTEWHISPER</span>
// //               <span className="border-2 border-black px-4 py-1 bg-white">
// //                 {status}
// //               </span>
// //             </div>

// //             <div className="p-6">
// //               <div className="border-4 border-black px-6 py-6 flex justify-between items-center mb-6 font-mono">
// //                 <span>VOICE_INPUT</span>

// //                 <div className="flex gap-3">
// //                   {!isRecording ? (
// //                     <button
// //                       onClick={startRecording}
// //                       className="bg-red-500 text-white px-6 py-2 border-4 border-black font-bold"
// //                     >
// //                       ● START
// //                     </button>
// //                   ) : (
// //                     <button
// //                       onClick={stopRecording}
// //                       className="bg-yellow-400 text-black px-6 py-2 border-4 border-black font-bold"
// //                     >
// //                       ■ STOP
// //                     </button>
// //                   )}

// //                   {/* UPLOAD (UI SAFE) */}
// //                   <button
// //                     onClick={() => fileInputRef.current.click()}
// //                     className="bg-blue-500 text-white px-6 py-2 border-4 border-black font-bold"
// //                   >
// //                     ⬆ UPLOAD
// //                   </button>

// //                   <input
// //                     ref={fileInputRef}
// //                     type="file"
// //                     accept="audio/*"
// //                     hidden
// //                     onChange={handleUpload}
// //                   />
// //                 </div>
// //               </div>

// //               <div className="border-4 border-black h-56 mb-4" />
// //               <div className="text-center font-mono text-sm">
// //                 Record or upload a medical voice note
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* FORM (UNCHANGED STRUCTURE) */}
// //         {showForm && (
// //           <div className="mt-10">
// //             <input className="border w-full p-2 mb-3"
// //               value={form.patient_id}
// //               onChange={(e) => setForm({ ...form, patient_id: e.target.value })}
// //               placeholder="Patient ID" />

// //             <input className="border w-full p-2 mb-3"
// //               value={form.patient_name}
// //               onChange={(e) => setForm({ ...form, patient_name: e.target.value })}
// //               placeholder="Patient Name" />

// //             <input className="border w-full p-2 mb-3"
// //               value={form.symptoms}
// //               onChange={(e) => setForm({ ...form, symptoms: e.target.value })}
// //               placeholder="Symptoms" />

// //             <input className="border w-full p-2 mb-3"
// //               value={form.medicines}
// //               onChange={(e) => setForm({ ...form, medicines: e.target.value })}
// //               placeholder="Medicines" />

// //             <textarea className="border w-full p-2 mb-3"
// //               value={form.doctor_notes}
// //               onChange={(e) => setForm({ ...form, doctor_notes: e.target.value })}
// //               placeholder="Doctor Notes" />

// //             <button
// //               onClick={confirmData}
// //               className="bg-green-500 text-white w-full py-2 font-bold"
// //             >
// //               ✅ CONFIRM
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </section>
// //   );
// // }


// import { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function MedicalWorkable({ demoRef }) {
//   const navigate = useNavigate();

//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const fileInputRef = useRef(null);

//   const [status, setStatus] = useState("READY");
//   const [isRecording, setIsRecording] = useState(false);
//   const [showForm, setShowForm] = useState(false);

//   const [form, setForm] = useState({
//     patient_id: "",
//     patient_name: "",
//     symptoms: "",
//     medicines: "",
//     doctor_notes: "",
//     follow_up_required: false,
//   });

//   /* ================= START RECORDING ================= */
//   const startRecording = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

//     audioChunksRef.current = [];
//     const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
//     mediaRecorderRef.current = recorder;

//     recorder.ondataavailable = (e) => {
//       if (e.data?.size > 0) audioChunksRef.current.push(e.data);
//     };

//     recorder.onstop = async () => {
//       const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
//       await sendAudio(blob, "recording.webm");
//       stream.getTracks().forEach((t) => t.stop());
//     };

//     recorder.start();
//     setIsRecording(true);
//     setStatus("RECORDING...");
//   };

//   /* ================= STOP RECORDING ================= */
//   const stopRecording = () => {
//     if (!mediaRecorderRef.current) return;
//     setIsRecording(false);
//     setStatus("PROCESSING...");
//     mediaRecorderRef.current.stop();
//   };

//   /* ================= UPLOAD AUDIO ================= */
//   const handleUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setStatus("PROCESSING...");
//     await sendAudio(file, file.name);
//   };

//   /* ================= SEND AUDIO ================= */
//   const sendAudio = async (audio, filename) => {
//     try {
//       const formData = new FormData();
//       formData.append("audio", audio, filename);

//       const res = await fetch("http://localhost:3001/api/medibot/voice", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       setForm({
//         patient_id: data.patient_id || "",
//         patient_name: data.patient_name || "",
//         symptoms: data.symptoms || "",
//         medicines: data.medicines || "",
//         doctor_notes: data.doctor_notes || "",
//         follow_up_required: false,
//       });

//       setShowForm(true);
//       setStatus("READY");
//     } catch (err) {
//       console.error(err);
//       setStatus("ERROR");
//     }
//   };

//   /* ================= CONFIRM ================= */
//   const confirmData = async () => {
//     await fetch("http://localhost:3001/api/medibot/confirm", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     navigate("/doctordashboard");
//   };

//   /* ================= UI ================= */
//   return (
//     <section ref={demoRef} className="py-12 bg-white font-mono">
//       <div className="max-w-5xl mx-auto px-4">

//         {/* ========== VOICE UI ========== */}
//         {!showForm && (
//           <div className="rounded-3xl border-4 border-cyan-400 shadow-xl overflow-hidden">

//             <div className="bg-cyan-400 px-6 py-4 flex justify-between items-center border-b-4 border-black">
//               <span className="font-bold">🎤 NOTEWHISPER</span>
//               <span className="bg-white border-2 border-black px-4 py-1">
//                 {status}
//               </span>
//             </div>

//             <div className="p-6">
//               <div className="border-4 border-black p-6 flex justify-between items-center mb-6">
//                 <span className="font-bold">VOICE INPUT</span>

//                 <div className="flex gap-3">
//                   {!isRecording ? (
//                     <button
//                       onClick={startRecording}
//                       className="bg-red-500 text-white px-6 py-2 border-4 border-black font-bold"
//                     >
//                       ● START
//                     </button>
//                   ) : (
//                     <button
//                       onClick={stopRecording}
//                       className="bg-yellow-400 px-6 py-2 border-4 border-black font-bold"
//                     >
//                       ■ STOP
//                     </button>
//                   )}

//                   <button
//                     onClick={() => fileInputRef.current.click()}
//                     className="bg-blue-500 text-white px-6 py-2 border-4 border-black font-bold"
//                   >
//                     ⬆ UPLOAD
//                   </button>

//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept="audio/*"
//                     hidden
//                     onChange={handleUpload}
//                   />
//                 </div>
//               </div>

//               <div className="border-4 border-dashed border-black h-56 flex items-center justify-center text-gray-400">
//                 Audio waveform preview
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ========== FORM UI (ENHANCED) ========== */}
//         {showForm && (
//           <div className="mt-12 border-4 border-black rounded-3xl shadow-xl overflow-hidden">

//             {/* FORM HEADER */}
//             <div className="bg-cyan-400 px-6 py-4 border-b-4 border-black font-bold text-lg">
//               🧾 Confirm Patient Visit
//             </div>

//             {/* FORM BODY */}
//             <div className="p-8 space-y-6">

//               <Field label="Patient ID">
//                 <input
//                   className="input"
//                   value={form.patient_id}
//                   onChange={(e) => setForm({ ...form, patient_id: e.target.value })}
//                 />
//               </Field>

//               <Field label="Patient Name">
//                 <input
//                   className="input"
//                   value={form.patient_name}
//                   onChange={(e) => setForm({ ...form, patient_name: e.target.value })}
//                 />
//               </Field>

//               <Field label="Symptoms">
//                 <textarea
//                   className="input h-24"
//                   value={form.symptoms}
//                   onChange={(e) => setForm({ ...form, symptoms: e.target.value })}
//                 />
//               </Field>

//               <Field label="Medicines">
//                 <input
//                   className="input"
//                   value={form.medicines}
//                   onChange={(e) => setForm({ ...form, medicines: e.target.value })}
//                 />
//               </Field>

//               <Field label="Doctor Notes">
//                 <textarea
//                   className="input h-24"
//                   value={form.doctor_notes}
//                   onChange={(e) =>
//                     setForm({ ...form, doctor_notes: e.target.value })
//                   }
//                 />
//               </Field>

//               {/* FOLLOW UP TOGGLE */}
//               <div className="flex justify-between items-center border-4 border-black p-4 rounded-xl">
//                 <span className="font-bold">Follow-up Required?</span>
//                 <button
//                   onClick={() =>
//                     setForm({
//                       ...form,
//                       follow_up_required: !form.follow_up_required,
//                     })
//                   }
//                   className={`w-16 h-8 border-4 border-black rounded-full flex items-center px-1 transition ${
//                     form.follow_up_required ? "bg-green-400" : "bg-gray-300"
//                   }`}
//                 >
//                   <div
//                     className={`h-4 w-4 bg-white border-2 border-black rounded-full transition ${
//                       form.follow_up_required ? "translate-x-8" : ""
//                     }`}
//                   />
//                 </button>
//               </div>

//             </div>

//             {/* FORM FOOTER */}
//             <div className="border-t-4 border-black p-6 bg-gray-50">
//               <button
//                 onClick={confirmData}
//                 className="w-full bg-green-500 hover:bg-green-600 text-white py-4 text-lg font-bold border-4 border-black"
//               >
//                 ✅ CONFIRM & SAVE
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* INPUT STYLE */}
//       <style>{`
//         .input {
//           width: 100%;
//           border: 4px solid black;
//           padding: 12px;
//           outline: none;
//         }
//       `}</style>
//     </section>
//   );
// }

// /* ===== FIELD WRAPPER ===== */
// function Field({ label, children }) {
//   return (
//     <div>
//       <label className="block mb-1 font-bold">{label}</label>
//       {children}
//     </div>
//   );
// }



import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://voicetotext-backend-r4e2.onrender.com/";

export default function MedicalWorkable({ demoRef }) {
  const navigate = useNavigate();

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const fileInputRef = useRef(null);

  const [status, setStatus] = useState("READY");
  const [isRecording, setIsRecording] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    patient_id: "",
    patient_name: "",
    symptoms: "",
    medicines: "",
    doctor_notes: "",
    follow_up_required: false,
  });

  /* ================= START RECORDING ================= */
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    audioChunksRef.current = [];
    const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        audioChunksRef.current.push(e.data);
      }
    };

    recorder.onstop = async () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      await sendAudio(blob, "recording.webm");
      stream.getTracks().forEach((t) => t.stop());
    };

    recorder.start();
    setIsRecording(true);
    setStatus("RECORDING...");
  };

  /* ================= STOP RECORDING ================= */
  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;
    setIsRecording(false);
    setStatus("PROCESSING...");
    mediaRecorderRef.current.stop();
  };

  /* ================= UPLOAD AUDIO ================= */
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setStatus("PROCESSING...");
    await sendAudio(file, file.name);
  };

  /* ================= SEND AUDIO ================= */
  const sendAudio = async (audio, filename) => {
    try {
      const formData = new FormData();
      formData.append("audio", audio, filename);

      const res = await fetch(`${API_BASE}/api/medibot/voice`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Voice processing failed");

      const data = await res.json();

      setForm({
        patient_id: data.patient_id || "",
        patient_name: data.patient_name || "",
        symptoms: data.symptoms || "",
        medicines: data.medicines || "",
        doctor_notes: data.doctor_notes || "",
        follow_up_required: false,
      });

      setShowForm(true);
      setStatus("READY");
    } catch (err) {
      console.error(err);
      setStatus("ERROR");
      alert("Voice processing failed. Please try again.");
    }
  };

  /* ================= CONFIRM ================= */
  const confirmData = async () => {
    try {
      await fetch(`${API_BASE}/api/medibot/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      navigate("/doctordashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to save patient record.");
    }
  };

  /* ================= UI ================= */
  return (
    <section ref={demoRef} className="py-12 bg-white font-mono">
      <div className="max-w-5xl mx-auto px-4">

        {/* ===== VOICE UI ===== */}
        {!showForm && (
          <div className="rounded-3xl border-4 border-cyan-400 shadow-xl overflow-hidden">

            <div className="bg-cyan-400 px-6 py-4 flex justify-between items-center border-b-4 border-black">
              <span className="font-bold">🎤 NOTEWHISPER</span>
              <span className="bg-white border-2 border-black px-4 py-1">
                {status}
              </span>
            </div>

            <div className="p-6">
              <div className="border-4 border-black p-6 flex justify-between items-center mb-6">
                <span className="font-bold">VOICE INPUT</span>

                <div className="flex gap-3">
                  {!isRecording ? (
                    <button
                      onClick={startRecording}
                      className="bg-red-500 text-white px-6 py-2 border-4 border-black font-bold"
                    >
                      ● START
                    </button>
                  ) : (
                    <button
                      onClick={stopRecording}
                      className="bg-yellow-400 px-6 py-2 border-4 border-black font-bold"
                    >
                      ■ STOP
                    </button>
                  )}

                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="bg-blue-500 text-white px-6 py-2 border-4 border-black font-bold"
                  >
                    ⬆ UPLOAD
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*"
                    hidden
                    onChange={handleUpload}
                  />
                </div>
              </div>

              <div className="border-4 border-dashed border-black h-56 flex items-center justify-center text-gray-400">
                Audio waveform preview
              </div>
            </div>
          </div>
        )}

        {/* ===== CONFIRM FORM ===== */}
        {showForm && (
          <div className="mt-12 border-4 border-black rounded-3xl shadow-xl overflow-hidden">

            <div className="bg-cyan-400 px-6 py-4 border-b-4 border-black font-bold text-lg">
              🧾 Confirm Patient Visit
            </div>

            <div className="p-8 space-y-6">

              <Field label="Patient ID">
                <input
                  className="input"
                  value={form.patient_id}
                  onChange={(e) =>
                    setForm({ ...form, patient_id: e.target.value })
                  }
                />
              </Field>

              <Field label="Patient Name">
                <input
                  className="input"
                  value={form.patient_name}
                  onChange={(e) =>
                    setForm({ ...form, patient_name: e.target.value })
                  }
                />
              </Field>

              <Field label="Symptoms">
                <textarea
                  className="input h-24"
                  value={form.symptoms}
                  onChange={(e) =>
                    setForm({ ...form, symptoms: e.target.value })
                  }
                />
              </Field>

              <Field label="Medicines">
                <input
                  className="input"
                  value={form.medicines}
                  onChange={(e) =>
                    setForm({ ...form, medicines: e.target.value })
                  }
                />
              </Field>

              <Field label="Doctor Notes">
                <textarea
                  className="input h-24"
                  value={form.doctor_notes}
                  onChange={(e) =>
                    setForm({ ...form, doctor_notes: e.target.value })
                  }
                />
              </Field>

              <div className="flex justify-between items-center border-4 border-black p-4 rounded-xl">
                <span className="font-bold">Follow-up Required?</span>
                <button
                  onClick={() =>
                    setForm({
                      ...form,
                      follow_up_required: !form.follow_up_required,
                    })
                  }
                  className={`w-16 h-8 border-4 border-black rounded-full flex items-center px-1 transition ${
                    form.follow_up_required ? "bg-green-400" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`h-4 w-4 bg-white border-2 border-black rounded-full transition ${
                      form.follow_up_required ? "translate-x-8" : ""
                    }`}
                  />
                </button>
              </div>

            </div>

            <div className="border-t-4 border-black p-6 bg-gray-50">
              <button
                onClick={confirmData}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-4 text-lg font-bold border-4 border-black"
              >
                ✅ CONFIRM & SAVE
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .input {
          width: 100%;
          border: 4px solid black;
          padding: 12px;
          outline: none;
        }
      `}</style>
    </section>
  );
}

/* ===== FIELD WRAPPER ===== */
function Field({ label, children }) {
  return (
    <div>
      <label className="block mb-1 font-bold">{label}</label>
      {children}
    </div>
  );
}
