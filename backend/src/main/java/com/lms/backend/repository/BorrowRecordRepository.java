package com.lms.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lms.backend.entity.BorrowRecord;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BorrowRecordRepository extends JpaRepository<BorrowRecord, Integer> {
    List<BorrowRecord> findByDueDateBeforeAndIsReturnedFalse(LocalDate date);
    Optional<BorrowRecord> findByUserIdAndBookIdAndIsReturnedFalse(int userId, int bookId);
}
