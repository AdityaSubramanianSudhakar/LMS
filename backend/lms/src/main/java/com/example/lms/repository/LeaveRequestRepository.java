package com.example.lms.repository;

import com.example.lms.entity.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {

    // Existing method
    List<LeaveRequest> findByEmployeeId(Long employeeId);

    // New method to check overlapping leaves
    @Query("SELECT lr FROM LeaveRequest lr " +
           "WHERE lr.employeeId = :employeeId " +
           "AND lr.status <> 'REJECTED' " +
           "AND ((:startDate BETWEEN lr.startDate AND lr.endDate) " +
           "OR (:endDate BETWEEN lr.startDate AND lr.endDate) " +
           "OR (lr.startDate BETWEEN :startDate AND :endDate) " +
           "OR (lr.endDate BETWEEN :startDate AND :endDate))")
    List<LeaveRequest> findOverlappingLeaves(
        @Param("employeeId") Long employeeId,
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate
    );
}
