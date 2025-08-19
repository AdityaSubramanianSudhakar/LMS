package com.example.lms.service;

import com.example.lms.entity.LeaveBalance;
import com.example.lms.repository.LeaveBalanceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeaveBalanceService {

    private final LeaveBalanceRepository leaveBalanceRepository;

    public LeaveBalanceService(LeaveBalanceRepository leaveBalanceRepository) {
        this.leaveBalanceRepository = leaveBalanceRepository;
    }

    public LeaveBalance createLeaveBalance(LeaveBalance leaveBalance) {
        return leaveBalanceRepository.save(leaveBalance);
    }

    public LeaveBalance updateLeaveBalance(Long id, LeaveBalance updatedLeaveBalance) {
        return leaveBalanceRepository.findById(id)
                .map(balance -> {
                    balance.setRemainingDays(updatedLeaveBalance.getRemainingDays());
                    return leaveBalanceRepository.save(balance);
                })
                .orElseThrow(() -> new RuntimeException("Leave balance not found"));
    }

    public void deleteLeaveBalance(Long id) {
        leaveBalanceRepository.deleteById(id);
    }

    public Optional<LeaveBalance> getLeaveBalanceById(Long id) {
        return leaveBalanceRepository.findById(id);
    }

    public List<LeaveBalance> getLeaveBalancesByUserId(Long userId) {
        return leaveBalanceRepository.findByUserId(userId);
    }
}
