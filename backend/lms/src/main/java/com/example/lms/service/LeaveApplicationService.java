package com.example.lms.service;

import com.example.lms.entity.LeaveApplication;
import com.example.lms.repository.LeaveApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeaveApplicationService {

    private final LeaveApplicationRepository leaveApplicationRepository;

    public LeaveApplicationService(LeaveApplicationRepository leaveApplicationRepository) {
        this.leaveApplicationRepository = leaveApplicationRepository;
    }

    public LeaveApplication createLeaveApplication(LeaveApplication leaveApplication) {
        return leaveApplicationRepository.save(leaveApplication);
    }

    public LeaveApplication updateLeaveApplication(Long id, LeaveApplication updatedLeaveApplication) {
        return leaveApplicationRepository.findById(id)
                .map(application -> {
                    application.setStartDate(updatedLeaveApplication.getStartDate());
                    application.setEndDate(updatedLeaveApplication.getEndDate());
                    application.setStatus(updatedLeaveApplication.getStatus());
                    application.setReason(updatedLeaveApplication.getReason());
                    return leaveApplicationRepository.save(application);
                })
                .orElseThrow(() -> new RuntimeException("Leave application not found"));
    }

    public void deleteLeaveApplication(Long id) {
        leaveApplicationRepository.deleteById(id);
    }

    public Optional<LeaveApplication> getLeaveApplicationById(Long id) {
        return leaveApplicationRepository.findById(id);
    }

    public List<LeaveApplication> getAllLeaveApplications() {
        return leaveApplicationRepository.findAll();
    }

    public List<LeaveApplication> getLeaveApplicationsByUserId(Long userId) {
        return leaveApplicationRepository.findByUserId(userId);
    }
}
