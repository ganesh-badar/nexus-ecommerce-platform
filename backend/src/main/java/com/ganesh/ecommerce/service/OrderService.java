package com.ganesh.ecommerce.service;

import com.ganesh.ecommerce.dto.*;
import com.ganesh.ecommerce.exception.BadRequestException;
import com.ganesh.ecommerce.exception.ResourceNotFoundException;
import com.ganesh.ecommerce.model.Order;
import com.ganesh.ecommerce.model.OrderItem;
import com.ganesh.ecommerce.model.Product;
import com.ganesh.ecommerce.model.User;
import com.ganesh.ecommerce.model.enums.OrderStatus;
import com.ganesh.ecommerce.repository.OrderRepository;
import com.ganesh.ecommerce.repository.ProductRepository;
import com.ganesh.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Transactional
    public OrderResponse createOrder(CreateOrderRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + request.getUserId()));

        com.ganesh.ecommerce.model.enums.PaymentMethod method = request.getPaymentMethod() != null
                ? request.getPaymentMethod()
                : com.ganesh.ecommerce.model.enums.PaymentMethod.PREPAID_UPI;

        boolean isPrepaid = method != com.ganesh.ecommerce.model.enums.PaymentMethod.COD;
        OrderStatus initialStatus = isPrepaid ? OrderStatus.PAID : OrderStatus.PENDING;
        String transactionId = isPrepaid
                ? (request.getPaymentId() != null ? request.getPaymentId() : "TXN-" + System.currentTimeMillis())
                : null;

        Order order = Order.builder()
                .user(user)
                .shippingAddress(request.getShippingAddress())
                .status(initialStatus)
                .paymentMethod(method)
                .paymentId(transactionId)
                .totalAmount(BigDecimal.ZERO)
                .build();

        BigDecimal calculatedTotal = BigDecimal.ZERO;

        for (OrderItemRequest itemRequest : request.getItems()) {
            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + itemRequest.getProductId()));

            // Inventory Stock Check & Atomicity
            if (product.getStockQuantity() < itemRequest.getQuantity()) {
                throw new BadRequestException("Insufficient inventory for product '" + product.getName() +
                        "'. Available: " + product.getStockQuantity() + ", Requested: " + itemRequest.getQuantity());
            }

            // Deduct inventory
            product.setStockQuantity(product.getStockQuantity() - itemRequest.getQuantity());
            productRepository.save(product);

            BigDecimal subtotal = product.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity()));
            calculatedTotal = calculatedTotal.add(subtotal);

            OrderItem orderItem = OrderItem.builder()
                    .product(product)
                    .quantity(itemRequest.getQuantity())
                    .unitPrice(product.getPrice())
                    .subtotal(subtotal)
                    .build();

            order.addOrderItem(orderItem);
        }

        order.setTotalAmount(calculatedTotal);
        Order savedOrder = orderRepository.save(order);

        return mapToResponse(savedOrder);
    }

    public OrderResponse getOrderById(Long orderId) {
        Order order = orderRepository.findWithDetailsById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));
        return mapToResponse(order);
    }

    public List<OrderResponse> getUserOrders(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }
        return orderRepository.findWithDetailsByUserIdOrderByOrderDateDesc(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderResponse updateOrderStatus(Long orderId, OrderStatus newStatus) {
        Order order = orderRepository.findWithDetailsById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));

        // If cancelled, restore stock
        if (newStatus == OrderStatus.CANCELLED && order.getStatus() != OrderStatus.CANCELLED) {
            for (OrderItem item : order.getOrderItems()) {
                Product product = item.getProduct();
                product.setStockQuantity(product.getStockQuantity() + item.getQuantity());
                productRepository.save(product);
            }
        }

        order.setStatus(newStatus);
        Order updated = orderRepository.save(order);
        return mapToResponse(updated);
    }

    public OrderResponse mapToResponse(Order order) {
        List<OrderItemResponse> itemResponses = order.getOrderItems().stream()
                .map(item -> OrderItemResponse.builder()
                        .id(item.getId())
                        .productId(item.getProduct().getId())
                        .productName(item.getProduct().getName())
                        .productImageUrl(item.getProduct().getImageUrl())
                        .quantity(item.getQuantity())
                        .unitPrice(item.getUnitPrice())
                        .subtotal(item.getSubtotal())
                        .build())
                .collect(Collectors.toList());

        return OrderResponse.builder()
                .id(order.getId())
                .userId(order.getUser().getId())
                .userEmail(order.getUser().getEmail())
                .userName(order.getUser().getFirstName() + " " + order.getUser().getLastName())
                .orderDate(order.getOrderDate())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .paymentMethod(order.getPaymentMethod())
                .paymentId(order.getPaymentId())
                .shippingAddress(order.getShippingAddress())
                .items(itemResponses)
                .build();
    }
}
