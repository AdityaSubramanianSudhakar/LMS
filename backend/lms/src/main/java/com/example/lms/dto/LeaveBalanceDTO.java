package com.example.lms.dto;

import java.math.BigDecimal;

public class LeaveBalanceDTO {
    private Long id;
    private Long userId;
    private Long leaveTypeId;
    private BigDecimal remainingDays;

    public LeaveBalanceDTO() {}

    public LeaveBalanceDTO(Long id, Long userId, Long leaveTypeId, BigDecimal remainingDays) {
        this.id = id;
        this.userId = userId;
        this.leaveTypeId = leaveTypeId;
        this.remainingDays = remainingDays;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getLeaveTypeId() { return leaveTypeId; }
    public void setLeaveTypeId(Long leaveTypeId) { this.leaveTypeId = leaveTypeId; }

    public BigDecimal getRemainingDays() { return remainingDays; }
    public void setRemainingDays(BigDecimal remainingDays) { this.remainingDays = remainingDays; }
}
