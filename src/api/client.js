// API Client connecting React to Spring Boot REST Endpoints (http://localhost:8080/api)

const API_BASE_URL = "http://localhost:8080/api";

export async function fetchRounds() {
  try {
    const res = await fetch(`${API_BASE_URL}/rounds`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Backend offline, using seed rounds data", e);
  }

  // Seed Fallback Data (The Four Leviathan Rounds)
  return [
    {
      id: 1,
      roundNumber: 1,
      themeName: "THE LEVIATHAN'S AWAKENING",
      activityName: "Aptitude Test",
      description: "The first trial where candidates prove logical thinking, quantitative reasoning, and analytical speed.",
      objective: "Evaluate core IT aptitude and problem-solving speed under time pressure.",
      rules: "Individual participation. 45 minutes duration. No external aid allowed.",
      date: "OCTOBER 24, 2026",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      venueName: "LAB 01 & 02",
      instructions: "Ensure all terminal units are tested 30 mins prior to start."
    },
    {
      id: 2,
      roundNumber: 2,
      themeName: "THE LEVIATHAN'S VERDICT",
      activityName: "Case Allegation / Case Analysis",
      description: "Participants evaluate complex corporate breach scenarios, identify evidence, and defend their analytical verdict.",
      objective: "Test crisis evaluation, evidence analysis, and strategic judgment.",
      rules: "Semi-finals stage. 90 minutes team evaluation.",
      date: "OCTOBER 24, 2026",
      startTime: "02:00 PM",
      endTime: "03:30 PM",
      venueName: "SEMINAR HALL A",
      instructions: "Case files to be distributed at inauguration of round."
    },
    {
      id: 3,
      roundNumber: 3,
      themeName: "THE LEVIATHAN'S FRAGMENTS",
      activityName: "Guess the Part",
      description: "Investigative challenge where participants decipher missing hardware, architecture, or code fragments from cryptic clues.",
      objective: "Examine technical observation skills and deep component knowledge.",
      rules: "Top 8 teams advance. Mystery clues revealed in sequences.",
      date: "OCTOBER 25, 2026",
      startTime: "11:00 AM",
      endTime: "12:30 PM",
      venueName: "MAIN HALL ARENA",
      instructions: "Keep artifact boxes sealed until clock begins."
    },
    {
      id: 4,
      roundNumber: 4,
      themeName: "THE LEVIATHAN'S JUDGMENT",
      activityName: "Interview & Boardroom Defense",
      description: "The final confrontation where candidates present their roadmap and defend decisions before a jury of industry leaders.",
      objective: "Assess executive presence, communication confidence, and high-pressure decision making.",
      rules: "Grand finale on auditorium stage. 40 mins per team.",
      date: "OCTOBER 25, 2026",
      startTime: "03:00 PM",
      endTime: "05:30 PM",
      venueName: "MAIN AUDITORIUM",
      instructions: "Jury scoring rubrics to be finalized by Event Commander."
    }
  ];
}

export async function fetchSchedules() {
  try {
    const res = await fetch(`${API_BASE_URL}/schedule`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Backend offline, using fallback schedules", e);
  }

  return [
    {
      id: 1,
      date: "OCT 24, 2026",
      day: "DAY 1",
      roundName: "THE LEVIATHAN'S AWAKENING",
      activity: "Aptitude Test",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      venueName: "LAB 01 & 02",
      instructions: "System check & candidate seating 30m before start.",
      status: "UPCOMING"
    },
    {
      id: 2,
      date: "OCT 24, 2026",
      day: "DAY 1",
      roundName: "THE LEVIATHAN'S VERDICT",
      activity: "Case Allegation / Case Analysis",
      startTime: "02:00 PM",
      endTime: "03:30 PM",
      venueName: "SEMINAR HALL A",
      instructions: "Distribute case envelopes; supervise evaluation.",
      status: "UPCOMING"
    },
    {
      id: 3,
      date: "OCT 25, 2026",
      day: "DAY 2",
      roundName: "THE LEVIATHAN'S FRAGMENTS",
      activity: "Guess the Part",
      startTime: "11:00 AM",
      endTime: "12:30 PM",
      venueName: "MAIN HALL ARENA",
      instructions: "Supervise mystery fragment hardware setup.",
      status: "UPCOMING"
    },
    {
      id: 4,
      date: "OCT 25, 2026",
      day: "DAY 2",
      roundName: "THE LEVIATHAN'S JUDGMENT",
      activity: "Interview & Boardroom Defense",
      startTime: "03:00 PM",
      endTime: "05:30 PM",
      venueName: "MAIN AUDITORIUM",
      instructions: "Stage audio check & jury briefing.",
      status: "UPCOMING"
    }
  ];
}

export async function fetchVenues() {
  try {
    const res = await fetch(`${API_BASE_URL}/venues`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Backend offline, using fallback venues", e);
  }

  return [
    {
      id: 1,
      name: "MAIN AUDITORIUM",
      location: "IT BLOCK - GROUND FLOOR",
      floor: "GROUND",
      capacity: 450,
      assignedRound: "THE LEVIATHAN'S JUDGMENT (INTERVIEW)",
      timeSlot: "OCT 25, 03:00 PM - 05:30 PM",
      specialInstructions: "Stage lighting & wireless mics assigned to Volunteer Team Alpha."
    },
    {
      id: 2,
      name: "SEMINAR HALL A",
      location: "ACADEMIC BLOCK - 2ND FLOOR",
      floor: "2ND FLOOR",
      capacity: 120,
      assignedRound: "THE LEVIATHAN'S VERDICT (CASE ALLEGATION)",
      timeSlot: "OCT 24, 02:00 PM - 03:30 PM",
      specialInstructions: "Projector and audio recording active."
    },
    {
      id: 3,
      name: "COMPUTER LAB 01 & 02",
      location: "IT BUILDING - 1ST FLOOR",
      floor: "1ST FLOOR",
      capacity: 90,
      assignedRound: "THE LEVIATHAN'S AWAKENING (APTITUDE TEST)",
      timeSlot: "OCT 24, 10:00 AM - 11:00 AM",
      specialInstructions: "Secure intranet quiz portal enabled."
    }
  ];
}

export async function fetchAnnouncements() {
  try {
    const res = await fetch(`${API_BASE_URL}/announcements`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Backend offline, using fallback announcements", e);
  }

  return [
    {
      id: 1,
      title: "VOLUNTEER COMMAND BRIEFING",
      message: "All assigned volunteers report to Main Auditorium at 08:30 AM on Day 1 for badge distribution and briefing.",
      priority: "HIGH",
      createdAt: "2026-10-24T08:00:00"
    },
    {
      id: 2,
      title: "CRISIS LAB SETUP CHECK",
      message: "Seminar Hall A projector & network connections verified for Case Allegation round.",
      priority: "MEDIUM",
      createdAt: "2026-10-24T09:15:00"
    }
  ];
}

export async function loginUser(email, password) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Backend login offline, simulating auth", e);
  }

  // Local simulated fallback auth if Spring Boot backend is offline
  if (email.includes("head")) {
    return {
      token: "simulated-head-token",
      id: 1,
      name: "Event Head / Commander",
      email,
      role: "ROLE_EVENT_HEAD"
    };
  } else {
    return {
      token: "simulated-volunteer-token",
      id: 2,
      name: "Volunteer 01",
      email,
      role: "ROLE_VOLUNTEER"
    };
  }
}
