# Nexus E-Commerce Platform &mdash; Complete System Documentation & Setup Guide

This document provides an exhaustive, file-by-file and folder-by-folder architectural reference for the entire **Nexus E-Commerce Platform**, accompanied by complete, step-by-step instructions for running locally and deploying to production.

---

## 1. Complete Project Structure Map

```
nexus-ecommerce-platform/
├── LICENSE                                     # MIT License declaration
├── README.md                                    # Primary project overview and quickstart
├── COMPLETE_WALKTHROUGH_GUIDE.md                # Engineering walkthrough and Spring Boot transition guide
├── PROJECT_ARCHITECTURE_AND_SETUP_GUIDE.md      # This exhaustive file-by-file reference & deployment manual
│
├── backend/                                     # Spring Boot 3 REST API Backend
│   ├── pom.xml                                  # Maven project configuration and dependencies
│   ├── Dockerfile                               # Production multi-stage Docker container specification
│   └── src/
│       └── main/
│           ├── resources/
│           │   └── application.properties       # Spring Boot configuration (Port, MySQL, JPA, HikariCP)
│           └── java/com/ganesh/ecommerce/
│               ├── EcommerceApplication.java    # Spring Boot application entry point (@SpringBootApplication)
│               ├── config/                      # Infrastructure & security configurations
│               │   ├── DataSeeder.java          # Automatic seed data loader for products and admin/demo users
│               │   └── WebConfig.java           # Cross-Origin Resource Sharing (CORS) security configuration
│               ├── controller/                  # RESTful API controllers (HTTP endpoints)
│               │   ├── AuthController.java      # Login & registration endpoint routing
│               │   ├── OrderController.java     # Order placement, tracking & status transition routing
│               │   ├── ProductController.java   # Catalog querying, filtering, creation & deletion routing
│               │   └── UserController.java      # User profile inspection endpoints
│               ├── dto/                         # Data Transfer Objects (Decoupled Request/Response models)
│               │   ├── AuthResponse.java        # Authentication session response payload
│               │   ├── CreateOrderRequest.java  # Order submission payload with line items & shipping address
│               │   ├── LoginRequest.java        # User credential validation payload
│               │   ├── OrderItemRequest.java    # Individual item purchase quantity & product ID
│               │   ├── OrderItemResponse.java   # Serialized order item details
│               │   ├── OrderResponse.java       # Serialized complete order with status & tracking
│               │   ├── ProductRequest.java      # Product creation/update validation payload
│               │   ├── ProductResponse.java     # Serialized product entity payload
│               │   └── RegisterRequest.java     # User account registration validation payload
│               ├── exception/                   # Error handling infrastructure
│               │   ├── BadRequestException.java # HTTP 400 custom exception
│               │   ├── ErrorResponse.java       # Standardized JSON error response schema
│               │   ├── GlobalExceptionHandler.java # @RestControllerAdvice centralized error interceptor
│               │   └── ResourceNotFoundException.java # HTTP 404 entity lookup exception
│               ├── model/                       # JPA Relational Entities
│               │   ├── Order.java               # Purchase order entity mapped to 'orders' table
│               │   ├── OrderItem.java           # Order line item mapped to 'order_items' table
│               │   ├── Product.java             # Catalog item mapped to 'products' table
│               │   ├── User.java                # Registered account mapped to 'users' table
│               │   └── enums/                   # Strongly typed entity enumerations
│               │       ├── OrderStatus.java     # PENDING, PAID, SHIPPED, DELIVERED, CANCELLED
│               │       ├── PaymentMethod.java   # PREPAID_UPI, PREPAID_CARD, PREPAID_NETBANKING, COD
│               │       └── Role.java            # ROLE_CUSTOMER, ROLE_ADMIN
│               ├── repository/                  # Spring Data JPA persistence interfaces
│               │   ├── OrderRepository.java     # JPQL queries with @EntityGraph join-fetch optimization
│               │   ├── ProductRepository.java   # Catalog search, category filter & pagination repository
│               │   └── UserRepository.java      # Derived query repository for email lookups
│               └── service/                     # Transactional business logic layer
│                   ├── AuthService.java         # Password verification, registration & role validation
│                   ├── OrderService.java        # Atomic order placement (@Transactional) & cancellation
│                   └── ProductService.java      # Catalog CRUD logic & stock reservation handling
│
└── frontend/                                    # React 18 + Vite Storefront & Merchant Console
    ├── index.html                               # SPA HTML template with vector favicon & clean meta tags
    ├── package.json                             # Dependencies, build scripts & gh-pages deployment scripts
    ├── package-lock.json                        # Locked dependency tree
    ├── vite.config.js                           # Vite bundler configuration (relative base './')
    ├── vercel.json                              # Optional Vercel deployment routing configuration
    ├── .oxlintrc.json                           # Fast linter configuration rules
    ├── public/                                  # Static asset distribution directory
    │   └── favicon.svg                          # Geometric vector SVG favicon (Obsidian / Nexus monogram)
    └── src/
        ├── main.jsx                             # React root bootstrap with ErrorBoundary & DOM mounting
        ├── App.jsx                              # Root application state orchestrator & perspective engine
        ├── index.css                            # Architectural monochrome design system & tokens (zero vibe-coding)
        ├── App.css                              # Component layout utilities
        ├── services/
        │   └── api.js                           # API client with health checking & fallback offline data
        └── components/                          # Modular React interface components
            ├── Navbar.jsx                       # Navigation header, perspective switch, domain badge & cart count
            ├── HeroBanner.jsx                   # Factual hardware storefront banner with verified operational guarantees
            ├── CategoryFilter.jsx               # Rectangular structured category chips & sort selector
            ├── ProductCard.jsx                  # Catalog item card with genuine SKU, stock levels & solid buttons
            ├── ProductDetailsModal.jsx          # Deep hardware spec inspector with verified inventory data
            ├── CartDrawer.jsx                   # Offcanvas cart manager with quantity steppers & tax summary
            ├── CheckoutModal.jsx                # Multi-step checkout with instant prepaid payment & COD options
            ├── OrdersModal.jsx                  # Customer order history manager with status tracking
            ├── OrderTrackingModal.jsx           # Real-time multi-step courier delivery timeline
            ├── SellerDashboard.jsx              # Merchant console: catalog CRUD, fulfillment & domain launch gate
            ├── AddProductModal.jsx              # Merchant product publishing modal with validation
            ├── EditProductModal.jsx             # Merchant inline catalog updater
            ├── AuthModal.jsx                    # User authentication gate (Login & Registration auto-switch)
            ├── PrivacyPolicyModal.jsx           # Formal GDPR & CCPA compliant privacy disclosure
            ├── TermsModal.jsx                   # Binding commercial terms of sale & warranty agreement
            ├── CustomDomainModal.jsx            # Custom domain manager, DNS verification (A/CNAME) & TLS 1.3 gate
            ├── ToastNotification.jsx            # Non-blocking animated feedback notifications
            └── ErrorBoundary.jsx                # React class component error boundary with graceful fallback
```

---

## 2. Exhaustive File-by-File & Folder-by-Folder Documentation

### Root Directory

#### `LICENSE`
Declares the open-source MIT License under which the project is distributed, permitting modification, distribution, and commercial use.

#### `README.md`
The public repository entry point. Contains system architecture badges, relational database diagrams, key buyer and merchant features, API endpoint specifications, and senior engineering design patterns.

#### `COMPLETE_WALKTHROUGH_GUIDE.md`
A tutorial document detailing the transition from traditional manual JDBC/Hibernate XML configurations to Spring Boot 3, Spring Data JPA, HikariCP, and component-based React 18.

#### `PROJECT_ARCHITECTURE_AND_SETUP_GUIDE.md`
*This document.* Serves as the complete technical manual for every directory and file, explaining their duties, relationships, and instructions for running and deploying.

---

### Backend (`/backend`)

#### `pom.xml`
The Maven build descriptor for the backend service. Configures:
- **Parent**: `spring-boot-starter-parent` (version `3.4.1`)
- **Java Version**: `17`
- **Core Starters**:
  - `spring-boot-starter-web`: Embedded Tomcat container and Spring MVC REST controllers.
  - `spring-boot-starter-data-jpa`: Hibernate ORM, Spring Data repositories, and HikariCP connection pool.
  - `spring-boot-starter-validation`: Hibernate Validator implementing JSR-380 annotations (`@NotBlank`, `@Min`).
  - `mysql-connector-j`: Official MySQL 8 JDBC driver.
  - `spring-boot-starter-actuator`: Health check and operational metrics endpoint (`/actuator/health`).

#### `Dockerfile`
Multi-stage Docker build configuration for packaging the backend into a container:
- **Stage 1 (Builder)**: Uses `maven:3.9-eclipse-temurin-17` to execute `mvn clean package -DskipTests`, generating the optimized production `.jar` file.
- **Stage 2 (Runtime)**: Uses lightweight `eclipse-temurin:17-jre-alpine`, exposes port `${PORT:-8080}`, and launches via `java -jar app.jar`.

#### `src/main/resources/application.properties`
Centralized Spring Boot runtime configuration:
- `server.port`: Dynamically binds to environment variable `${PORT:8080}` for cloud PaaS compatibility (Render, Railway, Heroku).
- `spring.datasource.url`: Points to MySQL database (`ecommerce_db`) with `useSSL=false` and `serverTimezone=UTC`.
- `spring.jpa.hibernate.ddl-auto`: Set to `update` for automated schema synchronization.
- `spring.jpa.open-in-view=false`: Disables Open Session in View (OSIV) to enforce strict transactional boundaries in `@Service` beans, preventing lazy-loading queries during controller serialization.

#### `src/main/java/com/ganesh/ecommerce/EcommerceApplication.java`
The primary Spring Boot bootstrap class containing the `main(String[] args)` method. Uses `@SpringBootApplication` to enable component scanning, autoconfiguration, and property loading.

#### `config/DataSeeder.java`
Implements Spring's `CommandLineRunner` interface. Executes automatically upon application startup:
- Checks if the `users` and `products` tables are populated.
- If empty, seeds default test users:
  - `customer@example.com` (Customer role, pre-configured address)
  - `admin@example.com` (Admin/Merchant role)
- Seeds initial commercial electronics hardware (Sony WH-1000XM5, MacBook Pro 16", Apple Watch Ultra, Sony Alpha 7 IV, Keychron Q1 Pro, Logitech MX Master 3S, Marshall Stanmore III, Dell UltraSharp 32" 4K) with realistic prices, inventory allotments, and categories.

#### `config/WebConfig.java`
Implements `WebMvcConfigurer` to define global Cross-Origin Resource Sharing (CORS) rules:
- Allows cross-origin requests from `http://localhost:5173`, `http://localhost:3000`, and GitHub Pages origin (`https://ganesh-badar.github.io`).
- Authorizes HTTP methods: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `OPTIONS`.

#### `controller/AuthController.java`
Exposes `/api/auth` endpoints:
- `POST /api/auth/login`: Accepts `LoginRequest`, delegates credential checking to `AuthService`, returns `AuthResponse`.
- `POST /api/auth/register`: Accepts `RegisterRequest`, checks email uniqueness, hashes credentials, and persists a new `User`.

#### `controller/OrderController.java`
Exposes `/api/orders` endpoints:
- `POST /api/orders`: Submits an atomic checkout payload via `OrderService.createOrder()`.
- `GET /api/orders/{id}`: Returns order details and line items for a given ID.
- `GET /api/orders/user/{userId}`: Retrieves purchase history for a specific customer account.
- `PATCH /api/orders/{id}/status`: Merchant endpoint to update order status (`PENDING` &rarr; `PAID` &rarr; `SHIPPED` &rarr; `DELIVERED` &rarr; `CANCELLED`), triggering inventory returns on cancellation.

#### `controller/ProductController.java`
Exposes `/api/products` endpoints:
- `GET /api/products`: Queries catalog with optional category filtering (`?category=...`) and text search (`?search=...`).
- `GET /api/products/categories`: Returns distinct product category names.
- `GET /api/products/{id}`: Returns single product inspection payload.
- `POST /api/products`: Merchant endpoint to create a new product SKU.
- `PUT /api/products/{id}`: Merchant endpoint to update price, stock, or description.
- `DELETE /api/products/{id}`: Merchant endpoint to safely remove an item from the catalog.

#### `controller/UserController.java`
Exposes `/api/users` endpoints for account inspection and administrative auditing.

#### `dto/` (Data Transfer Objects)
Decoupled Java records/classes to isolate database entities from public API JSON:
- `AuthResponse.java`: Carries user identifier, name, email, role, and session token.
- `CreateOrderRequest.java`: Contains list of `OrderItemRequest` items, shipping address, and chosen `PaymentMethod`.
- `LoginRequest.java`: Validated user email and password inputs.
- `OrderItemRequest.java`: Contains `productId` and requested `quantity`.
- `OrderItemResponse.java`: Output structure for an item inside an order invoice.
- `OrderResponse.java`: Complete structured order output including total amount, status, date, line items, and shipping address.
- `ProductRequest.java`: Form payload for creating or editing products with `@DecimalMin` validation.
- `ProductResponse.java`: Structured representation of a product.
- `RegisterRequest.java`: Validation annotations for new user registrations.

#### `exception/`
- `BadRequestException.java`: Thrown on validation or logical inconsistencies (e.g., negative stock, mismatched passwords).
- `ResourceNotFoundException.java`: Thrown when looking up non-existent product or order IDs.
- `ErrorResponse.java`: Standardized JSON schema for errors containing timestamp, HTTP status code, error message, and request path.
- `GlobalExceptionHandler.java`: Annotated with `@RestControllerAdvice`. Intercepts uncaught exceptions and converts them into structured `ResponseEntity<ErrorResponse>` objects, preventing stack trace leaks.

#### `model/` (JPA Relational Entities)
- `User.java`: Entity mapped to `users` table. Stores name, unique email, password hash, role (`ROLE_CUSTOMER` or `ROLE_ADMIN`), and timestamps.
- `Product.java`: Entity mapped to `products` table. Stores name, description, unit price (`BigDecimal`), stock quantity (`Integer`), category, and image URL.
- `Order.java`: Entity mapped to `orders` table. Stores user reference (`@ManyToOne`), order timestamp, total amount, order status, shipping address, and one-to-many relationship with `order_items`.
- `OrderItem.java`: Entity mapped to `order_items` table. Stores composite reference to `Order` (`@ManyToOne`) and `Product` (`@ManyToOne`), capturing historical unit price and quantity at time of purchase.
- `enums/OrderStatus.java`: Enum containing `PENDING`, `PAID`, `SHIPPED`, `DELIVERED`, `CANCELLED`.
- `enums/PaymentMethod.java`: Enum containing `PREPAID_UPI`, `PREPAID_CARD`, `PREPAID_NETBANKING`, `COD`.
- `enums/Role.java`: Enum containing `ROLE_CUSTOMER`, `ROLE_ADMIN`.

#### `repository/`
- `UserRepository.java`: Extends `JpaRepository<User, Long>`. Provides `findByEmail(String email)` and `existsByEmail(String email)`.
- `ProductRepository.java`: Extends `JpaRepository<Product, Long>`. Provides JPQL search methods:
  - `findByCategory(String category)`
  - `findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(...)`
  - `findDistinctCategories()`
- `OrderRepository.java`: Extends `JpaRepository<Order, Long>`. Implements `@EntityGraph(attributePaths = {"orderItems", "orderItems.product", "user"})` on `findByUserIdOrderByOrderDateDesc(Long userId)`, resolving Hibernate N+1 query bottlenecks in a single SQL `LEFT JOIN`.

#### `service/`
- `AuthService.java`: Business logic for credential checking, password matching, and account creation.
- `OrderService.java`: Encapsulates atomic checkout inside `@Transactional`:
  1. Validates that every requested product exists and has sufficient `stockQuantity`.
  2. Atomically decrements `stockQuantity` from each `Product`.
  3. Computes subtotal, tax, and total amount.
  4. Saves `Order` and associated `OrderItem` entities.
  5. On cancellation, automatically restores product inventory allotments.
- `ProductService.java`: Business logic for product creation, modification, stock increments, and removal.

---

### Frontend (`/frontend`)

#### `index.html`
The single-page application HTML document:
- Configures `<link rel="icon" type="image/svg+xml" href="./favicon.svg" />`.
- Imports Google Fonts: `Plus Jakarta Sans`, `Space Grotesk`, and `JetBrains Mono`.
- Defines clean, non-vague title and metadata without emojis or promotional watermarks.

#### `package.json`
Specifies frontend dependencies and scripts:
- `dependencies`:
  - `react` & `react-dom` (v19)
  - `bootstrap` (v5.3) & `bootstrap-icons`
  - `lucide-react`: Modern SVG vector icons
- `devDependencies`:
  - `vite`: Next-generation frontend bundler
  - `@vitejs/plugin-react`: Babel/SWC fast refresh plugin
  - `gh-pages`: Deployment CLI for GitHub Pages
  - `oxlint`: High-performance Rust-based linter
- `scripts`:
  - `"dev"`: Runs local Vite development server
  - `"build"`: Compiles production bundle into `/dist`
  - `"preview"`: Serves `/dist` locally for validation
  - `"deploy"`: Automated script executing `gh-pages -d dist -b gh-pages`

#### `vite.config.js`
Vite build configuration file:
- Specifies `plugins: [react()]`
- Sets `base: './'` (relative base path), enabling the app to run seamlessly whether hosted on a custom root domain (`store.nexustech.io`) or a GitHub Pages repository subpath (`ganesh-badar.github.io/nexus-ecommerce-platform/`).

#### `public/favicon.svg`
Custom vector SVG favicon featuring an architectural geometric Nexus "N" mark on a dark graphite background with a cyan accent dot. Zero emojis.

#### `src/main.jsx`
The client application entry point:
- Mounts `<App />` inside React 19 `StrictMode`.
- Wraps root in `<ErrorBoundary>` to catch unhandled lifecycle exceptions.
- Imports `index.css`.

#### `src/index.css`
The architectural design system stylesheet:
- Declares CSS custom properties (`--bg-body: #090a0f`, `--bg-surface: #111318`, `--action-solid: #f8fafc`, `--border-subtle: #232734`).
- **Strictly excludes all purple gradients** and pill buttons.
- Defines `.btn-brand-solid`, `.btn-brand-primary`, `.btn-brand-outline`.
- Defines `.category-chip` (rectangular structured chips with `border-radius: 4px`).
- Enforces standard cursor behavior with zero cursor trails or scrolljacking.

#### `src/services/api.js`
The communication layer between React and the Spring Boot API:
- Dynamically resolves backend endpoint from `VITE_API_BASE_URL` (defaults to `http://localhost:8080/api`).
- Implements `checkBackendHealth()`: Pings `/products` with an `AbortSignal.timeout(2000)` to detect backend availability.
- **Graceful Fallback Mode**: If the Spring Boot backend is offline, `api.js` provides an in-memory sample catalog (Sony, Apple, Keychron, Logitech, Marshall, Dell) and local state simulation, enabling standalone testing and GitHub Pages demonstrations without a live database.

#### `src/components/Navbar.jsx`
The primary navigation header:
- Brand identity with architectural SVG icon.
- Dual-perspective switcher (`Buyer View` vs. `Seller Portal`) with rectangular tabs.
- Live custom domain status badge (`store.nexustech.io [DNS OK]`) that opens the Custom Domain configuration modal.
- Global product search input with clear trigger.
- Order drawer toggle with real-time count badge.
- Shopping cart trigger with item count badge.
- User profile initials badge and authentication sign-in/sign-out buttons.

#### `src/components/HeroBanner.jsx`
Direct hardware storefront banner:
- Replaces vague marketing buzzwords with factual copy: *"Direct Hardware Storefront & Enterprise Logistics"*.
- System status eyebrow tag displaying active custom domain and DNS verification status.
- Operational guarantees: 24-hour carrier handoff, 2-year official manufacturer warranty, 30-day inspection protocol.
- Zero purple gradients, zero emojis.

#### `src/components/CategoryFilter.jsx`
Catalog filter bar:
- Structured rectangular category chips (`All`, `Audio`, `Computers`, `Cameras`, `Wearables`, `Accessories`).
- Sort dropdown: Featured, Price (Low to High), Price (High to Low), Name (A-Z).
- SKU counter showing total visible products.

#### `src/components/ProductCard.jsx`
Storefront product card:
- Displays high-resolution image with category tag.
- Replaces fake star ratings with authentic technical hardware identifiers (`SKU: NX-100X`).
- Real-time stock status badge (`In Stock (XX)` or `Stock: X Left`).
- Quick-view inspection button and shopping cart addition trigger.

#### `src/components/ProductDetailsModal.jsx`
Detailed product specification modal:
- High-resolution hardware preview.
- Authentic OEM hardware guarantee badge.
- Stock availability and priority dispatch lead time.
- Quantity adjustment stepper and Add to Cart action.

#### `src/components/CartDrawer.jsx`
Offcanvas shopping cart drawer:
- Item list with quantity increment/decrement steppers and removal triggers.
- Subtotal calculation, free shipping indicator, and estimated 5% tax computation.
- Checkout trigger with automatic authentication check.

#### `src/components/CheckoutModal.jsx`
Secure checkout and payment processing modal:
- Shipping details input (full name, phone, email, street address).
- Instant prepaid payment methods (Prepaid UPI / QR, Credit/Debit Card, Net Banking) and Cash on Delivery (COD).
- 256-bit SSL encrypted security badge.
- Submits atomic order to backend (or fallback simulation).

#### `src/components/OrdersModal.jsx`
Customer order history modal:
- Displays placed orders, dates, total amounts, and shipping addresses.
- Status badges: `PENDING`, `PAID`, `SHIPPED`, `DELIVERED`, `CANCELLED`.
- Self-service cancellation button (restores inventory).
- "Track Package" action opening the live delivery timeline.

#### `src/components/OrderTrackingModal.jsx`
Interactive courier shipment tracker:
- Real-time 4-step delivery timeline: Order Confirmed &rarr; Allocation Packed &rarr; In Transit with Courier &rarr; Delivered.
- Tracking number copy utility and estimated arrival date computation.

#### `src/components/SellerDashboard.jsx`
Merchant back-office operations console:
- Live calculated KPI cards: Listed SKUs, Total Units in Stock, Low-Stock Warnings, Active Orders, Gross Sales Volume.
- Tab 1: **Product Inventory**: Full inventory table with inline price/stock edits and SKU removal.
- Tab 2: **Customer Orders Fulfillment**: Transition order statuses from `PENDING` to `PAID`, `SHIPPED`, `DELIVERED`.
- Tab 3: **Custom Domain & Launch Status**: Production launch gate verifying domain connectivity, DNS records, and legal compliance.

#### `src/components/AddProductModal.jsx`
Merchant modal to list new hardware SKUs with name, category, price, stock quantity, image URL, and description.

#### `src/components/EditProductModal.jsx`
Merchant modal to update existing catalog entries with validation.

#### `src/components/AuthModal.jsx`
User authentication gate:
- Supports both Login and Registration modes.
- Auto-switches from Login to Register if an email is not found, pre-filling entered credentials for zero user friction.
- Role selection for new accounts: Customer vs. Shop Owner (Admin).
- One-click demo credentials for rapid testing.

#### `src/components/PrivacyPolicyModal.jsx`
Comprehensive GDPR and CCPA compliant legal disclosure:
- Details categories of personal data collected, lawful bases of processing, data retention schedules, third-party carrier disclosures, cookie policies, and consumer rights.

#### `src/components/TermsModal.jsx`
Commercial terms and conditions of sale:
- Governs order acceptance, inventory allocation, price verification, payment tokenization, shipping risk transfer, 30-day inspection period, and 24-month manufacturer warranty.

#### `src/components/CustomDomainModal.jsx`
Custom domain and DNS routing manager:
- Domain input supporting any fully qualified domain name (FQDN).
- Live DNS delegation table detailing required A Record (`76.76.21.21` at `@`) and CNAME Record (`cname.nexustech.io` at `store`).
- TLS 1.3 certificate status validation.
- Interactive Pre-Launch Verification Gate.

#### `src/components/ToastNotification.jsx`
Fixed non-blocking animated alert notifications for user actions (cart additions, order placements, auth events).

#### `src/components/ErrorBoundary.jsx`
React Error Boundary class component that catches client runtime errors, displays a clean technical error message, and provides session cache clearing and storefront reloads.

---

## 3. Step-by-Step Guide: How to Run the Project Locally

### Prerequisites
Ensure the following tools are installed on your machine:
- **Java Development Kit (JDK)**: Version 17 or higher (`java -version`)
- **Apache Maven**: Version 3.8 or higher (`mvn -version`)
- **Node.js**: Version 18, 20, or 22+ (`node -v`)
- **MySQL Server**: Version 8.0 or higher (`mysql --version`)

---

### Step 1: Database Setup (MySQL)

1. Open your MySQL client (MySQL Workbench, DBeaver, or terminal):
   ```bash
   mysql -u root -p
   ```
2. Create the database:
   ```sql
   CREATE DATABASE IF NOT EXISTS ecommerce_db;
   ```
3. Verify creation:
   ```sql
   SHOW DATABASES;
   ```

---

### Step 2: Backend Setup & Execution (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd nexus-ecommerce-platform/backend
   ```
2. Open `src/main/resources/application.properties` and verify your MySQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
   spring.datasource.username=root
   spring.datasource.password=your_mysql_password
   ```
3. Build and launch the Spring Boot application using Maven:
   ```bash
   mvn clean spring-boot:run
   ```
4. The server will start on port `8080`.
   - On initial launch, `DataSeeder` will automatically populate sample products and demo users into `ecommerce_db`.
   - Verify server health by visiting: `http://localhost:8080/api/products`

---

### Step 3: Frontend Setup & Execution (React + Vite)

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd nexus-ecommerce-platform/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite local development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

---

### Step 4: Testing Storefront Workflows

- **Buyer Perspective**:
  - Filter products by category chips (`Audio`, `Computers`, etc.) or use the search bar.
  - Click on any product to open the hardware inspection modal.
  - Add items to your cart, click the Cart button, and proceed to checkout.
  - Complete checkout using prepaid or COD payment options.
  - Open the **Orders** modal to inspect your order and click **Track Package** to test the live courier timeline.
- **Seller Perspective**:
  - Click the **Seller Portal** tab in the navbar.
  - Use demo login credentials: `admin@example.com` / `admin123`.
  - Add new products, update existing inventory, and update order statuses (`PENDING` &rarr; `SHIPPED` &rarr; `DELIVERED`).
  - Open the **Custom Domain & Launch Status** tab to test domain verification.

---

## 4. Step-by-Step Guide: How to Deploy to GitHub Pages

The frontend application is pre-configured for deployment on **GitHub Pages**.

### Method 1: One-Command Deployment via CLI (`gh-pages`)

1. Ensure all your changes in the repository are committed:
   ```bash
   git add .
   git commit -m "feat: updates ready for deployment"
   ```
2. Navigate to the frontend directory:
   ```bash
   cd nexus-ecommerce-platform/frontend
   ```
3. Run the automated deployment script:
   ```bash
   npm run deploy
   ```
   *What this command does behind the scenes:*
   - Automatically executes `npm run build` (`predeploy` hook).
   - Bundles optimized production assets into `frontend/dist/`.
   - Pushes the contents of `dist/` directly to the `origin/gh-pages` branch on GitHub.
4. Your site will be live at:
   ```
   https://ganesh-badar.github.io/nexus-ecommerce-platform/
   ```

---

### Method 2: Enabling GitHub Pages in Repository Settings

If deploying for the first time on a new repository:
1. Go to your GitHub repository: `https://github.com/ganesh-badar/nexus-ecommerce-platform`.
2. Navigate to **Settings** &rarr; **Pages** (under the "Code and automation" section).
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `gh-pages` and folder `/(root)`.
   - Click **Save**.
4. GitHub will assign your deployment URL within 60 seconds.

---

### Method 3: Connecting a Custom Domain to GitHub Pages

To link a custom domain (e.g., `store.yourdomain.com` or `shop.nexus-tech.io`):
1. In your domain registrar (Cloudflare, GoDaddy, Namecheap):
   - **For Apex Domain (`yourdomain.com`)**: Add four `A` records pointing to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - **For Subdomain (`store.yourdomain.com`)**: Add a `CNAME` record:
     ```
     Host: store
     Target: ganesh-badar.github.io
     ```
2. In your GitHub repository:
   - Go to **Settings** &rarr; **Pages** &rarr; **Custom domain**.
   - Enter your domain (e.g., `store.yourdomain.com`) and click **Save**.
   - Check the **Enforce HTTPS** checkbox once DNS resolves.
3. Open the storefront and verify the **Custom Domain & Launch Status** indicator!

---

## 5. Step-by-Step Guide: Deploying the Backend to Cloud (Render / Railway / Docker)

### Deploying via Docker (Render / Railway)

1. **Build Docker Image Locally (Optional test)**:
   ```bash
   cd nexus-ecommerce-platform/backend
   docker build -t nexus-backend .
   docker run -p 8080:8080 nexus-backend
   ```
2. **Deploy on Render / Railway**:
   - Create a free cloud MySQL instance on **Railway** or **Aiven** and copy the database connection URL.
   - Link your GitHub repository (`nexus-ecommerce-platform`).
   - Set the root directory to `backend`.
   - Configure Environment Variables:
     - `PORT`: `8080`
     - `SPRING_DATASOURCE_URL`: `jdbc:mysql://<cloud-host>:3306/<db-name>?useSSL=true`
     - `SPRING_DATASOURCE_USERNAME`: `<db-user>`
     - `SPRING_DATASOURCE_PASSWORD`: `<db-password>`
3. **Connect Frontend to Cloud Backend**:
   - In `frontend/.env.production` (or host environment variables):
     ```properties
     VITE_API_BASE_URL=https://your-backend-service.onrender.com/api
     ```
   - Re-run `npm run deploy` in `frontend/` to publish the updated API connection.
