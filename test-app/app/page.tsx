import { useEffect, useState } from "react";
import GuessForm from "./components/GuessForm";
import { supabase } from './utils/supabaseClient'; // Supabase client import

// Function to fetch company details
async function fetchCompanyDetails() {
  let { data, error } = await supabase
    .from('companyInfo') // Replace with your actual table name
    .select('*')
    .limit(1);

  if (error) {
    console.error('Error fetching company details:', error);
    return null;
  }
  // console.log('Company details:', data); // This is used for debugging

  return data && data.length > 0 ? data[0] : null;
}


export default async function Home() {
  const companyDetails = await fetchCompanyDetails();

  if (!companyDetails) return <p>No company details found.</p>;

  // Server-side rendered company details
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
      {/* Key-Value Pairs Section */}
      <div className="w-full max-w-4xl mb-12 p-6 bg-[#2c2c2c] shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#e0a96d]">Name the Company!</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {Object.entries(companyDetails1).map(([label, value]) => (
            <div key={label} className="bg-[#383838] p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-[#b2bb9b]">{label}</h2>
              <p className="text-xl font-bold text-[#e0e0e0]">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Client Component for the Guessing Form */}
      <GuessForm />
    </div>
  );
}





// import { supabase } from './utils/supabaseClient'; // Supabase client import

// // Function to fetch company details
// async function fetchCompanyDetails() {
//   const { data, error } = await supabase
//     .from('companyInfo') // Replace with your actual table name
//     .select('*')
//     .limit(1);

//   if (error) {
//     console.error('Error fetching company details:', error);
//     return null;
//   }

//   return data && data.length > 0 ? data[0] : null;
// }

// export default async function Home() {
//   const companyDetails = await fetchCompanyDetails();

//   if (!companyDetails) return <p>No company details found.</p>;

//   return (
//     <div className="min-h-screen bg-[#202020] text-gray-100 p-8 flex flex-col items-center">
//       <div className="max-w-4xl w-full">
//         {/* Company Details Section */}
//         <section className="grid grid-cols-2 sm:grid-cols-3 gap-6 p-8 bg-[#3e3e3e] text-gray-100 border border-gray-400 rounded-lg">
//           <div>
//             <h3 className="text-lg font-semibold">Symbol</h3>
//             <p className="text-sm">{companyDetails.symbol || 'N/A'}</p>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold">Security</h3>
//             <p className="text-sm">{companyDetails.security || 'N/A'}</p>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold">GCIS Sector</h3>
//             <p className="text-sm">{companyDetails.gcis_sector || 'N/A'}</p>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold">GCIS Sub-Industry</h3>
//             <p className="text-sm">{companyDetails.gcis_sub_industry || 'N/A'}</p>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold">Headquarters</h3>
//             <p className="text-sm">{companyDetails.headquarters || 'N/A'}</p>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold">Founded</h3>
//             <p className="text-sm">{companyDetails.founded || 'N/A'}</p>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold">Market Cap</h3>
//             <p className="text-sm">{companyDetails.market_cap || 'N/A'}</p>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold">Stock Price</h3>
//             <p className="text-sm">{companyDetails.stock_price || 'N/A'}</p>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold">Revenue</h3>
//             <p className="text-sm">{companyDetails.revenue || 'N/A'}</p>
//           </div>
//         </section>

//         {/* Guessing Section */}
//         <section className="mt-8 w-full">
//           <h2 className="text-2xl font-semibold mb-4">Make Your Guesses</h2>
//           {/* The guessing input boxes and logic follow below */}
//           <div className="grid grid-cols-1 gap-4">
//             {/* Render guess input dynamically */}
//             {/* Render first guess field */}
//             {/* Render second guess field, etc */}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }