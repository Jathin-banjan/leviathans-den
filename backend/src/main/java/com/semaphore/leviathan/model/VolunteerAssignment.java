package com.semaphore.leviathan.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "volunteer_assignments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VolunteerAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long volunteerId;
    private String volunteerName;
    private String roundName;
    private String day;
    private String venueName;
    private String timeSlot;
    private String responsibility;

    @Column(length = 1000)
    private String instructions;
}
