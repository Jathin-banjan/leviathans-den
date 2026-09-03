package com.semaphore.leviathan.controller;

import com.semaphore.leviathan.model.*;
import com.semaphore.leviathan.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPassword())) {
            User user = userOpt.get();
            Map<String, Object> response = new HashMap<>();
            response.put("token", "simulated-jwt-token-" + user.getId());
            response.put("id", user.getId());
            response.put("name", user.getName());
            response.put("email", user.getEmail());
            response.put("role", user.getRole().name());
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password"));
    }
}

@RestController
@RequestMapping("/api/rounds")
@CrossOrigin(origins = "*")
class RoundController {

    private final RoundRepository roundRepository;

    public RoundController(RoundRepository roundRepository) {
        this.roundRepository = roundRepository;
    }

    @GetMapping
    public List<Round> getAllRounds() {
        return roundRepository.findAllByOrderByRoundNumberAsc();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Round> getRoundById(@PathVariable Long id) {
        return roundRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

@RestController
@RequestMapping("/api/schedule")
@CrossOrigin(origins = "*")
class ScheduleController {

    private final ScheduleRepository scheduleRepository;

    public ScheduleController(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    @GetMapping
    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    @GetMapping("/day/{date}")
    public List<Schedule> getScheduleByDate(@PathVariable String date) {
        return scheduleRepository.findByDate(date);
    }
}

@RestController
@RequestMapping("/api/venues")
@CrossOrigin(origins = "*")
class VenueController {

    private final VenueRepository venueRepository;

    public VenueController(VenueRepository venueRepository) {
        this.venueRepository = venueRepository;
    }

    @GetMapping
    public List<Venue> getAllVenues() {
        return venueRepository.findAll();
    }
}

@RestController
@RequestMapping("/api/announcements")
@CrossOrigin(origins = "*")
class AnnouncementController {

    private final AnnouncementRepository announcementRepository;

    public AnnouncementController(AnnouncementRepository announcementRepository) {
        this.announcementRepository = announcementRepository;
    }

    @GetMapping
    public List<Announcement> getAllAnnouncements() {
        return announcementRepository.findAllByOrderByCreatedAtDesc();
    }
}

@RestController
@RequestMapping("/api/assignments")
@CrossOrigin(origins = "*")
class VolunteerAssignmentController {

    private final VolunteerAssignmentRepository assignmentRepository;

    public VolunteerAssignmentController(VolunteerAssignmentRepository assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }

    @GetMapping("/my-role")
    public ResponseEntity<?> getMyAssignment(@RequestParam(required = false) Long volunteerId,
                                              @RequestParam(required = false) String name) {
        if (volunteerId != null) {
            List<VolunteerAssignment> list = assignmentRepository.findByVolunteerId(volunteerId);
            if (!list.isEmpty()) return ResponseEntity.ok(list.get(0));
        }
        if (name != null) {
            return assignmentRepository.findByVolunteerName(name)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.status(404).body(null));
        }
        return ResponseEntity.status(404).body(Map.of("message", "Assignment Pending — Event Head will update this information"));
    }
}
