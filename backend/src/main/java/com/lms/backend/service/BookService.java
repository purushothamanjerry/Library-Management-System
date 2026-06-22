package com.lms.backend.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.lms.backend.repository.BookRepository;
import com.lms.backend.dto.ResponseDto;
import com.lms.backend.entity.Book;
import com.lms.backend.enums.Genre;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public boolean isAvailable(int id) {
        Optional<Book> book = bookRepository.findById(id);
        return book.isPresent() && book.get().getAvailableCopies() > 0;
    }

    public List<Book> getAvailableBooksByGenre(Genre genre) {
        return bookRepository.findByGenreAndAvailableCopiesGreaterThan(genre, 0);
    }

    public boolean existsByTitle(String title) {
        return bookRepository.existsByTitle(title);
    }

    public ResponseEntity<ResponseDto> addBook(Book book) {
        if (bookRepository.existsByTitle(book.getTitle())) {
            return ResponseEntity.badRequest().body(new ResponseDto("Book already exists", false));
        }
        bookRepository.save(book);
        return ResponseEntity.ok(new ResponseDto("Book added successfully", true));
    }
}
