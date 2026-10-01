package com.ganesh.ecommerce.repository;

import com.ganesh.ecommerce.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Derived Query method with Spring Data JPA
    Page<Product> findByCategoryIgnoreCase(String category, Pageable pageable);

    // Case-insensitive search by name
    Page<Product> findByNameContainingIgnoreCase(String keyword, Pageable pageable);

    // Combined category & search filter
    @Query("SELECT p FROM Product p WHERE " +
           "(:category IS NULL OR LOWER(p.category) = LOWER(:category)) AND " +
           "(:keyword IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Product> searchProducts(@Param("category") String category,
                                 @Param("keyword") String keyword,
                                 Pageable pageable);

    @Query("SELECT DISTINCT p.category FROM Product p WHERE p.category IS NOT NULL")
    List<String> findAllDistinctCategories();
}
