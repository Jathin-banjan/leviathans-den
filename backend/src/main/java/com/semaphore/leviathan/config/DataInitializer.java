package com.semaphore.leviathan.config;

import com.semaphore.leviathan.model.*;
import com.semaphore.leviathan.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoundRepository roundRepository;
    private final ScheduleRepository scheduleRepository;
    private final VenueRepository venueRepository;
    private final AnnouncementRepository announcementRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           RoundRepository roundRepository,
                           ScheduleRepository scheduleRepository,
                           VenueRepository venueRepository,
                           AnnouncementRepository announcementRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roundRepository = roundRepository;
        this.scheduleRepository = scheduleRepository;
        this.venueRepository = venueRepository;
        this.announcementRepository = announcementRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Seed Event Head User
        if (userRepository.findByEmail("head@semaphorefest.com").isEmpty()) {
            userRepository.save(User.builder()
                    .email("head@semaphorefest.com")
                    .name("Event Commander")
                    .password(passwordEncoder.encode("password123"))
                    .role(User.Role.ROLE_EVENT_HEAD)
                    .build());
        }

        // Seed Volunteer User
        if (userRepository.findByEmail("volunteer@semaphorefest.com").isEmpty()) {
            userRepository.save(User.builder()
                    .email("volunteer@semaphorefest.com")
                    .name("Volunteer 01")
                    .password(passwordEncoder.encode("password123"))
                    .role(User.Role.ROLE_VOLUNTEER)
                    .build());
        }

        // Seed 4 Leviathan Rounds
        if (roundRepository.count() == 0) {
            roundRepository.save(Round.builder()
                    .roundNumber(1)
                    .themeName("THE LEVIATHAN'S AWAKENING")
                    .activityName("Aptitude Test")
                    .description("The first trial where candidates prove logical thinking, quantitative reasoning, and analytical speed.")
                    .objective("Evaluate core IT aptitude and problem-solving speed under time pressure.")
                    .rules("Individual participation. 45 minutes duration. No external aid allowed.")
                    .date("OCTOBER 24, 2026")
                    .startTime("10:00 AM")
                    .endTime("11:00 AM")
                    .venueName("LAB 01 & 02")
                    .instructions("Ensure all terminal units are tested 30 mins prior to start.")
                    .build());

            roundRepository.save(Round.builder()
                    .roundNumber(2)
                    .themeName("THE LEVIATHAN'S VERDICT")
                    .activityName("Case Allegation / Case Analysis")
                    .description("Participants evaluate complex corporate breach scenarios, identify evidence, and defend their analytical verdict.")
                    .objective("Test crisis evaluation, evidence analysis, and strategic judgment.")
                    .rules("Semi-finals stage. 90 minutes team evaluation.")
                    .date("OCTOBER 24, 2026")
                    .startTime("02:00 PM")
                    .endTime("03:30 PM")
                    .venueName("SEMINAR HALL A")
                    .instructions("Case files to be distributed at inauguration of round.")
                    .build());

            roundRepository.save(Round.builder()
                    .roundNumber(3)
                    .themeName("THE LEVIATHAN'S FRAGMENTS")
                    .activityName("Guess the Part")
                    .description("Investigative challenge where participants decipher missing hardware, architecture, or code fragments from cryptic clues.")
                    .objective("Examine technical observation skills and deep component knowledge.")
                    .rules("Top 8 teams advance. Mystery clues revealed in sequences.")
                    .date("OCTOBER 25, 2026")
                    .startTime("11:00 AM")
                    .endTime("12:30 PM")
                    .venueName("MAIN HALL ARENA")
                    .instructions("Keep artifact boxes sealed until clock begins.")
                    .build());

            roundRepository.save(Round.builder()
                    .roundNumber(4)
                    .themeName("THE LEVIATHAN'S JUDGMENT")
                    .activityName("Interview & Boardroom Defense")
                    .description("The final confrontation where candidates present their roadmap and defend decisions before a jury of industry leaders.")
                    .objective("Assess executive presence, communication confidence, and high-pressure decision making.")
                    .rules("Grand finale on auditorium stage. 40 mins per team.")
                    .date("OCTOBER 25, 2026")
                    .startTime("03:00 PM")
                    .endTime("05:30 PM")
                    .venueName("MAIN AUDITORIUM")
                    .instructions("Jury scoring rubrics to be finalized by Event Commander.")
                    .build());
        }

        // Seed Initial Announcements
        if (announcementRepository.count() == 0) {
            announcementRepository.save(Announcement.builder()
                    .title("VOLUNTEER BRIEFING MEETING")
                    .message("All assigned volunteers must report to Main Auditorium at 08:30 AM on Day 1 for badge distribution and venue setup.")
                    .priority("HIGH")
                    .createdAt(LocalDateTime.now())
                    .build());
        }
    }
}
