package com.example.lms.controller;

import com.example.lms.entity.LeaveBalance;
import com.example.lms.service.LeaveBalanceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leave-balances")
public class LeaveBalanceController {

    private final LeaveBalanceService leaveBalanceService;
    public LeaveBalanceController(LeaveBalanceService leaveBalanceService) { this.leaveBalanceService = leaveBalanceService; }

    @PostMapping
    public LeaveBalance createLeaveBalance(@RequestBody LeaveBalance leaveBalance) {
        return leaveBalanceService.createLeaveBalance(leaveBalance);
    }

    @GetMapping("/{id}")
    public LeaveBalance getLeaveBalanceById(@PathVariable Long id) {
        return leaveBalanceService.getLeaveBalanceById(id)
                .orElseThrow(() -> new RuntimeException("Leave balance not found"));
    }

    @GetMapping("/user/{userId}")
    public List<LeaveBalance> getLeaveBalancesByUser(@PathVariable Long userId) {
        return leaveBalanceService.getLeaveBalancesByUserId(userId);
    }

    @PutMapping("/{id}")
    public LeaveBalance updateLeaveBalance(@PathVariable Long id, @RequestBody LeaveBalance leaveBalance) {
        return leaveBalanceService.updateLeaveBalance(id, leaveBalance);
    }

    @DeleteMapping("/{id}")
    public void deleteLeaveBalance(@PathVariable Long id) {
        leaveBalanceService.deleteLeaveBalance(id);
    }
}
