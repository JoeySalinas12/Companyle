import GuessForm from "./components/GuessForm";
import { supabase } from './utils/supabaseClient'; // Supabase client import


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

// Function to fetch company details
async function fetchCompanyDetails() {
  let { data, error } = await supabase
    .from('companyInfo') // Replace with your actual table name
    .select('*')

  if (error) {
    console.error('Error fetching company details:', error);
    return null;
  }
  if (data != null) {
    // Pick a row based on the current day of the year
    const dailyIndex = getDailyIndex();
    const randomIndex = dailyIndex % data.length;
    // const companyDetails = data[randomIndex];
    
    // console.log('Company details:', data); // This is used for debugging

    return data && data.length > 0 ? data[randomIndex] : null;
  }
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

