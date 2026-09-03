package com.semaphore.leviathan.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "rounds")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Round {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer roundNumber;
    private String themeName;     // e.g., "THE LEVIATHAN'S AWAKENING"
    private String activityName;  // e.g., "Aptitude Test"

    @Column(length = 2000)
    private String description;
    
    @Column(length = 1000)
    private String objective;

    @Column(length = 1000)
    private String rules;

    private String date;
    private String startTime;
    private String endTime;
    private String venueName;
    private String instructions;
}
