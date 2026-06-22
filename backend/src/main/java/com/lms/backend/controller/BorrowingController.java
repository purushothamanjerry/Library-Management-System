package com.lms.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.lms.backend.dto.BorrowRequestDto;
import com.lms.backend.dto.ResponseDto;
import com.lms.backend.entity.BorrowRecord;
import com.lms.backend.service.BorrowingService;

import java.util.List;

@RestController
@RequestMapping("/api/borrowing")
public class BorrowingController {

    private final BorrowingService borrowingService;

    public BorrowingController(BorrowingService borrowingService) {
        this.borrowingService = borrowingService;
    }

    @PostMapping("/borrow")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseDto> borrowBook(@RequestBody BorrowRequestDto request) {
        return borrowingService.borrowBook(request.getUserId(), request.getBookId());
    }

    @PostMapping("/return/{recordId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ResponseDto> returnBook(@PathVariable int recordId) {
        return borrowingService.returnBook(recordId);
    }

    @PostMapping("/extend/{recordId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ResponseDto> extendDueDate(@PathVariable int recordId, @RequestParam int extraDays) {
        return borrowingService.extendDueDate(recordId, extraDays);
    }

    @GetMapping("/overdue")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BorrowRecord>> getOverdueBooks() {
        return ResponseEntity.ok(borrowingService.getOverdueBooks());
    }
}
