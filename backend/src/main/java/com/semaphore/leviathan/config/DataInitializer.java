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
        // Seed Event Commander JATHIN V BANJAN
        if (userRepository.findByEmail("jathin@semaphorefest.com").isEmpty()) {
            userRepository.save(User.builder()
                    .email("jathin@semaphorefest.com")
                    .name("JATHIN V BANJAN")
                    .password(passwordEncoder.encode("head123"))
                    .role(User.Role.ROLE_EVENT_HEAD)
                    .build());
        }

        // Seed Event Commander HASTH R KARKERA
        if (userRepository.findByEmail("hasth@semaphorefest.com").isEmpty()) {
            userRepository.save(User.builder()
                    .email("hasth@semaphorefest.com")
                    .name("HASTH R KARKERA")
                    .password(passwordEncoder.encode("head123"))
                    .role(User.Role.ROLE_EVENT_HEAD)
                    .build());
        }

        // Seed Volunteer User
        if (userRepository.findByEmail("volunteer@semaphorefest.com").isEmpty()) {
            userRepository.save(User.builder()
                    .email("volunteer@semaphorefest.com")
                    .name("Dhanush")
                    .password(passwordEncoder.encode("event123"))
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
                    .rules("Individual participation. Duration 9:30 AM to 12:00 PM. No external aid allowed.")
                    .date("SEPTEMBER 17, 2026")
                    .startTime("09:30 AM")
                    .endTime("12:00 PM")
                    .venueName("Nethravathi Seminar Hall (4th Floor)")
                    .instructions("Ensure all terminal units are tested 30 mins prior to start.")
                    .build());

            roundRepository.save(Round.builder()
                    .roundNumber(2)
                    .themeName("THE LEVIATHAN'S VERDICT")
                    .activityName("Case Allegation / Case Analysis")
                    .description("Participants evaluate complex corporate breach scenarios, identify evidence, and defend their analytical verdict.")
                    .objective("Test crisis evaluation, evidence analysis, and strategic judgment.")
                    .rules("Semi-finals stage. Duration 2:00 PM to 4:00 PM.")
                    .date("SEPTEMBER 17, 2026")
                    .startTime("02:00 PM")
                    .endTime("04:00 PM")
                    .venueName("Nethravathi Hall (4th Floor)")
                    .instructions("Case files to be distributed at inauguration of round.")
                    .build());

            roundRepository.save(Round.builder()
                    .roundNumber(3)
                    .themeName("THE LEVIATHAN'S FRAGMENTS")
                    .activityName("Guess the Part")
                    .description("Investigative challenge where participants decipher missing hardware, architecture, or code fragments from cryptic clues.")
                    .objective("Examine technical observation skills and deep component knowledge.")
                    .rules("Top teams advance. Duration 10:00 AM to 12:30 PM.")
                    .date("SEPTEMBER 18, 2026")
                    .startTime("10:00 AM")
                    .endTime("12:30 PM")
                    .venueName("Nethravathi Seminar Hall (4th Floor)")
                    .instructions("Keep artifact boxes sealed until clock begins.")
                    .build());

            roundRepository.save(Round.builder()
                    .roundNumber(4)
                    .themeName("THE LEVIATHAN'S JUDGMENT")
                    .activityName("Interview & Boardroom Defense")
                    .description("The final confrontation where candidates present their roadmap and defend decisions before a jury of industry leaders.")
                    .objective("Assess executive presence, communication confidence, and high-pressure decision making.")
                    .rules("Auditorium stage defense. Duration 2:00 PM to 5:00 PM.")
                    .date("SEPTEMBER 18, 2026")
                    .startTime("02:00 PM")
                    .endTime("05:00 PM")
                    .venueName("Sambhram Auditorium Ground Floor (Ramanujan Block)")
                    .instructions("Jury scoring rubrics to be finalized by Event Commanders Jathin & Hasth.")
                    .build());
        }

        // Seed Initial Announcements
        if (announcementRepository.count() == 0) {
            announcementRepository.save(Announcement.builder()
                    .title("VOLUNTEER COMMAND BRIEFING")
                    .message("All IT Manager Volunteers report to Nethravathi Seminar Hall (4th Floor) at 09:00 AM on September 17 for briefing.")
                    .priority("HIGH")
                    .createdAt(LocalDateTime.now())
                    .build());
        }
    }
}
