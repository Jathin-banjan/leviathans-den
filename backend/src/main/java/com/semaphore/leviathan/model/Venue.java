package com.semaphore.leviathan.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "venues")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Venue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;
    private String floor;
    private Integer capacity;
    private String assignedRound;
    private String timeSlot;

    @Column(length = 1000)
    private String specialInstructions;
}
