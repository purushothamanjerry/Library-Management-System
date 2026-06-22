package com.lms.backend.config;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.lms.backend.entity.Book;
import com.lms.backend.enums.Genre;
import com.lms.backend.repository.BookRepository;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initBooks(BookRepository bookRepository) {
        return args -> {
            if (bookRepository.count() == 0) {
                System.out.println("Initializing sample books into the database...");

                List<Book> sampleBooks = List.of(
                        // Fiction
                        Book.builder().title("The Great Gatsby").author("F. Scott Fitzgerald").genre(Genre.FICTION).year(1925).totalCopies(5).availableCopies(5).build(),
                        Book.builder().title("To Kill a Mockingbird").author("Harper Lee").genre(Genre.FICTION).year(1960).totalCopies(3).availableCopies(3).build(),
                        Book.builder().title("1984").author("George Orwell").genre(Genre.FICTION).year(1949).totalCopies(7).availableCopies(7).build(),
                        Book.builder().title("Pride and Prejudice").author("Jane Austen").genre(Genre.FICTION).year(1813).totalCopies(4).availableCopies(4).build(),
                        Book.builder().title("The Catcher in the Rye").author("J.D. Salinger").genre(Genre.FICTION).year(1951).totalCopies(2).availableCopies(2).build(),

                        // Sci-Fi
                        Book.builder().title("Dune").author("Frank Herbert").genre(Genre.SCIFI).year(1965).totalCopies(6).availableCopies(6).build(),
                        Book.builder().title("Foundation").author("Isaac Asimov").genre(Genre.SCIFI).year(1951).totalCopies(4).availableCopies(4).build(),
                        
                        // Fantasy
                        Book.builder().title("The Hobbit").author("J.R.R. Tolkien").genre(Genre.FANTASY).year(1937).totalCopies(10).availableCopies(10).build(),
                        Book.builder().title("Harry Potter and the Sorcerer's Stone").author("J.K. Rowling").genre(Genre.FANTASY).year(1997).totalCopies(8).availableCopies(8).build(),
                        
                        // Mystery
                        Book.builder().title("The Hound of the Baskervilles").author("Arthur Conan Doyle").genre(Genre.MYSTERY).year(1902).totalCopies(5).availableCopies(5).build()
                );

                bookRepository.saveAll(sampleBooks);
            }
        };
    }
}
