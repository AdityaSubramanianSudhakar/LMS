package com.example.lms.controller;

import com.example.lms.entity.LeaveRequest;
import com.example.lms.service.LeaveRequestService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/leaves")
public class LeaveRequestController {

    private final LeaveRequestService leaveRequestService;

    public LeaveRequestController(LeaveRequestService leaveRequestService) {
        this.leaveRequestService = leaveRequestService;
    }

    // Create leave request
    @PostMapping
    public ResponseEntity<?> createLeaveRequest(@RequestBody LeaveRequest leaveRequest) {
        try {
            LeaveRequest createdLeave = leaveRequestService.createLeaveRequest(leaveRequest);
            return ResponseEntity.ok(createdLeave);
        } catch (IllegalArgumentException ex) {
            // Overlapping leave detected
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error", ex.getMessage()));
        } catch (Exception ex) {
            // Other unexpected errors
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Something went wrong. Please try again."));
        }
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
public List<LeaveRequest> getAllLeaves() {
    return leaveRequestService.getAllLeaves();
}

}
