/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import React, { useState } from "react";

// Components
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState("0");
  const [calculation, setCalculation] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [lastResult, setLastResult] = useState<string | null>(null);

  const clearHistory = () => {
    setHistory([]);
  };

  const handleNumberClick = (num: string) => {
    if (lastResult !== null) {
      setDisplay(num);
      setCalculation(num);
      setLastResult(null);
    } else {
      setDisplay((prev) => (prev === "0" ? num : prev + num));
      setCalculation((prev) => prev + num);
    }
  };

  const handleOperationClick = (op: string) => {
    if (lastResult !== null) {
      setCalculation(lastResult + " " + op + " ");
      setLastResult(null);
    } else {
      setCalculation((prev) => prev + " " + op + " ");
    }
    setDisplay("0");
  };

  const handleEqualsClick = () => {
    try {
      const result = eval(calculation);
      const fullCalculation = `${calculation} = ${result}`;
      setDisplay(result.toString());
      setCalculation(fullCalculation);
      setHistory((prev) => [fullCalculation, ...prev]);
      setLastResult(result.toString());
    } catch (error) {
      setDisplay("Error");
      setCalculation("Error");
      setLastResult(null);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setCalculation("");
    setLastResult(null);
  };

  const handleBackspace = () => {
    if (lastResult !== null) {
      handleClear();
    } else {
      setDisplay((prev) => prev.slice(0, -1) || "0");
      setCalculation((prev) => prev.slice(0, -1) || "");
    }
  };

  return (
    <div className="flex w-2/3 mx-auto p-6 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-3xl shadow-2xl">
      <div className="w-1/2 flex-grow bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl p-6 space-y-4">
        <div className="bg-gray-700 bg-opacity-70 rounded-xl p-4 text-right text-gray-200 space-y-2 h-32 flex flex-col justify-end overflow-hidden">
          <div className="text-xl font-medium overflow-x-auto whitespace-nowrap">
            {calculation}
          </div>
          <div className="text-5xl font-bold">{display}</div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[
            "1",
            "2",
            "3",
            "/",
            "4",
            "5",
            "6",
            "*",
            "7",
            "8",
            "9",
            "-",
            "0",
            ".",
            "⌫",
            "+",
            "=",
          ].map((btn) => (
            <Button
              key={btn}
              onClick={() => {
                if (btn === "=") handleEqualsClick();
                else if (["⌫"].includes(btn)) handleBackspace();
                else if (["+", "-", "*", "/"].includes(btn))
                  handleOperationClick(btn);
                else handleNumberClick(btn);
              }}
              className={`text-3xl font-bold ${
                btn === "="
                  ? "col-span-4 bg-emerald-600 hover:bg-emerald-700"
                  : ["+", "-", "*", "/"].includes(btn)
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-slate-600 hover:bg-slate-700"
              } text-gray-200 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-105 h-16`}
            >
              {btn}
            </Button>
          ))}
        </div>
        <div className="w-full flex">
          <Button
            onClick={handleClear}
            className="w-full font-bold bg-rose-600 hover:bg-rose-700 text-gray-200 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-105 h-16"
          >
            Clear
          </Button>
        </div>
      </div>
      <div className="w-1/2 ml-6 bg-gray-700 bg-opacity-50 rounded-xl p-4">
        <div className="w-full flex items-center justify-between mb-6">
          <h3 className="font-bold text-gray-200">History</h3>
          <Button
            onClick={clearHistory}
            className="w-32 h-10 bg-rose-600 hover:scale-105 transition-all duration-200 hover:bg-rose-700"
          >
            Clear History
          </Button>
        </div>
        <ScrollArea className="h-[calc(100%-2rem)]">
          {history.map((item, index) => (
            <div key={index} className="text-gray-300 text-lg mb-2 break-words">
              <p className="text-base">{item}</p>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default Calculator;
