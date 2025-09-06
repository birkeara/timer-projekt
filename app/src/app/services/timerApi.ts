// src/services/api.ts
// Defines the structure of Timer and TimerResponse
interface Timer {
  id: string;
  duration: number;
  remaining: number;
  state: "running" | "paused" | "stopped";
}

interface TimerResponse {
  timer: Timer;
  control_url: string;
  view_url: string;
}

// Timer service runs on port 3000, frontend on 8000
const API_URL = "http://localhost:3000";

// Generic API call function with error handling
const api = async (url: string, options?: RequestInit) => {
  console.log("API Call:", `${API_URL}${url}`, options); // Debug log
  const res = await fetch(`${API_URL}${url}`, options);
  console.log("Response:", res.status, res.statusText); // Debug log

  // handle error responses
  if (!res.ok) {
    const errorText = await res.text();
    console.error("API Error:", errorText); // See actual error
    throw new Error(`${res.status}: ${errorText}`);
  }

  return res.json();
};

export const timerApi = {
  // Create a new timer with optional duration (default 300 seconds)
  create: (duration = 300) =>
    api("/timers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ duration }),
    }) as Promise<TimerResponse>,
  // Fetch timer details by ID object
  get: (id: string) => api(`/timers/${id}`) as Promise<Timer>,
  start: (id: string) => api(`/timers/${id}/start`, { method: "POST" }),
  pause: (id: string) => api(`/timers/${id}/pause`, { method: "POST" }),
  reset: (id: string) => api(`/timers/${id}/reset`, { method: "POST" }),
};

// Utility function to format seconds as MM:SS
export const formatTime = (s: number) =>
  `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
