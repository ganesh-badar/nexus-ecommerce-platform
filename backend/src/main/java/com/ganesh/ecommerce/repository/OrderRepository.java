package com.ganesh.ecommerce.repository;

import com.ganesh.ecommerce.model.Order;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserIdOrderByOrderDateDesc(Long userId);

    // Mentor Note: Using @EntityGraph eagerly loads orderItems in a single SQL JOIN query,
    // avoiding the N+1 problem without globally changing FetchType.LAZY.
    @EntityGraph(attributePaths = {"orderItems", "orderItems.product", "user"})
    Optional<Order> findWithDetailsById(Long id);

    @EntityGraph(attributePaths = {"orderItems", "orderItems.product"})
    List<Order> findWithDetailsByUserIdOrderByOrderDateDesc(Long userId);
}
