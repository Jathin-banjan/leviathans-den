// API Client connecting React to Spring Boot REST Endpoints (http://localhost:8080/api)

const API_BASE_URL = "http://localhost:8080/api";

export async function fetchRounds() {
  try {
    const res = await fetch(`${API_BASE_URL}/rounds`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Backend offline, using seed rounds data", e);
  }

  return [
    {
      id: 1,
      roundNumber: 1,
      themeName: "THE LEVIATHAN'S AWAKENING",
      activityName: "Aptitude Test",
      description: "The first trial where candidates prove logical thinking, quantitative reasoning, and analytical speed.",
      objective: "Evaluate core IT aptitude and problem-solving speed under time pressure.",
      rules: "Individual participation. Duration 9:30 AM to 12:00 PM. No external aid allowed.",
      date: "DAY 1 — OCT 24, 2026",
      startTime: "09:30 AM",
      endTime: "12:00 PM",
      venueName: "Nethravathi Seminar Hall",
      instructions: "Ensure all terminal units are tested 30 mins prior to start."
    },
    {
      id: 2,
      roundNumber: 2,
      themeName: "THE LEVIATHAN'S VERDICT",
      activityName: "Case Allegation / Case Analysis",
      description: "Participants evaluate complex corporate breach scenarios, identify evidence, and defend their analytical verdict.",
      objective: "Test crisis evaluation, evidence analysis, and strategic judgment.",
      rules: "Semi-finals stage. Duration 2:00 PM to 4:00 PM.",
      date: "DAY 1 — OCT 24, 2026",
      startTime: "02:00 PM",
      endTime: "04:00 PM",
      venueName: "Nethravathi Hall",
      instructions: "Case files to be distributed at inauguration of round."
    },
    {
      id: 3,
      roundNumber: 3,
      themeName: "THE LEVIATHAN'S FRAGMENTS",
      activityName: "Guess the Part",
      description: "Investigative challenge where participants decipher missing hardware, architecture, or code fragments from cryptic clues.",
      objective: "Examine technical observation skills and deep component knowledge.",
      rules: "Top teams advance. Duration 10:00 AM to 12:30 PM.",
      date: "DAY 2 — OCT 25, 2026",
      startTime: "10:00 AM",
      endTime: "12:30 PM",
      venueName: "Nethravathi Seminar Hall",
      instructions: "Keep artifact boxes sealed until clock begins."
    },
    {
      id: 4,
      roundNumber: 4,
      themeName: "THE LEVIATHAN'S JUDGMENT",
      activityName: "Interview & Boardroom Defense",
      description: "The final confrontation where candidates present their roadmap and defend decisions before a jury of industry leaders.",
      objective: "Assess executive presence, communication confidence, and high-pressure decision making.",
      rules: "Grand finale stage. Duration 2:00 PM to 5:00 PM.",
      date: "DAY 2 — OCT 25, 2026",
      startTime: "02:00 PM",
      endTime: "05:00 PM",
      venueName: "Main Auditorium Arena",
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
      roundName: "THE LEVIATHAN'S AWAKENING (ROUND 1)",
      activity: "Aptitude Test",
      startTime: "09:30 AM",
      endTime: "12:00 PM",
      venueName: "Nethravathi Seminar Hall",
      instructions: "System check & candidate seating 30m before start.",
      status: "SCHEDULED"
    },
    {
      id: 2,
      date: "OCT 24, 2026",
      day: "DAY 1",
      roundName: "THE LEVIATHAN'S VERDICT (ROUND 2)",
      activity: "Case Allegation / Case Analysis",
      startTime: "02:00 PM",
      endTime: "04:00 PM",
      venueName: "Nethravathi Hall",
      instructions: "Distribute case envelopes; supervise evaluation.",
      status: "SCHEDULED"
    },
    {
      id: 3,
      date: "OCT 25, 2026",
      day: "DAY 2",
      roundName: "THE LEVIATHAN'S FRAGMENTS (ROUND 3)",
      activity: "Guess the Part",
      startTime: "10:00 AM",
      endTime: "12:30 PM",
      venueName: "Nethravathi Seminar Hall",
      instructions: "Supervise mystery fragment hardware setup.",
      status: "SCHEDULED"
    },
    {
      id: 4,
      date: "OCT 25, 2026",
      day: "DAY 2",
      roundName: "THE LEVIATHAN'S JUDGMENT (ROUND 4)",
      activity: "Interview & Boardroom Defense",
      startTime: "02:00 PM",
      endTime: "05:00 PM",
      venueName: "Main Auditorium Arena",
      instructions: "Stage audio check & jury briefing.",
      status: "SCHEDULED"
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
      name: "NETHRAVATHI SEMINAR HALL",
      location: "MAIN ACADEMIC BLOCK",
      floor: "GROUND FLOOR",
      capacity: 250,
      assignedRound: "ROUND 1 (APTITUDE) & ROUND 3 (GUESS THE PART)",
      timeSlot: "DAY 1: 9:30 AM - 12:00 PM | DAY 2: 10:00 AM - 12:30 PM",
      specialInstructions: "Projector, high-speed audio, and seating grid assigned to IT Manager Volunteers."
    },
    {
      id: 2,
      name: "NETHRAVATHI HALL",
      location: "CENTRAL COMPLEX",
      floor: "1ST FLOOR",
      capacity: 180,
      assignedRound: "ROUND 2 (CASE ALLEGATION / ANALYSIS)",
      timeSlot: "DAY 1: 02:00 PM - 04:00 PM",
      specialInstructions: "Case study documentation tables & team evaluation desks."
    },
    {
      id: 3,
      name: "MAIN AUDITORIUM ARENA",
      location: "ADMINISTRATIVE BLOCK",
      floor: "2ND FLOOR",
      capacity: 500,
      assignedRound: "ROUND 4 (INTERVIEW & BOARDROOM DEFENSE)",
      timeSlot: "DAY 2: 02:00 PM - 05:00 PM",
      specialInstructions: "Grand finale stage lighting, wireless podium mics, and jury panel seating."
    }
  ];
}

// Exact 20 Volunteer List transcribed from official sheet (media_1788429501131.jpg)
export const OFFICIAL_VOLUNTEERS = [
  { id: 1, name: "Dhanush", usn: "NN25MCA030", sec: "1 'A'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "MALE" },
  { id: 2, name: "Rohan Shetty", usn: "NU26MCA116", sec: "1 'B'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "MALE" },
  { id: 3, name: "Raksha Shetty", usn: "NU26MCA109", sec: "1 'B'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "FEMALE" },
  { id: 4, name: "Sushanth Shetty", usn: "NU26MCA158", sec: "1 'C'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "MALE" },
  { id: 5, name: "SHREYAS P SHETTY", usn: "NU26MCA142", sec: "1 'C'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "MALE" },
  { id: 6, name: "Tanushi Adappa", usn: "NU26MCA161", sec: "1 'C'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "FEMALE" },
  { id: 7, name: "Akshatha Rai K", usn: "NN25MCA008", sec: "3 'A'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "FEMALE" },
  { id: 8, name: "Deeksha", usn: "NN25MCA028", sec: "3 'A'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "FEMALE" },
  { id: 9, name: "Hruthvik N V", usn: "NN25MCA050", sec: "3 'A'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "MALE" },
  { id: 10, name: "Avilash", usn: "NN25MCA020", sec: "3 'A'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "MALE" },
  { id: 11, name: "G Anup", usn: "NN25MCA037", sec: "3 'A'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "MALE" },
  { id: 12, name: "Harshini R Shetty", usn: "NN25MCA043", sec: "3 'A'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "FEMALE" },
  { id: 13, name: "Dattatreya", usn: "NN25MCA027", sec: "3 'A'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "MALE" },
  { id: 14, name: "Hrithik Acharya", usn: "NN25MCA048", sec: "3 'A'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "MALE" },
  { id: 15, name: "Amrutha Shetty", usn: "NN25MCA013", sec: "3 'A'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "FEMALE" },
  { id: 16, name: "VIHAS", usn: "NU26MCA172", sec: "1 'C'", category: "Committee", role: "Decoration", status: "OTHER_COMMITTEE", gender: "MALE" },
  { id: 17, name: "Yajnesh", usn: "N26MCA179", sec: "1 'C'", category: "Committee", role: "Decoration", status: "OTHER_COMMITTEE", gender: "MALE" },
  { id: 18, name: "Vidyashree K R", usn: "NN25MCA175", sec: "3 'C'", category: "Event", role: "Dance", status: "OTHER_COMMITTEE", gender: "FEMALE" },
  { id: 19, name: "Varshini", usn: "NN25MCA172", sec: "3 'C'", category: "Event", role: "Dance", status: "OTHER_COMMITTEE", gender: "FEMALE" },
  { id: 20, name: "Shreya S Rai", usn: "NN25MCA31", sec: "3 'C'", category: "Event", role: "Dance", status: "OTHER_COMMITTEE", gender: "FEMALE" }
];

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
      message: "All IT Manager Volunteers report to Nethravathi Seminar Hall at 09:00 AM on Day 1 for briefing.",
      priority: "HIGH",
      createdAt: "2026-10-24T08:00:00"
    },
    {
      id: 2,
      title: "OFFICIAL WHATSAPP GROUP LINK",
      message: "Join the official IT Manager Event Coordination WhatsApp Group: https://chat.whatsapp.com/LkVZPSPNUUDGJjRORgBsPe?mode=gi_t",
      priority: "HIGH",
      createdAt: "2026-10-24T08:30:00"
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
      name: "Dhanush (Volunteer 01)",
      email,
      role: "ROLE_VOLUNTEER"
    };
  }
}
