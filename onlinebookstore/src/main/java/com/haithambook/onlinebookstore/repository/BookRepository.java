/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.haithambook.onlinebookstore.repository;

import com.haithambook.onlinebookstore.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;


public interface BookRepository extends JpaRepository<Book, Long> {
    //Cross origin allow requests from angular to access spring
    /*
     * list of books by category
     * */
    @RestResource(path = "categoryid")
    Page<Book> findByCategoryId(@Param("id") Long id, Pageable pageable);

    /*
    @CrossOrigin("*")
     * list of books by name contains
     * */
    @RestResource(path = "searchbykeyword")
    Page<Book> findByNameContaining(@Param("name") String keyword, Pageable pageable);
}
