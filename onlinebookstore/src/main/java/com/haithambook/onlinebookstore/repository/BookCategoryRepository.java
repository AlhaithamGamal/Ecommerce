/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.haithambook.onlinebookstore.repository;

import com.haithambook.onlinebookstore.entity.BookCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel = "bookCateogry", path = "book-category")
public interface BookCategoryRepository extends JpaRepository<BookCategory, Long> {
//json categ name collectionalResourceRel
}
