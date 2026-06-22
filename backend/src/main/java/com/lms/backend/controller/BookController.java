package com.lms.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.lms.backend.dto.ResponseDto;
import com.lms.backend.entity.Book;
import com.lms.backend.enums.Genre;
import com.lms.backend.service.BookService;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseDto> addBook(@RequestBody Book book) {
        return bookService.addBook(book);
    }

    @GetMapping("/available/{genre}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<List<Book>> getAvailableBooksByGenre(@PathVariable Genre genre) {
        return ResponseEntity.ok(bookService.getAvailableBooksByGenre(genre));
    }
}
