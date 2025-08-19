package com.example.lms.controller;

import com.example.lms.entity.LeaveRequest;
import com.example.lms.service.LeaveRequestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
public class LeaveRequestController {

    private final LeaveRequestService leaveRequestService;

    public LeaveRequestController(LeaveRequestService leaveRequestService) {
        this.leaveRequestService = leaveRequestService;
    }

    // Create leave request
    @PostMapping
    public LeaveRequest createLeaveRequest(@RequestBody LeaveRequest leaveRequest) {
        return leaveRequestService.createLeaveRequest(leaveRequest);
    }

    // Get all leave requests
    @GetMapping
    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestService.getAllLeaveRequests();
    }

    // Get leave requests by employee
    @GetMapping("/employee/{employeeId}")
    public List<LeaveRequest> getLeaveRequestsByEmployee(@PathVariable Long employeeId) {
        return leaveRequestService.getLeaveRequestsByEmployee(employeeId);
    }

    // Get leave request by ID
    @GetMapping("/{id}")
    public LeaveRequest getLeaveRequestById(@PathVariable Long id) {
        return leaveRequestService.getLeaveRequestById(id)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));
    }

    // Update leave request
    @PutMapping("/{id}")
    public LeaveRequest updateLeaveRequest(@PathVariable Long id, @RequestBody LeaveRequest leaveRequest) {
        return leaveRequestService.updateLeaveRequest(id, leaveRequest);
    }

    // Delete leave request
    @DeleteMapping("/{id}")
    public void deleteLeaveRequest(@PathVariable Long id) {
        leaveRequestService.deleteLeaveRequest(id);
    }

    @GetMapping("/user/{userId}")
    public List<LeaveRequest> getLeavesByUserId(@PathVariable Long userId) {
        return leaveRequestService.getLeavesByUserId(userId);
    }
    
    @PutMapping("/{id}/status")
public LeaveRequest updateLeaveStatus(
        @PathVariable Long id,
        @RequestParam String status) {
    LeaveRequest leave = leaveRequestService.getLeaveRequestById(id)
            .orElseThrow(() -> new RuntimeException("Leave not found"));
    leave.setStatus(status.toUpperCase()); // "APPROVED" or "REJECTED"
    return leaveRequestService.saveLeave(leave);
}


}
