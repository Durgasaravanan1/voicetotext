// // import { useEffect, useState } from "react";

// // export default function DoctorDashboard() {
// //   const [patients, setPatients] = useState([]);

// //   useEffect(() => {
// //     fetch("http://localhost:3001/api/medibot/patients")
// //       .then((r) => r.json())
// //       .then((d) => Array.isArray(d) && setPatients(d));
// //   }, []);

// //   return (
// //     <div className="min-h-screen bg-white flex justify-center p-5 font-mono">
// //       <div className="w-full max-w-[1200px]">

// //         {/* HEADER */}
// //         <div className="bg-cyan-400 rounded-t-[30px] px-6 py-5 flex justify-between items-center">
// //           <div className="text-xl font-bold flex items-center gap-2">
// //             🩺 <span>NOTEWHISPER — DOCTOR MODE</span>
// //           </div>

// //           <div className="bg-white border-[3px] border-black px-6 py-2 font-bold">
// //             ACTIVE
// //           </div>
// //         </div>

// //         {/* DIVIDER */}
// //         <div className="h-[5px] bg-black w-full" />

// //         {/* BODY */}
// //         <div className="border-[5px] border-cyan-400 border-t-0 rounded-b-[30px] p-8">

// //           {/* TITLE BAR */}
// //           <div className="border-[5px] border-black px-6 py-4 mb-8">
// //             PATIENT_RECORDS
// //           </div>

// //           {/* EMPTY STATE */}
// //           {patients.length === 0 && (
// //             <div className="border-[5px] border-black p-10 text-center">
// //               No patient records found
// //             </div>
// //           )}

// //           {/* RECORDS */}
// //           <div className="space-y-6">
// //             {patients.map((p, i) => (
// //               <div key={i} className="border-[5px] border-black p-6">

// //                 <div className="mb-2">
// //                   <b>ID:</b> {p.patient_id}
// //                 </div>

// //                 <div className="mb-2">
// //                   <b>Symptoms:</b> {p.symptoms || "-"}
// //                 </div>

// //                 <div className="mb-2">
// //                   <b>Medicines:</b> {p.medicines || "-"}
// //                 </div>

// //                 <div>
// //                   <b>Follow-up:</b>{" "}
// //                   {p.follow_up_required ? "YES" : "NO"}
// //                 </div>

// //               </div>
// //             ))}
// //           </div>

// //           {/* FOOTER */}
// //           <div className="text-center mt-10 text-sm">
// //             Medical records loaded successfully
// //           </div>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function DoctorDashboard() {
//   const [patients, setPatients] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("http://localhost:3001/api/medibot/patients")
//       .then((r) => r.json())
//       .then((data) => {
//         if (!Array.isArray(data)) return;

//         // ✅ REMOVE DUPLICATES (KEEP LATEST)
//         const map = new Map();

//         data.forEach((p) => {
//           const existing = map.get(p.patient_id);
//           if (
//             !existing ||
//             new Date(p.created_at) > new Date(existing.created_at)
//           ) {
//             map.set(p.patient_id, p);
//           }
//         });

//         setPatients([...map.values()]);
//       });
//   }, []);

//   return (
//     <div className="min-h-screen bg-white flex justify-center p-5 font-mono">
//       <div className="w-full max-w-[1200px]">

//         {/* HEADER */}
//         <div className="bg-cyan-400 rounded-t-[30px] px-6 py-5 flex justify-between items-center">
//           <div className="text-xl font-bold">🩺 NOTEWHISPER — DOCTOR MODE</div>
//           <div className="bg-white border-[3px] border-black px-6 py-2 font-bold">
//             ACTIVE
//           </div>
//         </div>

//         <div className="h-[5px] bg-black w-full" />

//         <div className="border-[5px] border-cyan-400 border-t-0 rounded-b-[30px] p-8">

//           <div className="border-[5px] border-black px-6 py-4 mb-8">
//             PATIENT_RECORDS
//           </div>

//           {patients.length === 0 && (
//             <div className="border-[5px] border-black p-10 text-center">
//               No patient records found
//             </div>
//           )}

//           <div className="space-y-6">
//             {patients.map((p, i) => (
//               <div
//                 key={i}
//                 onClick={() => navigate(`/patient/${p.patient_id}`)} // ✅ CLICKABLE
//                 className="border-[5px] border-black p-6 cursor-pointer hover:bg-gray-100"
//               >
//                 <div className="mb-2">
//                   <b>ID:</b> {p.patient_id}
//                 </div>

//                 <div className="mb-2">
//                   <b>Latest Symptoms:</b> {p.symptoms || "-"}
//                 </div>

//                 <div className="mb-2">
//                   <b>Latest Medicines:</b> {p.medicines || "-"}
//                 </div>

//                 <div>
//                   <b>Follow-up:</b>{" "}
//                   {p.follow_up_required ? "YES" : "NO"}
//                 </div>
//               </div>
//             ))}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://voicetotext-backend-r4e2.onrender.com/";

export default function DoctorDashboard() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/medibot/patients`)
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data)) return;

        // REMOVE DUPLICATES (KEEP LATEST)
        const map = new Map();

        data.forEach((p) => {
          const existing = map.get(p.patient_id);
          if (
            !existing ||
            new Date(p.created_at) > new Date(existing.created_at)
          ) {
            map.set(p.patient_id, p);
          }
        });

        setPatients([...map.values()]);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-white flex justify-center p-5 font-mono">
      <div className="w-full max-w-[1200px]">

        <div className="bg-cyan-400 rounded-t-[30px] px-6 py-5 flex justify-between items-center">
          <div className="text-xl font-bold">🩺 NOTEWHISPER — DOCTOR MODE</div>
          <div className="bg-white border-[3px] border-black px-6 py-2 font-bold">
            ACTIVE
          </div>
        </div>

        <div className="h-[5px] bg-black w-full" />

        <div className="border-[5px] border-cyan-400 border-t-0 rounded-b-[30px] p-8">

          <div className="border-[5px] border-black px-6 py-4 mb-8">
            PATIENT_RECORDS
          </div>

          {patients.length === 0 && (
            <div className="border-[5px] border-black p-10 text-center">
              No patient records found
            </div>
          )}

          <div className="space-y-6">
            {patients.map((p, i) => (
              <div
                key={i}
                onClick={() => navigate(`/patient/${p.patient_id}`)}
                className="border-[5px] border-black p-6 cursor-pointer hover:bg-gray-100"
              >
                <div><b>ID:</b> {p.patient_id}</div>
                <div><b>Latest Symptoms:</b> {p.symptoms || "-"}</div>
                <div><b>Latest Medicines:</b> {p.medicines || "-"}</div>
                <div><b>Follow-up:</b> {p.follow_up_required ? "YES" : "NO"}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
