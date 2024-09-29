// "use client"; // This ensures the component runs client-side

// import { useState } from "react";
// import Modal from './Modal'; // Import Modal component
// import Fuse from 'fuse.js'; // Import Fuse.js for fuzzy matching

// export default function GuessForm({ companySecurity }: { companySecurity: string }) {
//   // State to store the user's guesses
//   const [guesses, setGuesses] = useState<string[]>(Array(6).fill(""));
//   const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
//   const [attempts, setAttempts] = useState(0);
//   const [showModal, setShowModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState('');

//   // Initialize Fuse.js for fuzzy matching
//   const fuse = new Fuse([companySecurity], {
//     threshold: 0.3, // Set your threshold here
//   });

//   // Handler for input change
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//     const newGuesses = [...guesses];
//     newGuesses[index] = e.target.value;
//     setGuesses(newGuesses);
//   };

//   const handleSubmit = (e: React.FormEvent, index: number) => {
//     e.preventDefault();

//     const currentGuess = guesses[index]; // Get the current guess

//     // Check if currentGuess exists and is a string before using toLowerCase()
//     if (currentGuess && typeof currentGuess === 'string') {
//       const result = fuse.search(currentGuess); // Use Fuse.js to search for a match

//       if (result.length > 0) {
//         // If a match is found
//         setModalMessage(`Correct! The company of the day is ${companySecurity}`);
//         setShowModal(true);
//       } else {
//         // Increment attempts only if the guess is incorrect
//         if (attempts >= 5) {
//           setModalMessage(`Nope! The company of the day is ${companySecurity}`);
//           setShowModal(true);
//         } else {
//           // Allow for next guess
//           setCurrentGuessIndex(currentGuessIndex + 1);
//           setAttempts(attempts + 1); // Increment attempts after checking
//         }
//       }
//     } else {
//       console.error("Current guess is invalid or empty");
//     }
//   };

//   return (
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
//               disabled={index !== currentGuessIndex} // Disable submit if it's not the current guess
//             >
//               Submit
//             </button>
//           </form>
//         )
//       ))}
//       {/* Render Modal here if needed */}
//       {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />}
//     </div>
//   );
// }

"use client"; // This ensures the component runs client-side

import { useState } from "react";
import Modal from './Modal'; // Import Modal component
import Fuse from 'fuse.js'; // Import Fuse.js for fuzzy matching

export default function GuessForm({ companySecurity }: { companySecurity: string }) {
  // State to store the user's guesses
  const [guesses, setGuesses] = useState<string[]>(Array(6).fill(""));
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [gameOver, setGameOver] = useState(false); // New state to track if the game is over

  // Initialize Fuse.js for fuzzy matching
  const fuse = new Fuse([companySecurity], {
    threshold: 0.3, // Set your threshold here
  });

  // Handler for input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newGuesses = [...guesses];
    newGuesses[index] = e.target.value;
    setGuesses(newGuesses);
  };

  const handleSubmit = (e: React.FormEvent, index: number) => {
    e.preventDefault();

    const currentGuess = guesses[index]; // Get the current guess

    // Check if currentGuess exists and is a string before using toLowerCase()
    if (currentGuess && typeof currentGuess === 'string') {
      const result = fuse.search(currentGuess); // Use Fuse.js to search for a match

      if (result.length > 0) {
        // If a match is found
        setModalMessage(`Correct! The company of the day is ${companySecurity}`);
        setShowModal(true);
        setGameOver(true); // Set game over state
      } else {
        // Increment attempts only if the guess is incorrect
        if (attempts >= 5) {
          setModalMessage(`Nope! The company of the day is ${companySecurity}`);
          setShowModal(true);
          setGameOver(true); // Set game over state
        } else {
          // Allow for next guess
          setCurrentGuessIndex(currentGuessIndex + 1);
          setAttempts(attempts + 1); // Increment attempts after checking
        }
      }
    } else {
      console.error("Current guess is invalid or empty");
    }
  };

  return (
    <div className="w-full max-w-md">
      {guesses.map((guess, index) => (
        index <= currentGuessIndex && ( // Only render up to the current guess index
          <form
            key={index}
            onSubmit={(e) => handleSubmit(e, index)}
            className="flex items-center space-x-2 mb-4"
          >
            <input
              type="text"
              value={guess}
              onChange={(e) => handleInputChange(e, index)}
              placeholder={`Guess ${index + 1}`}
              disabled={index < currentGuessIndex || gameOver} // Disable previous guesses and if the game is over
              className={`border border-[#555] p-2 rounded w-64 bg-[#2c2c2c] text-[#f0f0f0] placeholder-[#9a9a9a] ${
                index === currentGuessIndex ? "ring-2 ring-[#6f7d59]" : ""
              }`}
            />
            <button
              type="submit"
              className={`bg-[#5c6b48] text-[#f0f0f0] p-2 rounded hover:bg-[#6f7d59] transition-colors ${
                index !== currentGuessIndex || gameOver ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={index !== currentGuessIndex || gameOver} // Disable submit if it's not the current guess or if the game is over
            >
              Submit
            </button>
          </form>
        )
      ))}
      {/* Render Modal here if needed */}
      {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />}
    </div>
  );
}