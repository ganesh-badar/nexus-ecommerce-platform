package com.ganesh.ecommerce.dto;

import com.ganesh.ecommerce.model.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private Long id;
    private Long userId;
    private String userEmail;
    private String userName;
    private LocalDateTime orderDate;
    private BigDecimal totalAmount;
    private OrderStatus status;
    private com.ganesh.ecommerce.model.enums.PaymentMethod paymentMethod;
    private String paymentId;
    private String shippingAddress;
    private List<OrderItemResponse> items;
}
