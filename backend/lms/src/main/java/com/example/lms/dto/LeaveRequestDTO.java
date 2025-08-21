package com.example.lms.dto;
import com.example.lms.entity.LeaveRequest;

public class LeaveRequestDTO {
    private Long id;
    private String leaveType;
    private String startDate;
    private String endDate;
    private String status;
    private String reason;

    // constructor
    public LeaveRequestDTO(LeaveRequest leave) {
        this.id = leave.getId(); // assuming employee is not null
        this.leaveType = leave.getLeaveType();
        this.startDate = leave.getStartDate().toString();
        this.endDate = leave.getEndDate().toString();
        this.status = leave.getStatus();
        this.reason = leave.getReason();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLeaveType() {
        return leaveType;
    }

    public void setLeaveType(String leaveType) {
        this.leaveType = leaveType;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    // getters and setters
}
