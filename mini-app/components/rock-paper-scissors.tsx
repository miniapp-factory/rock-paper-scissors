"use client";

import { useState } from "react";

const choices = ["🪨", "📄", "✂️"] as const;
type Choice = typeof choices[number];

export default function RockPaperScissors() {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [result, setResult] = useState<string>("");
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);

  const determineWinner = (player: Choice, computer: Choice) => {
    if (player === computer) return "draw";
    if (
      (player === "🪨" && computer === "✂️") ||
      (player === "📄" && computer === "🪨") ||
      (player === "✂️" && computer === "📄")
    ) {
      return "win";
    }
    return "lose";
  };

  const play = (player: Choice) => {
    const computer = choices[Math.floor(Math.random() * choices.length)];
    const outcome = determineWinner(player, computer);
    setComputerChoice(computer);
    if (outcome === "win") {
      setPlayerScore((s) => s + 1);
      setResult("You Win!");
    } else if (outcome === "lose") {
      setComputerScore((s) => s + 1);
      setResult("You Lose!");
    } else {
      setResult("Draw!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Rock Paper Scissors</h1>
        <p className="text-lg">
          Player: {playerScore} | Computer: {computerScore}
        </p>
      </div>
      <div className="flex space-x-6 mb-8">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => play(choice)}
            className="w-24 h-24 rounded-full flex items-center justify-center text-6xl bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            {choice}
          </button>
        ))}
      </div>
      <div className="text-3xl font-semibold mb-4">{result}</div>
      {computerChoice && (
        <div className="text-6xl">{computerChoice}</div>
      )}
    </div>
  );
}
