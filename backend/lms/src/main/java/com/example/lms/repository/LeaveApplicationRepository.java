package com.example.lms.repository;

import com.example.lms.entity.LeaveApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LeaveApplicationRepository extends JpaRepository<LeaveApplication, Long> {
    List<LeaveApplication> findByUserId(Long userId);
    List<LeaveApplication> findByUserIdAndStatus(Long userId, String status);
    List<LeaveApplication> findByStatus(String status);
}
