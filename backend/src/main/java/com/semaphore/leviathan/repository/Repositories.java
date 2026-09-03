package com.semaphore.leviathan.repository;

import com.semaphore.leviathan.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}

@Repository
public interface RoundRepository extends JpaRepository<Round, Long> {
    List<Round> findAllByOrderByRoundNumberAsc();
}

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByDate(String date);
}

@Repository
public interface VenueRepository extends JpaRepository<Venue, Long> {}

@Repository
public interface VolunteerAssignmentRepository extends JpaRepository<VolunteerAssignment, Long> {
    List<VolunteerAssignment> findByVolunteerId(Long volunteerId);
    Optional<VolunteerAssignment> findByVolunteerName(String volunteerName);
}

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findAllByOrderByCreatedAtDesc();
}
