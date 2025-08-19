package com.example.lms.dto;

import java.time.LocalDate;

public class LeaveRequestDTO {

    private Long id;
    private String name;
    private Long employeeId;
    private LocalDate startDate;
    private LocalDate endDate;
    private String reason;

    public LeaveRequestDTO() {}

    public LeaveRequestDTO(Long id, String name, Long employeeId, LocalDate startDate, LocalDate endDate, String reason) {
        this.id = id;
        this.name = name;
        this.employeeId = employeeId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.reason = reason;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
