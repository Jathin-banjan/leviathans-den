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
      description: "The inauguration trial where individual candidates prove logical reasoning, quantitative speed, and technical analytical aptitude under extreme time constraints.",
      objective: "Evaluate core IT aptitude, decision-making speed, and analytical competence under pressure.",
      rules: "Individual participation event. Duration 9:30 AM to 12:00 PM. Strictly no external aids or unauthorized digital materials allowed.",
      date: "DAY 1 — SEPTEMBER 17, 2026",
      startTime: "09:30 AM",
      endTime: "12:00 PM",
      venueName: "Nethravathi Seminar Hall",
      instructions: "All terminal units must be network-tested 30 minutes prior by Volunteer Team Alpha."
    },
    {
      id: 2,
      roundNumber: 2,
      themeName: "THE LEVIATHAN'S VERDICT",
      activityName: "Case Allegation / Case Analysis",
      description: "Semi-finals stage. Participants are presented with a real-world corporate breach crisis and system failure scenario. Candidates must analyze evidence, isolate root causes, and present their analytical verdict.",
      objective: "Test corporate crisis assessment, evidence evaluation, technical audit rigor, and executive problem isolation.",
      rules: "Individual stage. Duration 2:00 PM to 4:00 PM. Sealed case envelopes opened simultaneously upon timer start.",
      date: "DAY 1 — SEPTEMBER 17, 2026",
      startTime: "02:00 PM",
      endTime: "04:00 PM",
      venueName: "Nethravathi Hall",
      instructions: "Distribute case study envelopes; invigilating volunteers ensure zero inter-candidate communication."
    },
    {
      id: 3,
      roundNumber: 3,
      themeName: "THE LEVIATHAN'S FRAGMENTS",
      activityName: "Guess the Part",
      description: "Investigative mystery trial. Candidates decipher missing hardware components, fragmented source code blocks, and system architecture diagrams from cryptic progressive clues.",
      objective: "Examine deep technical component recognition, hardware diagnosis, and rapid pattern assembly.",
      rules: "Qualified candidates advance. Duration 10:00 AM to 12:30 PM. Clues released in 15-minute time intervals.",
      date: "DAY 2 — SEPTEMBER 18, 2026",
      startTime: "10:00 AM",
      endTime: "12:30 PM",
      venueName: "Nethravathi Seminar Hall",
      instructions: "Keep hardware artifact display boxes sealed until inauguration clock begins."
    },
    {
      id: 4,
      roundNumber: 4,
      themeName: "THE LEVIATHAN'S JUDGMENT",
      activityName: "Interview & Boardroom Defense",
      description: "The grand finale confrontation on the main stage. Finalists present their 3-year enterprise IT roadmap and defend decisions under intense cross-examination by a jury of industry leaders and senior IT Directors.",
      objective: "Assess executive presence, communication confidence, high-pressure strategic defense, and leadership composure.",
      rules: "Auditorium stage defense. Duration 2:00 PM to 5:00 PM. 15 minutes presentation followed by 10 minutes jury grilling.",
      date: "DAY 2 — SEPTEMBER 18, 2026",
      startTime: "02:00 PM",
      endTime: "05:00 PM",
      venueName: "Main Auditorium Arena",
      instructions: "Stage podium mics and jury rubrics to be finalized by Event Commanders Jathin & Hasth."
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
      date: "SEPTEMBER 17, 2026",
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
      date: "SEPTEMBER 17, 2026",
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
      date: "SEPTEMBER 18, 2026",
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
      date: "SEPTEMBER 18, 2026",
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
      specialInstructions: "Case study documentation tables & evaluation desks."
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
      message: "All IT Manager Volunteers report to Nethravathi Seminar Hall at 09:00 AM on September 17 for final briefing.",
      priority: "HIGH",
      createdAt: "2026-09-17T08:00:00"
    },
    {
      id: 2,
      title: "OFFICIAL WHATSAPP GROUP LINK",
      message: "Join the official IT Manager Event Coordination WhatsApp Group: https://chat.whatsapp.com/LkVZPSPNUUDGJjRORgBsPe?mode=gi_t",
      priority: "HIGH",
      createdAt: "2026-09-17T08:30:00"
    }
  ];
}

// 20 Volunteer Roster transcribed from official sheet (media_1788429501131.jpg)
export const OFFICIAL_VOLUNTEERS = [
  { id: 1, name: "Dhanush", usn: "NN25MCA030", sec: "1 'A'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "MALE", assignedRound: "ROUND 1 (AWAKENING)", assignedVenue: "Nethravathi Seminar Hall", timeSlot: "09:30 AM - 12:00 PM" },
  { id: 2, name: "Rohan Shetty", usn: "NU26MCA116", sec: "1 'B'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "MALE", assignedRound: "ROUND 1 (AWAKENING)", assignedVenue: "Nethravathi Seminar Hall", timeSlot: "09:30 AM - 12:00 PM" },
  { id: 3, name: "Raksha Shetty", usn: "NU26MCA109", sec: "1 'B'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "FEMALE", assignedRound: "ROUND 2 (VERDICT)", assignedVenue: "Nethravathi Hall", timeSlot: "02:00 PM - 04:00 PM" },
  { id: 4, name: "Sushanth Shetty", usn: "NU26MCA158", sec: "1 'C'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "MALE", assignedRound: "ROUND 2 (VERDICT)", assignedVenue: "Nethravathi Hall", timeSlot: "02:00 PM - 04:00 PM" },
  { id: 5, name: "SHREYAS P SHETTY", usn: "NU26MCA142", sec: "1 'C'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "MALE", assignedRound: "ROUND 3 (FRAGMENTS)", assignedVenue: "Nethravathi Seminar Hall", timeSlot: "10:00 AM - 12:30 PM" },
  { id: 6, name: "Tanushi Adappa", usn: "NU26MCA161", sec: "1 'C'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "FEMALE", assignedRound: "ROUND 3 (FRAGMENTS)", assignedVenue: "Nethravathi Seminar Hall", timeSlot: "10:00 AM - 12:30 PM" },
  { id: 7, name: "Akshatha Rai K", usn: "NN25MCA008", sec: "3 'A'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "FEMALE", assignedRound: "ROUND 4 (JUDGMENT)", assignedVenue: "Main Auditorium Arena", timeSlot: "02:00 PM - 05:00 PM" },
  { id: 8, name: "Deeksha", usn: "NN25MCA028", sec: "3 'A'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "FEMALE", assignedRound: "ROUND 4 (JUDGMENT)", assignedVenue: "Main Auditorium Arena", timeSlot: "02:00 PM - 05:00 PM" },
  { id: 9, name: "Hruthvik N V", usn: "NN25MCA050", sec: "3 'A'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "MALE", assignedRound: "ROUND 1 (AWAKENING)", assignedVenue: "Nethravathi Seminar Hall", timeSlot: "09:30 AM - 12:00 PM" },
  { id: 10, name: "Avilash", usn: "NN25MCA020", sec: "3 'A'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "MALE", assignedRound: "ROUND 2 (VERDICT)", assignedVenue: "Nethravathi Hall", timeSlot: "02:00 PM - 04:00 PM" },
  { id: 11, name: "G Anup", usn: "NN25MCA037", sec: "3 'A'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "MALE", assignedRound: "ROUND 3 (FRAGMENTS)", assignedVenue: "Nethravathi Seminar Hall", timeSlot: "10:00 AM - 12:30 PM" },
  { id: 12, name: "Harshini R Shetty", usn: "NN25MCA043", sec: "3 'A'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "FEMALE", assignedRound: "ROUND 4 (JUDGMENT)", assignedVenue: "Main Auditorium Arena", timeSlot: "02:00 PM - 05:00 PM" },
  { id: 13, name: "Dattatreya", usn: "NN25MCA027", sec: "3 'A'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "MALE", assignedRound: "ROUND 1 (AWAKENING)", assignedVenue: "Nethravathi Seminar Hall", timeSlot: "09:30 AM - 12:00 PM" },
  { id: 14, name: "Hrithik Acharya", usn: "NN25MCA048", sec: "3 'A'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "MALE", assignedRound: "ROUND 2 (VERDICT)", assignedVenue: "Nethravathi Hall", timeSlot: "02:00 PM - 04:00 PM" },
  { id: 15, name: "Amrutha Shetty", usn: "NN25MCA013", sec: "3 'A'", category: "Event", role: "IT Manager", status: "ACTIVE", gender: "FEMALE", assignedRound: "ROUND 3 (FRAGMENTS)", assignedVenue: "Nethravathi Seminar Hall", timeSlot: "10:00 AM - 12:30 PM" },
  { id: 16, name: "VIHAS", usn: "NU26MCA172", sec: "1 'C'", category: "Committee", role: "Decoration", status: "OTHER_COMMITTEE", gender: "MALE", assignedRound: "N/A", assignedVenue: "Decoration Desk", timeSlot: "FULL DAY" },
  { id: 17, name: "Yajnesh", usn: "N26MCA179", sec: "1 'C'", category: "Committee", role: "Decoration", status: "OTHER_COMMITTEE", gender: "MALE", assignedRound: "N/A", assignedVenue: "Decoration Desk", timeSlot: "FULL DAY" },
  { id: 18, name: "Vidyashree K R", usn: "NN25MCA175", sec: "3 'C'", category: "Event", role: "Dance", status: "OTHER_COMMITTEE", gender: "FEMALE", assignedRound: "N/A", assignedVenue: "Cultural Stage", timeSlot: "FULL DAY" },
  { id: 19, name: "Varshini", usn: "NN25MCA172", sec: "3 'C'", category: "Event", role: "Dance", status: "OTHER_COMMITTEE", gender: "FEMALE", assignedRound: "N/A", assignedVenue: "Cultural Stage", timeSlot: "FULL DAY" },
  { id: 20, name: "Shreya S Rai", usn: "NN25MCA31", sec: "3 'C'", category: "Event", role: "Dance", status: "OTHER_COMMITTEE", gender: "FEMALE", assignedRound: "N/A", assignedVenue: "Cultural Stage", timeSlot: "FULL DAY" }
];

// Event Head Authentication
export async function loginUser(nameOrEmail, password) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: nameOrEmail, password })
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Backend login offline, simulating auth", e);
  }

  const query = nameOrEmail.toLowerCase().trim();

  // Recognized Event Heads: JATHIN V BANJAN & HASTH R KARKERA (Password: head123)
  if ((query.includes("jathin") || query.includes("hasth") || query.includes("head")) && password === "head123") {
    const isJathin = query.includes("jathin");
    return {
      token: "jwt-event-head-token",
      id: isJathin ? 101 : 102,
      name: isJathin ? "JATHIN V BANJAN" : "HASTH R KARKERA",
      role: "ROLE_EVENT_HEAD",
      phone: isJathin ? "6364058375" : "7338371775",
      title: "EVENT COMMANDER / HEAD"
    };
  }

  // Volunteer Authentication (Password: event123)
  if (password === "event123") {
    const foundVol = OFFICIAL_VOLUNTEERS.find(v => v.name.toLowerCase().includes(query)) || OFFICIAL_VOLUNTEERS[0];
    return {
      token: "jwt-volunteer-token",
      id: foundVol.id,
      name: foundVol.name,
      role: "ROLE_VOLUNTEER",
      usn: foundVol.usn,
      assignedRound: foundVol.assignedRound,
      assignedVenue: foundVol.assignedVenue,
      timeSlot: foundVol.timeSlot
    };
  }

  return { error: "Authentication Failed! Invalid Name or Password." };
}
