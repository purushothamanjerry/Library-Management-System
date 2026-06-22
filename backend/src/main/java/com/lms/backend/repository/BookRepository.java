package com.lms.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lms.backend.entity.Book;
import com.lms.backend.enums.Genre;

public interface BookRepository extends JpaRepository<Book, Integer> {
    Optional<Book> findById(int id);

    boolean existsByTitle(String title);

    List<Book> findByGenreAndAvailableCopiesGreaterThan(Genre genre, int availableCopies);
}
