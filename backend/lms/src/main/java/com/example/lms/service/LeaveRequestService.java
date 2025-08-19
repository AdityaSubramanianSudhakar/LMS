package com.example.lms.service;

import com.example.lms.entity.LeaveRequest;
import com.example.lms.repository.LeaveRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeaveRequestService {

    private final LeaveRequestRepository leaveRequestRepository;

    public LeaveRequestService(LeaveRequestRepository leaveRequestRepository) {
        this.leaveRequestRepository = leaveRequestRepository;
    }

    // Create new leave request
    public LeaveRequest createLeaveRequest(LeaveRequest leaveRequest) {
        return leaveRequestRepository.save(leaveRequest);
    }

    // Get all leave requests
    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestRepository.findAll();
    }

    // Get leave requests by employee
    public List<LeaveRequest> getLeaveRequestsByEmployee(Long employeeId) {
        return leaveRequestRepository.findByEmployeeId(employeeId);
    }

    // Get leave request by ID
    public Optional<LeaveRequest> getLeaveRequestById(Long id) {
        return leaveRequestRepository.findById(id);
    }

    // Update leave request
    public LeaveRequest updateLeaveRequest(Long id, LeaveRequest updatedLeaveRequest) {
        return leaveRequestRepository.findById(id)
                .map(lr -> {
                    lr.setLeaveType(updatedLeaveRequest.getLeaveType());
                    lr.setStartDate(updatedLeaveRequest.getStartDate());
                    lr.setEndDate(updatedLeaveRequest.getEndDate());
                    lr.setReason(updatedLeaveRequest.getReason());
                    return leaveRequestRepository.save(lr);
                })
                .orElseThrow(() -> new RuntimeException("Leave request not found"));
    }

    // Delete leave request
    public void deleteLeaveRequest(Long id) {
        leaveRequestRepository.deleteById(id);
    }

    public List<LeaveRequest> getLeavesByUserId(Long userId) {
    return leaveRequestRepository.findByEmployeeId(userId);
    }
    public LeaveRequest updateLeaveStatus(Long id, String status) {
        LeaveRequest leave = leaveRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave not found"));
        leave.setStatus(status.toUpperCase()); // APPROVED or REJECTED
        return leaveRequestRepository.save(leave);
    }
    public LeaveRequest saveLeave(LeaveRequest leaveRequest) {
    return leaveRequestRepository.save(leaveRequest);
    }

}
