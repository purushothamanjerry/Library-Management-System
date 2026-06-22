package com.lms.backend.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.lms.backend.repository.AuthenticationRepo;
import com.lms.backend.repository.BookRepository;
import com.lms.backend.repository.BorrowRecordRepository;
import com.lms.backend.dto.ResponseDto;
import com.lms.backend.entity.Book;
import com.lms.backend.entity.BorrowRecord;
import com.lms.backend.entity.User;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BorrowingService {

    private final BorrowRecordRepository borrowRecordRepository;
    private final BookRepository bookRepository;
    private final AuthenticationRepo userRepository;

    public BorrowingService(BorrowRecordRepository borrowRecordRepository, BookRepository bookRepository, AuthenticationRepo userRepository) {
        this.borrowRecordRepository = borrowRecordRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    public ResponseEntity<ResponseDto> borrowBook(int userId, int bookId) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Book> bookOpt = bookRepository.findById(bookId);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body(new ResponseDto("User not found", false));
        }
        if (bookOpt.isEmpty()) {
            return ResponseEntity.status(404).body(new ResponseDto("Book not found", false));
        }

        Book book = bookOpt.get();
        if (book.getAvailableCopies() <= 0) {
            return ResponseEntity.badRequest().body(new ResponseDto("No available copies for this book", false));
        }

        Optional<BorrowRecord> activeBorrow = borrowRecordRepository.findByUserIdAndBookIdAndIsReturnedFalse(userId, bookId);
        if (activeBorrow.isPresent()) {
            return ResponseEntity.badRequest().body(new ResponseDto("User has already borrowed this book and not returned it", false));
        }

        book.setAvailableCopies(book.getAvailableCopies() - 1);
        bookRepository.save(book);

        BorrowRecord record = BorrowRecord.builder()
                .user(userOpt.get())
                .book(book)
                .borrowDate(LocalDate.now())
                .dueDate(LocalDate.now().plusDays(15))
                .isReturned(false)
                .build();

        borrowRecordRepository.save(record);

        return ResponseEntity.ok(new ResponseDto("Book borrowed successfully", true));
    }

    public ResponseEntity<ResponseDto> returnBook(int borrowRecordId) {
        Optional<BorrowRecord> recordOpt = borrowRecordRepository.findById(borrowRecordId);
        if (recordOpt.isEmpty()) {
            return ResponseEntity.status(404).body(new ResponseDto("Borrow record not found", false));
        }

        BorrowRecord record = recordOpt.get();
        if (record.isReturned()) {
            return ResponseEntity.badRequest().body(new ResponseDto("Book is already returned", false));
        }

        record.setReturned(true);
        record.setReturnDate(LocalDate.now());
        borrowRecordRepository.save(record);

        Book book = record.getBook();
        book.setAvailableCopies(book.getAvailableCopies() + 1);
        bookRepository.save(book);

        return ResponseEntity.ok(new ResponseDto("Book returned successfully", true));
    }

    public ResponseEntity<ResponseDto> extendDueDate(int borrowRecordId, int extraDays) {
        Optional<BorrowRecord> recordOpt = borrowRecordRepository.findById(borrowRecordId);
        if (recordOpt.isEmpty()) {
            return ResponseEntity.status(404).body(new ResponseDto("Borrow record not found", false));
        }

        BorrowRecord record = recordOpt.get();
        if (record.isReturned()) {
            return ResponseEntity.badRequest().body(new ResponseDto("Cannot extend due date for a returned book", false));
        }

        record.setDueDate(record.getDueDate().plusDays(extraDays));
        borrowRecordRepository.save(record);

        return ResponseEntity.ok(new ResponseDto("Due date extended successfully by " + extraDays + " days", true));
    }

    public ResponseEntity<ResponseDto> borrowBookByEmail(String email, int bookId) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        Optional<Book> bookOpt = bookRepository.findById(bookId);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body(new ResponseDto("User not found", false));
        }
        if (bookOpt.isEmpty()) {
            return ResponseEntity.status(404).body(new ResponseDto("Book not found", false));
        }

        Book book = bookOpt.get();
        if (book.getAvailableCopies() <= 0) {
            return ResponseEntity.badRequest().body(new ResponseDto("No available copies for this book", false));
        }

        Optional<BorrowRecord> activeBorrow = borrowRecordRepository.findByUserEmailAndBookIdAndIsReturnedFalse(email, bookId);
        if (activeBorrow.isPresent()) {
            return ResponseEntity.badRequest().body(new ResponseDto("You have already borrowed this book and not returned it", false));
        }

        book.setAvailableCopies(book.getAvailableCopies() - 1);
        bookRepository.save(book);

        BorrowRecord record = BorrowRecord.builder()
                .user(userOpt.get())
                .book(book)
                .borrowDate(LocalDate.now())
                .dueDate(LocalDate.now().plusDays(15))
                .isReturned(false)
                .build();

        borrowRecordRepository.save(record);

        return ResponseEntity.ok(new ResponseDto("Book borrowed successfully", true));
    }

    public List<BorrowRecord> getUserBooks(String email) {
        return borrowRecordRepository.findByUserEmail(email);
    }

    public List<BorrowRecord> getOverdueBooks() {
        return borrowRecordRepository.findByDueDateBeforeAndIsReturnedFalse(LocalDate.now());
    }
}
