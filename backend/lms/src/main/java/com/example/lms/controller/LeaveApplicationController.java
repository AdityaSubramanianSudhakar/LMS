package com.example.lms.controller;

import com.example.lms.entity.LeaveApplication;
import com.example.lms.service.LeaveApplicationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leave-applications")
public class LeaveApplicationController {

    private final LeaveApplicationService leaveApplicationService;
    public LeaveApplicationController(LeaveApplicationService leaveApplicationService) { this.leaveApplicationService = leaveApplicationService; }

    @PostMapping
    public LeaveApplication createLeaveApplication(@RequestBody LeaveApplication leaveApplication) {
        return leaveApplicationService.createLeaveApplication(leaveApplication);
    }

    @GetMapping
    public List<LeaveApplication> getAllLeaveApplications() {
        return leaveApplicationService.getAllLeaveApplications();
    }

    @GetMapping("/{id}")
    public LeaveApplication getLeaveApplicationById(@PathVariable Long id) {
        return leaveApplicationService.getLeaveApplicationById(id)
                .orElseThrow(() -> new RuntimeException("Leave application not found"));
    }

    @GetMapping("/user/{userId}")
    public List<LeaveApplication> getLeaveApplicationsByUser(@PathVariable Long userId) {
        return leaveApplicationService.getLeaveApplicationsByUserId(userId);
    }

    @PutMapping("/{id}")
    public LeaveApplication updateLeaveApplication(@PathVariable Long id, @RequestBody LeaveApplication leaveApplication) {
        return leaveApplicationService.updateLeaveApplication(id, leaveApplication);
    }

    @DeleteMapping("/{id}")
    public void deleteLeaveApplication(@PathVariable Long id) {
        leaveApplicationService.deleteLeaveApplication(id);
    }
}
