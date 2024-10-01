// import { supabase } from './utils/supabaseClient'; // Supabase client import
// import GuessForm from "./components/GuessForm"; // Client component

// const getDailyIndex = () => {
//   const now = new Date();
  
//   // Calculate the current UTC time
//   const utcTime = new Date(now.toUTCString());

//   // Set the target time to 12:00 AM UTC
//   const targetTime = new Date(utcTime);
//   targetTime.setUTCHours(0, 0, 0, 0); // Set time to 12:00 AM UTC

//   // If current time is before target time, use the previous day
//   if (utcTime < targetTime) {
//     targetTime.setUTCDate(targetTime.getUTCDate() - 1);
//   }

//   // Calculate the day of the year based on target time
//   const startOfYear = new Date(Date.UTC(targetTime.getUTCFullYear(), 0, 0));
//   const diff = targetTime.getTime() - startOfYear.getTime();
//   const oneDay = 24 * 60 * 60 * 1000;
//   const dayOfYear = Math.floor(diff / oneDay);

//   return dayOfYear;
// };

// // Server-side data fetching function
// async function fetchCompanyDetails() {
//   const { data, error } = await supabase
//     .from('companyInfo') // Replace with your actual table name
//     .select('*');

//   if (error) {
//     console.error('Error fetching company details:', error);
//     return null;
//   }

//   if (data != null) {
//     // Pick a row based on the current day of the year
//     const dailyIndex = getDailyIndex();
//     const randomIndex = dailyIndex % data.length;

//     return data && data.length > 0 ? data[randomIndex] : null;
//   }
// }

// export default async function Home() {
//   const companyDetails = await fetchCompanyDetails();

//   if (!companyDetails) return <p>No company details found.</p>;

//   const companyDetails1 = {
//     "Security": companyDetails["Security"],
//     "Symbol": companyDetails["Symbol"],
//     "GCIS Sector": companyDetails["GICS Sector"],
//     "GCIS Sub-Industry": companyDetails["GICS Sub-Industry"],
//     "Headquarters": companyDetails["Headquarters Location"],
//     "Founded": companyDetails["Founded"],
//     "Market Cap": companyDetails["Market Cap"],
//     "Revenue": companyDetails["Revenue"],
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-8 font-sans bg-[#1b1b1b] text-[#f0f0f0]">
//       {/* Server-side rendered company details */}
//       <div className="w-full max-w-4xl mb-12 p-6 bg-[#2c2c2c] shadow-lg rounded-lg">
//         <h1 className="text-2xl font-bold mb-6 text-center text-[#e0a96d]">Can you guess the company of the day?</h1>
//         <div className="grid grid-cols-3 gap-8">
//           {/* Map through the company details, only rendering the first 3 items */}
//           {Object.entries(companyDetails1).slice(1, 4).map(([label, value]) => (
//             <div key={label} className="bg-[#383838] p-4 rounded-lg shadow-md">
//               <h2 className="text-lg font-semibold text-[#b2bb9b]">{label}</h2>
//               <p className="text-xl font-bold text-[#e0e0e0]">{value}</p>
//             </div>
//           ))}
//         </div>

//         {/* Fill the remaining items evenly in two rows */}
//         <div className="grid grid-cols-2 gap-8 mt-4">
//           {Object.entries(companyDetails1).slice(4).map(([label, value]) => (
//             <div key={label} className="bg-[#383838] p-4 rounded-lg shadow-md">
//               <h2 className="text-lg font-semibold text-[#b2bb9b]">{label}</h2>
//               <p className="text-xl font-bold text-[#e0e0e0]">{value}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Client-side GuessForm */}
//       <GuessForm companySecurity={companyDetails1.Security} />
//     </div>
//   );
// }

"use client"; // Add this directive at the top
import { useEffect, useState } from 'react';
import { supabase } from './utils/supabaseClient'; // Supabase client import
import GuessForm from "./components/GuessForm"; // Client component

const getDailyIndex = () => {
  const now = new Date();
  
  // Calculate the current UTC time
  const utcTime = new Date(now.toUTCString());

  // Set the target time to 12:00 AM UTC
  const targetTime = new Date(utcTime);
  targetTime.setUTCHours(0, 0, 0, 0); // Set time to 12:00 AM UTC

  // If current time is before target time, use the previous day
  if (utcTime < targetTime) {
    targetTime.setUTCDate(targetTime.getUTCDate() - 1);
  }

  // Calculate the day of the year based on target time
  const startOfYear = new Date(Date.UTC(targetTime.getUTCFullYear(), 0, 0));
  const diff = targetTime.getTime() - startOfYear.getTime();
  const oneDay = 24 * 60 * 60 * 1000;
  const dayOfYear = Math.floor(diff / oneDay);

  return dayOfYear;
};

// Client-side data fetching function
async function fetchCompanyDetails() {
  const { data, error } = await supabase
    .from('companyInfo') // Replace with your actual table name
    .select('*');

  if (error) {
    console.error('Error fetching company details:', error);
    return null;
  }

  if (data != null) {
    // Pick a row based on the current day of the year
    const dailyIndex = getDailyIndex();
    const randomIndex = dailyIndex % data.length;

    return data && data.length > 0 ? data[randomIndex] : null;
  }
}

export default function Home() {
  const [companyDetails, setCompanyDetails] = useState(null);

  useEffect(() => {
    async function getData() {
      const fetchedData = await fetchCompanyDetails();
      setCompanyDetails(fetchedData);
    }

    getData();
  }, []); // Empty dependency array ensures this only runs once on mount

  if (!companyDetails) return <p>Loading company details...</p>;

  const companyDetails1 = {
    "Security": companyDetails["Security"],
    "Symbol": companyDetails["Symbol"],
    "GCIS Sector": companyDetails["GICS Sector"],
    "GCIS Sub-Industry": companyDetails["GICS Sub-Industry"],
    "Headquarters": companyDetails["Headquarters Location"],
    "Founded": companyDetails["Founded"],
    "Market Cap": companyDetails["Market Cap"],
    "Revenue": companyDetails["Revenue"],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 font-sans bg-[#1b1b1b] text-[#f0f0f0]">
      {/* Client-side rendered company details */}
      <div className="w-full max-w-4xl mb-12 p-6 bg-[#2c2c2c] shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#e0a96d]">Can you guess the company of the day?</h1>
        <div className="grid grid-cols-3 gap-8">
          {/* Map through the company details, only rendering the first 3 items */}
          {Object.entries(companyDetails1).slice(1, 4).map(([label, value]) => (
            <div key={label} className="bg-[#383838] p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-[#b2bb9b]">{label}</h2>
              <p className="text-xl font-bold text-[#e0e0e0]">{value}</p>
            </div>
          ))}
        </div>

        {/* Fill the remaining items evenly in two rows */}
        <div className="grid grid-cols-2 gap-8 mt-4">
          {Object.entries(companyDetails1).slice(4).map(([label, value]) => (
            <div key={label} className="bg-[#383838] p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-[#b2bb9b]">{label}</h2>
              <p className="text-xl font-bold text-[#e0e0e0]">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Client-side GuessForm */}
      <GuessForm companySecurity={companyDetails1.Security} />
    </div>
  );
}