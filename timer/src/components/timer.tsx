"use client";

import React, { useState, useEffect } from "react";

// Components
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Timer: React.FC = () => {
  const [targetTime, setTargetTime] = useState<Date | null>(null);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [ampm, setAmPm] = useState("AM");

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && targetTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = targetTime.getTime() - now.getTime();
        if (diff > 0) {
          setRemainingTime(Math.floor(diff / 1000));
        } else {
          setRemainingTime(0);
          setIsRunning(false);
          clearInterval(interval as NodeJS.Timeout);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, targetTime]);

  const startTimer = () => {
    if (hours && minutes) {
      const now = new Date();
      const target = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        parseInt(hours) + (ampm === "PM" ? 12 : 0),
        parseInt(minutes)
      );

      if (target <= now) {
        target.setDate(target.getDate() + 1); // Set to tomorrow if the time has already passed today
      }

      setTargetTime(target);
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTargetTime(null);
    setRemainingTime(0);
    setHours("");
    setMinutes("");
    setAmPm("AM");
  };

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const generateOptions = (max: number) => {
    return Array.from({ length: max }, (_, i) => i.toString().padStart(2, "0"));
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-3xl shadow-2xl">
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl p-6 space-y-6">
        <div className="bg-gray-700 bg-opacity-70 rounded-xl p-4 text-center">
          <div className="text-6xl font-bold text-gray-200">
            {formatTime(remainingTime)}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hours" className="text-gray-200">
              Hour:
            </Label>
            <Select value={hours} onValueChange={setHours}>
              <SelectTrigger
                id="hours"
                className="w-full bg-slate-600 text-gray-200"
              >
                <SelectValue placeholder="HH" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 text-gray-200">
                {generateOptions(12).map((hour) => (
                  <SelectItem key={hour} value={hour}>
                    {hour}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="minutes" className="text-gray-200">
              Minutes:
            </Label>
            <Select value={minutes} onValueChange={setMinutes}>
              <SelectTrigger
                id="minutes"
                className="w-full bg-slate-600 text-gray-200"
              >
                <SelectValue placeholder="MM" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 text-gray-200">
                {generateOptions(60).map((minute) => (
                  <SelectItem key={minute} value={minute}>
                    {minute}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ampm" className="text-gray-200">
              AM/PM
            </Label>
            <Select value={ampm} onValueChange={setAmPm}>
              <SelectTrigger
                id="ampm"
                className="w-full bg-slate-600 text-gray-200"
              >
                <SelectValue placeholder="AM/PM" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 text-gray-200">
                <SelectItem value="AM">AM</SelectItem>
                <SelectItem value="PM">PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Button
            onClick={startTimer}
            disabled={isRunning || !hours || !minutes}
            className="text-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-gray-200 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-105 h-14"
          >
            Start
          </Button>
          <Button
            onClick={pauseTimer}
            disabled={!isRunning}
            className="text-xl font-bold bg-amber-600 hover:bg-amber-700 text-gray-200 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-105 h-14"
          >
            Pause
          </Button>
          <Button
            onClick={resetTimer}
            className="text-xl font-bold bg-rose-600 hover:bg-rose-700 text-gray-200 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-105 h-14"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
