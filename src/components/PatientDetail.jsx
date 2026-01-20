// // import { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";

// // export default function PatientDetail() {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const [records, setRecords] = useState([]);

// //   useEffect(() => {
// //     fetch(`http://localhost:3001/api/medibot/patient/${id}`)
// //       .then((r) => r.json())
// //       .then((d) => Array.isArray(d) && setRecords(d));
// //   }, [id]);

// //   return (
// //     <div className="min-h-screen bg-white flex justify-center p-5 font-mono">
// //       <div className="w-full max-w-[1000px]">

// //         {/* HEADER */}
// //         <div className="bg-cyan-400 rounded-t-[30px] px-6 py-5 flex justify-between items-center">
// //           <div className="text-xl font-bold">
// //             🧾 PATIENT HISTORY — {id}
// //           </div>

// //           <button
// //             onClick={() => navigate(-1)}
// //             className="bg-white border-4 border-black px-5 py-2 font-bold"
// //           >
// //             ← BACK
// //           </button>
// //         </div>

// //         <div className="h-[5px] bg-black w-full" />

// //         <div className="border-[5px] border-cyan-400 border-t-0 rounded-b-[30px] p-8">

// //           {records.length === 0 && (
// //             <div className="border-[5px] border-black p-10 text-center">
// //               No history found for this patient
// //             </div>
// //           )}

// //           <div className="space-y-6">
// //             {records.map((r, i) => (
// //               <div key={i} className="border-[5px] border-black p-6">
// //                 <div className="mb-2">
// //                   <b>Date:</b>{" "}
// //                   {new Date(r.created_at).toLocaleDateString()}
// //                 </div>

// //                 <div className="mb-2">
// //                   <b>Symptoms:</b> {r.symptoms}
// //                 </div>

// //                 <div className="mb-2">
// //                   <b>Medicines:</b> {r.medicines}
// //                 </div>

// //                 <div className="mb-2">
// //                   <b>Doctor Notes:</b> {r.doctor_notes || "-"}
// //                 </div>

// //                 <div>
// //                   <b>Follow-up Required:</b>{" "}
// //                   {r.follow_up_required ? "YES" : "NO"}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // import { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";

// // export default function PatientDetail() {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const [records, setRecords] = useState([]);

// //   useEffect(() => {
// //     fetch(`http://localhost:3001/api/medibot/patient/${id}`)
// //       .then((r) => r.json())
// //       .then((d) => {
// //         if (Array.isArray(d)) setRecords(d);
// //       });
// //   }, [id]);

// //   return (
// //     <div className="min-h-screen bg-white flex justify-center p-5 font-mono">
// //       <div className="w-full max-w-[1000px]">

// //         {/* HEADER */}
// //         <div className="bg-cyan-400 rounded-t-[30px] px-6 py-5 flex justify-between items-center">
// //           <div className="text-xl font-bold">
// //             🧾 PATIENT HISTORY — {id}
// //           </div>

// //           <button
// //             onClick={() => navigate(-1)}
// //             className="bg-white border-4 border-black px-5 py-2 font-bold"
// //           >
// //             ← BACK
// //           </button>
// //         </div>

// //         <div className="h-[5px] bg-black w-full" />

// //         <div className="border-[5px] border-cyan-400 border-t-0 rounded-b-[30px] p-8">

// //           {records.length === 0 && (
// //             <div className="border-[5px] border-black p-10 text-center">
// //               No history found for this patient
// //             </div>
// //           )}

// //           <div className="space-y-6">
// //             {records.map((r, i) => (
// //               <div key={i} className="border-[5px] border-black p-6">
// //                 <div><b>Date:</b> {new Date(r.created_at).toLocaleString()}</div>
// //                 <div><b>Symptoms:</b> {r.symptoms}</div>
// //                 <div><b>Medicines:</b> {r.medicines}</div>
// //                 <div><b>Doctor Notes:</b> {r.doctor_notes || "-"}</div>
// //                 <div>
// //                   <b>Follow-up Required:</b>{" "}
// //                   {r.follow_up_required ? "YES" : "NO"}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const API_BASE = "https://voicetotext-backend-r4e2.onrender.com/";

// export default function PatientDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [records, setRecords] = useState([]);

//   useEffect(() => {
//     fetch(`${API_BASE}/api/medibot/patient/${id}`)
//       .then((r) => r.json())
//       .then((d) => {
//         if (Array.isArray(d)) setRecords(d);
//       })
//       .catch(console.error);
//   }, [id]);

//   return (
//     <div className="min-h-screen bg-white flex justify-center p-5 font-mono">
//       <div className="w-full max-w-[1000px]">

//         {/* HEADER */}
//         <div className="bg-cyan-400 rounded-t-[30px] px-6 py-5 flex justify-between items-center">
//           <div className="text-xl font-bold">
//             🧾 PATIENT HISTORY — {id}
//           </div>

//           <button
//             onClick={() => navigate(-1)}
//             className="bg-white border-4 border-black px-5 py-2 font-bold"
//           >
//             ← BACK
//           </button>
//         </div>

//         <div className="h-[5px] bg-black w-full" />

//         <div className="border-[5px] border-cyan-400 border-t-0 rounded-b-[30px] p-8">

//           {records.length === 0 && (
//             <div className="border-[5px] border-black p-10 text-center">
//               No history found for this patient
//             </div>
//           )}

//           <div className="space-y-6">
//             {records.map((r, i) => (
//               <div key={i} className="border-[5px] border-black p-6">
//                 <div>
//                   <b>Date:</b>{" "}
//                   {r.created_at
//                     ? new Date(r.created_at).toLocaleString()
//                     : "-"}
//                 </div>
//                 <div><b>Symptoms:</b> {r.symptoms || "-"}</div>
//                 <div><b>Medicines:</b> {r.medicines || "-"}</div>
//                 <div><b>Doctor Notes:</b> {r.doctor_notes || "-"}</div>
//                 <div>
//                   <b>Follow-up Required:</b>{" "}
//                   {r.follow_up_required ? "YES" : "NO"}
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
import { useParams, useNavigate } from "react-router-dom";

const API_BASE = "https://voicetotext-backend-r4e2.onrender.com";

export default function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`${API_BASE}/api/medibot/patient/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          setRecords([]);
          return;
        }

        // ✅ SORT: newest first (present → past)
        const sorted = [...data].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setRecords(sorted);
      })
      .catch(() => setRecords([]))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="min-h-screen bg-white flex justify-center p-5 font-mono">
      <div className="w-full max-w-[1000px]">

        {/* HEADER */}
        <div className="bg-cyan-400 rounded-t-[30px] px-6 py-5 flex justify-between items-center">
          <div className="text-xl font-bold">
            🧾 PATIENT HISTORY — {id}
          </div>

          <button
            onClick={() => navigate(-1)}
            className="bg-white border-4 border-black px-5 py-2 font-bold"
          >
            ← BACK
          </button>
        </div>

        <div className="h-[5px] bg-black w-full" />

        <div className="border-[5px] border-cyan-400 border-t-0 rounded-b-[30px] p-8">

          {/* LOADING */}
          {loading && (
            <div className="border-[5px] border-black p-10 text-center">
              Loading patient history...
            </div>
          )}

          {/* EMPTY */}
          {!loading && records.length === 0 && (
            <div className="border-[5px] border-black p-10 text-center">
              No history found for this patient
            </div>
          )}

          {/* HISTORY TIMELINE */}
          <div className="space-y-6">
            {records.map((r, i) => (
              <div key={i} className="border-[5px] border-black p-6">

                <div className="mb-2">
                  <b>Date:</b>{" "}
                  {r.created_at
                    ? new Date(r.created_at).toLocaleString()
                    : "-"}
                </div>

                <div className="mb-2">
                  <b>Symptoms:</b> {r.symptoms || "-"}
                </div>

                <div className="mb-2">
                  <b>Medicines:</b> {r.medicines || "-"}
                </div>

                <div className="mb-2">
                  <b>Doctor Notes:</b> {r.doctor_notes || "-"}
                </div>

                <div>
                  <b>Follow-up Required:</b>{" "}
                  {r.follow_up_required ? "YES" : "NO"}
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
