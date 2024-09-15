import GuessForm from "./components/GuessForm";

export default function Home() {
  // Server-side rendered company details
  const companyDetails = {
    Symbol: "1001",
    Security: "1001",
    "GCIS Sector": "1001",
    "GCIS Sub-Industry": "1001",
    Headquarters: "1001",
    Founded: "1001",
    "Market Cap": "1001",
    Revenue: "1001",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 font-sans bg-[#1b1b1b] text-[#f0f0f0]">
      {/* Key-Value Pairs Section */}
      <div className="w-full max-w-4xl mb-12 p-6 bg-[#2c2c2c] shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#e0a96d]">Company Details</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {Object.entries(companyDetails).map(([label, value]) => (
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



// "use client"; // Add this at the top

// import { useState } from "react";

// export default function Home() {
//   // State to store the user's guesses
//   const [guesses, setGuesses] = useState<string[]>(Array(6).fill("")); // 6 empty guesses
//   const [currentGuessIndex, setCurrentGuessIndex] = useState(0); // To track which guess to enter

//   // Placeholder data for the key-value pairs
//   const companyDetails = {
//     Symbol: "1001",
//     Security: "1001",
//     "GCIS Sector": "1001",
//     "GCIS Sub-Industry": "1001",
//     Headquarters: "1001",
//     Founded: "1001",
//     "Market Cap": "1001",
//     Revenue: "1001",
//   };

//   // Handler for input change
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//     const newGuesses = [...guesses];
//     newGuesses[index] = e.target.value;
//     setGuesses(newGuesses);
//   };

//   // Handler for form submission
//   const handleSubmit = (e: React.FormEvent, index: number) => {
//     e.preventDefault();
//     if (index === currentGuessIndex) {
//       // Move to the next guess
//       setCurrentGuessIndex(currentGuessIndex + 1);
//     }
//   };


// return (
//   <div className="flex flex-col items-center justify-center min-h-screen p-8 font-sans bg-[#1b1b1b] text-[#f0f0f0]">
//     {/* Key-Value Pairs Section */}
//     <div className="w-full max-w-4xl mb-12 p-6 bg-[#2c2c2c] shadow-lg rounded-lg">
//       <h1 className="text-2xl font-bold mb-6 text-center text-[#e0a96d]">Company Details</h1>
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
//         {Object.entries(companyDetails).map(([label, value]) => (
//           <div key={label} className="bg-[#383838] p-4 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold text-[#b2bb9b]">{label}</h2>
//             <p className="text-xl font-bold text-[#e0e0e0]">{value}</p>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* Guessing Forms */}
//     <div className="w-full max-w-md">
//       {guesses.map((guess, index) => (
//         index <= currentGuessIndex && ( // Only render up to the current guess index
//           <form
//             key={index}
//             onSubmit={(e) => handleSubmit(e, index)}
//             className="flex items-center space-x-2 mb-4"
//           >
//             <input
//               type="text"
//               value={guess}
//               onChange={(e) => handleInputChange(e, index)}
//               placeholder={`Guess ${index + 1}`}
//               disabled={index < currentGuessIndex} // Disable previous guesses
//               className={`border border-[#555] p-2 rounded w-64 bg-[#2c2c2c] text-[#f0f0f0] placeholder-[#9a9a9a] ${
//                 index === currentGuessIndex ? "ring-2 ring-[#6f7d59]" : ""
//               }`}
//             />
//             <button
//               type="submit"
//               className={`bg-[#5c6b48] text-[#f0f0f0] p-2 rounded hover:bg-[#6f7d59] transition-colors ${
//                 index !== currentGuessIndex ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//               disabled={index !== currentGuessIndex}
//             >
//               Submit
//             </button>
//           </form>
//         )
//       ))}
//     </div>
//   </div>
// );
// }