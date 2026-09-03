package com.semaphore.leviathan.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "schedules")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;
    private String day;
    private String roundName;
    private String activity;
    private String startTime;
    private String endTime;
    private String venueName;

    @Column(length = 1000)
    private String instructions;

    private String status; // UPCOMING, IN_PROGRESS, COMPLETED, PENDING
}
