package com.example.lms.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "leave_balances")
public class LeaveBalance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Long leaveTypeId;

    @Column(nullable = false)
    private BigDecimal remainingDays;

    public LeaveBalance() {}

    public LeaveBalance(Long userId, Long leaveTypeId, BigDecimal remainingDays) {
        this.userId = userId;
        this.leaveTypeId = leaveTypeId;
        this.remainingDays = remainingDays;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getLeaveTypeId() {
        return leaveTypeId;
    }

    public BigDecimal getRemainingDays() {
        return remainingDays;
    }

    public void setRemainingDays(BigDecimal remainingDays) {
        this.remainingDays = remainingDays;
    }
}
