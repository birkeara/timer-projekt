"use client";

import { useEffect, useState } from "react";
import { timerApi } from "../app/services/timerApi"; // Adjust path if needed
import { Button } from "../app/components/ui/Button";

export default function Home() {
  const [timer, setTimer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const createTimer = async () => {
      try {
        console.log("Creating timer...");
        const response = await timerApi.create();
        setTimer(response);
        console.log("Timer created:", response);
      } catch (error) {
        console.error("Failed to create timer:", error);
        setError("Failed to create timer");
      } finally {
        setLoading(false);
      }
    };

    createTimer();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Timer App</h1>
      {timer && (
        <div>
          <p>Timer ID: {timer.timer?.id}</p>
          <p>Duration: {timer.timer?.duration} seconds</p>
          <p>State: {timer.timer?.state}</p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => console.log("clicked")}
          >
            Start Timer
          </Button>
        </div>
      )}
    </div>
  );
}
