const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Fallback sample catalog for standalone testing
const FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: "Sony WH-1000XM5 Wireless Headphones",
    description: "Industry-leading noise canceling with two processors and 8 microphones. Up to 30-hour battery life with quick charging.",
    price: 399.99,
    stockQuantity: 25,
    category: "Audio",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "MacBook Pro 16-inch M3 Pro",
    description: "Apple M3 Pro chip with 12-core CPU and 18-core GPU, 36GB Unified Memory, 512GB SSD storage, Liquid Retina XDR display.",
    price: 2499.00,
    stockQuantity: 12,
    category: "Computers",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Apple Watch Ultra 2 Titanium",
    description: "Rugged and capable 49mm titanium case, precision dual-frequency GPS, up to 36 hours of battery life, bright Always-On Retina display.",
    price: 799.00,
    stockQuantity: 18,
    category: "Wearables",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "Sony Alpha 7 IV Full-Frame Camera",
    description: "33MP full-frame Exmor R CMOS sensor, 4K 60p 10-bit 4:2:2 recording, real-time eye AF for human, animal, and bird.",
    price: 2498.00,
    stockQuantity: 8,
    category: "Cameras",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    name: "Keychron Q1 Pro Mechanical Keyboard",
    description: "Wireless custom mechanical keyboard with QMK/VIA support, CNC aluminum body, double-gasket design, and hot-swappable switches.",
    price: 199.99,
    stockQuantity: 30,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 6,
    name: "Logitech MX Master 3S Wireless Mouse",
    description: "Performance wireless mouse with 8K DPI tracking on glass, quiet clicks, and electromagnetic MagSpeed scrolling.",
    price: 99.99,
    stockQuantity: 45,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 7,
    name: "Marshall Stanmore III Bluetooth Speaker",
    description: "Re-engineered for a wider soundstage, iconic vintage rock design, Bluetooth 5.2, and dynamic loudness for room-filling sound.",
    price: 379.99,
    stockQuantity: 15,
    category: "Audio",
    imageUrl: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 8,
    name: "Dell UltraSharp 32-inch 4K UHD Monitor",
    description: "IPS Black technology, 98% DCI-P3 color gamut, USB-C Hub with 90W power delivery, ComfortView Plus low blue light screen.",
    price: 829.99,
    stockQuantity: 10,
    category: "Computers",
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80"
  }
];

let fallbackOrders = [
  {
    id: 101,
    userId: 1,
    userName: "Ganesh Kumar",
    userEmail: "customer@example.com",
    orderDate: new Date(Date.now() - 86400000).toISOString(),
    totalAmount: 399.99,
    status: "PAID",
    shippingAddress: "104 Tech Boulevard, Sector 4, Bangalore",
    items: [
      {
        id: 1,
        productId: 1,
        productName: "Sony WH-1000XM5 Wireless Headphones",
        productImageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
        quantity: 1,
        unitPrice: 399.99,
        subtotal: 399.99
      }
    ]
  }
];

export const checkBackendHealth = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/products?size=1`, { signal: AbortSignal.timeout(1800) });
    return res.ok;
  } catch {
    return false;
  }
};

export const fetchProducts = async (category = '', keyword = '', page = 0, size = 12) => {
  try {
    let url = `${API_BASE_URL}/products?page=${page}&size=${size}`;
    if (category && category !== 'All') url += `&category=${encodeURIComponent(category)}`;
    if (keyword) url += `&keyword=${encodeURIComponent(keyword)}`;

    const res = await fetch(url, { signal: AbortSignal.timeout(2500) });
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const data = await res.json();
    return { data: data.content, totalPages: data.totalPages, isLive: true };
  } catch (err) {
    // In-memory fallback filtering
    let filtered = [...FALLBACK_PRODUCTS];
    if (category && category !== 'All') {
      filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (keyword) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()) || 
                                     p.description.toLowerCase().includes(keyword.toLowerCase()));
    }
    return { data: filtered, totalPages: 1, isLive: false };
  }
};

export const fetchCategories = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/products/categories`, { signal: AbortSignal.timeout(2000) });
    if (!res.ok) throw new Error();
    const categories = await res.json();
    return ['All', ...categories];
  } catch {
    const categories = Array.from(new Set(FALLBACK_PRODUCTS.map(p => p.category)));
    return ['All', ...categories];
  }
};

export const placeOrder = async (orderPayload) => {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload),
      signal: AbortSignal.timeout(3000)
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to place order');
    }
    const created = await res.json();
    return { success: true, order: created, isLive: true };
  } catch (err) {
    // Fallback simulation
    const simulatedTotal = orderPayload.items.reduce((sum, item) => {
      const prod = FALLBACK_PRODUCTS.find(p => p.id === item.productId);
      return sum + (prod ? prod.price * item.quantity : 0);
    }, 0);

    const isPrepaid = orderPayload.paymentMethod !== 'COD';
    const txnId = isPrepaid 
      ? (orderPayload.paymentId || `TXN-${orderPayload.paymentMethod === 'PREPAID_CARD' ? 'CARD' : 'UPI'}-${Math.floor(100000 + Math.random() * 900000)}`)
      : null;

    const simulatedOrder = {
      id: Math.floor(1000 + Math.random() * 9000),
      userId: orderPayload.userId,
      userName: "Ganesh Kumar",
      userEmail: "customer@example.com",
      orderDate: new Date().toISOString(),
      totalAmount: simulatedTotal,
      status: isPrepaid ? "PAID" : "PENDING",
      paymentMethod: orderPayload.paymentMethod || "PREPAID_UPI",
      paymentId: txnId,
      shippingAddress: orderPayload.shippingAddress,
      items: orderPayload.items.map((item, idx) => {
        const prod = FALLBACK_PRODUCTS.find(p => p.id === item.productId);
        return {
          id: idx + 1,
          productId: item.productId,
          productName: prod ? prod.name : "Product",
          productImageUrl: prod ? prod.imageUrl : "",
          quantity: item.quantity,
          unitPrice: prod ? prod.price : 0,
          subtotal: prod ? (prod.price * item.quantity) : 0
        };
      })
    };
    fallbackOrders.unshift(simulatedOrder);
    return { success: true, order: simulatedOrder, isLive: false };
  }
};

export const fetchUserOrders = async (userId = 1) => {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/user/${userId}`, { signal: AbortSignal.timeout(2500) });
    if (!res.ok) throw new Error();
    const data = await res.json();
    return { orders: data, isLive: true };
  } catch {
    return { orders: fallbackOrders, isLive: false };
  }
};

export const cancelOrder = async (orderId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/${orderId}/status?status=CANCELLED`, {
      method: 'PATCH',
      signal: AbortSignal.timeout(2500)
    });
    if (!res.ok) throw new Error();
    const updated = await res.json();
    return { success: true, order: updated, isLive: true };
  } catch {
    fallbackOrders = fallbackOrders.map(o => o.id === orderId ? { ...o, status: "CANCELLED" } : o);
    return { success: true, order: fallbackOrders.find(o => o.id === orderId), isLive: false };
  }
};

// Seller / Shop Owner Operations
export const createProduct = async (productData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
      signal: AbortSignal.timeout(3000)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to create product');
    }
    const created = await res.json();
    return { success: true, product: created, isLive: true };
  } catch (err) {
    const newProduct = {
      id: Math.floor(100 + Math.random() * 900),
      ...productData,
      price: parseFloat(productData.price),
      stockQuantity: parseInt(productData.stockQuantity, 10),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    FALLBACK_PRODUCTS.unshift(newProduct);
    return { success: true, product: newProduct, isLive: false };
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
      signal: AbortSignal.timeout(3000)
    });
    if (!res.ok) throw new Error('Failed to update product');
    const updated = await res.json();
    return { success: true, product: updated, isLive: true };
  } catch {
    const idx = FALLBACK_PRODUCTS.findIndex(p => p.id === id);
    if (idx !== -1) {
      FALLBACK_PRODUCTS[idx] = {
        ...FALLBACK_PRODUCTS[idx],
        ...productData,
        price: parseFloat(productData.price),
        stockQuantity: parseInt(productData.stockQuantity, 10),
        updatedAt: new Date().toISOString()
      };
      return { success: true, product: FALLBACK_PRODUCTS[idx], isLive: false };
    }
    return { success: false, error: 'Product not found' };
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      signal: AbortSignal.timeout(2500)
    });
    if (!res.ok) throw new Error();
    return { success: true, isLive: true };
  } catch {
    const idx = FALLBACK_PRODUCTS.findIndex(p => p.id === id);
    if (idx !== -1) FALLBACK_PRODUCTS.splice(idx, 1);
    return { success: true, isLive: false };
  }
};

export const updateOrderStatusAdmin = async (orderId, newStatus) => {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/${orderId}/status?status=${newStatus}`, {
      method: 'PATCH',
      signal: AbortSignal.timeout(2500)
    });
    if (!res.ok) throw new Error();
    const updated = await res.json();
    return { success: true, order: updated, isLive: true };
  } catch {
    fallbackOrders = fallbackOrders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    return { success: true, order: fallbackOrders.find(o => o.id === orderId), isLive: false };
  }
};

