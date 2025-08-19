package com.example.lms.dto;

import java.time.LocalDate;

public class LeaveApplicationDTO {
    private Long id;
    private Long userId;
    private Long leaveTypeId;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private String reason;

    public LeaveApplicationDTO() {}

    public LeaveApplicationDTO(Long id, Long userId, Long leaveTypeId,
                                LocalDate startDate, LocalDate endDate,
                                String status, String reason) {
        this.id = id;
        this.userId = userId;
        this.leaveTypeId = leaveTypeId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.reason = reason;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getLeaveTypeId() { return leaveTypeId; }
    public void setLeaveTypeId(Long leaveTypeId) { this.leaveTypeId = leaveTypeId; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
