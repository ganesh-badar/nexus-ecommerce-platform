package com.ganesh.ecommerce.config;

import com.ganesh.ecommerce.model.Product;
import com.ganesh.ecommerce.model.User;
import com.ganesh.ecommerce.model.enums.Role;
import com.ganesh.ecommerce.repository.ProductRepository;
import com.ganesh.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        seedUsers();
        seedProducts();
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            log.info("Seeding initial users...");

            User customer = User.builder()
                    .email("customer@example.com")
                    .passwordHash("$2a$10$encryptedCustomerHashHere")
                    .firstName("Ganesh")
                    .lastName("Kumar")
                    .role(Role.ROLE_CUSTOMER)
                    .build();

            User admin = User.builder()
                    .email("admin@example.com")
                    .passwordHash("$2a$10$encryptedAdminHashHere")
                    .firstName("Admin")
                    .lastName("Manager")
                    .role(Role.ROLE_ADMIN)
                    .build();

            userRepository.saveAll(List.of(customer, admin));
            log.info("Users seeded successfully.");
        }
    }

    private void seedProducts() {
        if (productRepository.count() == 0) {
            log.info("Seeding initial product catalog...");

            List<Product> products = List.of(
                    Product.builder()
                            .name("Sony WH-1000XM5 Wireless Headphones")
                            .description("Industry-leading noise canceling with two processors and 8 microphones. Up to 30-hour battery life with quick charging.")
                            .price(new BigDecimal("399.99"))
                            .stockQuantity(25)
                            .category("Audio")
                            .imageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80")
                            .build(),

                    Product.builder()
                            .name("MacBook Pro 16-inch M3 Pro")
                            .description("Apple M3 Pro chip with 12-core CPU and 18-core GPU, 36GB Unified Memory, 512GB SSD storage, Liquid Retina XDR display.")
                            .price(new BigDecimal("2499.00"))
                            .stockQuantity(12)
                            .category("Computers")
                            .imageUrl("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80")
                            .build(),

                    Product.builder()
                            .name("Apple Watch Ultra 2 Titanium")
                            .description("Rugged and capable 49mm titanium case, precision dual-frequency GPS, up to 36 hours of battery life, bright Always-On Retina display.")
                            .price(new BigDecimal("799.00"))
                            .stockQuantity(18)
                            .category("Wearables")
                            .imageUrl("https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80")
                            .build(),

                    Product.builder()
                            .name("Sony Alpha 7 IV Full-Frame Camera")
                            .description("33MP full-frame Exmor R CMOS sensor, 4K 60p 10-bit 4:2:2 recording, real-time eye AF for human, animal, and bird.")
                            .price(new BigDecimal("2498.00"))
                            .stockQuantity(8)
                            .category("Cameras")
                            .imageUrl("https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80")
                            .build(),

                    Product.builder()
                            .name("Keychron Q1 Pro Mechanical Keyboard")
                            .description("Wireless custom mechanical keyboard with QMK/VIA support, CNC aluminum body, double-gasket design, and hot-swappable switches.")
                            .price(new BigDecimal("199.99"))
                            .stockQuantity(30)
                            .category("Accessories")
                            .imageUrl("https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80")
                            .build(),

                    Product.builder()
                            .name("Logitech MX Master 3S Wireless Mouse")
                            .description("Performance wireless mouse with 8K DPI tracking on glass, quiet clicks, and electromagnetic MagSpeed scrolling.")
                            .price(new BigDecimal("99.99"))
                            .stockQuantity(45)
                            .category("Accessories")
                            .imageUrl("https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80")
                            .build(),

                    Product.builder()
                            .name("Marshall Stanmore III Bluetooth Speaker")
                            .description("Re-engineered for a wider soundstage, iconic vintage rock design, Bluetooth 5.2, and dynamic loudness for room-filling sound.")
                            .price(new BigDecimal("379.99"))
                            .stockQuantity(15)
                            .category("Audio")
                            .imageUrl("https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80")
                            .build(),

                    Product.builder()
                            .name("Dell UltraSharp 32-inch 4K UHD Monitor")
                            .description("IPS Black technology, 98% DCI-P3 color gamut, USB-C Hub with 90W power delivery, ComfortView Plus low blue light screen.")
                            .price(new BigDecimal("829.99"))
                            .stockQuantity(10)
                            .category("Computers")
                            .imageUrl("https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80")
                            .build()
            );

            productRepository.saveAll(products);
            log.info("Product catalog seeded successfully ({} products).", products.size());
        }
    }
}
