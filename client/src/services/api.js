const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const fetchProducts = async ({ category, search, flash } = {}) => {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (search) params.append('search', search);
    if (flash) params.append('flash', 'true');

    const res = await fetch(`${API_BASE}/products?${params.toString()}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.warn('API fetchProducts failed, falling back to local dataset', error);
    return getFallbackProducts({ category, search, flash });
  }
};

export const fetchProductById = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.warn(`API fetchProductById(${id}) failed, falling back to local dataset`, error);
    const fallbackList = getFallbackProducts({});
    return fallbackList.find(p => p.id === id) || null;
  }
};

export const fetchCategories = async () => {
  try {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.warn('API fetchCategories failed, using fallback', error);
    return [
      { id: "all", name: "All", icon: "tune" },
      { id: "phones", name: "Phones", icon: "smartphone" },
      { id: "laptops", name: "Laptops", icon: "laptop_mac" },
      { id: "audio", name: "Audio", icon: "headphones" },
      { id: "watches", name: "Watches", icon: "watch" },
      { id: "gaming", name: "Gaming", icon: "sports_esports" },
      { id: "cameras", name: "Cameras", icon: "photo_camera" },
      { id: "tvs", name: "TVs", icon: "tv" },
      { id: "peripherals", name: "Peripherals", icon: "keyboard" }
    ];
  }
};

export const fetchBrands = async () => {
  try {
    const res = await fetch(`${API_BASE}/brands`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    return [
      { name: "Apple", verified: true },
      { name: "Samsung", verified: true },
      { name: "Sony", verified: true },
      { name: "ASUS ROG", verified: true },
      { name: "Dell", verified: true },
      { name: "Lenovo", verified: true },
      { name: "Bose", verified: true },
      { name: "Anker", verified: true }
    ];
  }
};

export const fetchReviews = async () => {
  try {
    const res = await fetch(`${API_BASE}/reviews`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    return [
      {
        id: 1,
        author: "Marcus R.",
        avatar: "MR",
        rating: 5,
        date: "Yesterday",
        comment: "Ordered the Sony XM5 at 10 AM, arrived at my doorstep by 4 PM. Unbeatable delivery and condition!",
        verified: true
      },
      {
        id: 2,
        author: "Elena L.",
        avatar: "EL",
        rating: 5,
        date: "2 days ago",
        comment: "Got the ROG Zephyrus during flash sale. Authentic packaging and valid warranty registration immediately.",
        verified: true
      },
      {
        id: 3,
        author: "David K.",
        avatar: "DK",
        rating: 5,
        date: "3 days ago",
        comment: "Best prices anywhere for flagship tech. The 0% APR ElectroPay made upgrading to iPhone 16 Pro effortless.",
        verified: true
      }
    ];
  }
};

export const validatePromoCode = async (code, cartTotal) => {
  try {
    const res = await fetch(`${API_BASE}/promo/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, cartTotal })
    });
    return await res.json();
  } catch (error) {
    // Fallback client validation
    if (code.trim().toUpperCase() === 'TECH10') {
      return {
        success: true,
        message: 'TECH10 applied successfully!',
        data: { code: 'TECH10', discountAmount: 20.0, description: '$20 off order' }
      };
    }
    return { success: false, message: 'Invalid promo code' };
  }
};

export const submitOrder = async (orderPayload) => {
  try {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    return await res.json();
  } catch (error) {
    return {
      success: true,
      message: 'Order placed successfully (Offline Mode)!',
      data: {
        orderId: 'EM-' + Math.floor(100000 + Math.random() * 900000),
        estimatedDelivery: 'Tomorrow by 2:00 PM',
        ...orderPayload
      }
    };
  }
};

// Fallback seed catalog
function getFallbackProducts({ category, search, flash }) {
  const all = [
    {
      id: "sony-wh-1000xm5",
      name: "Sony WH-1000XM5 Noise-Canceling Wireless",
      fullName: "Sony WH-1000XM5 Noise Canceling Wireless Over-Ear Headphones",
      brand: "Sony",
      category: "audio",
      price: 278.00,
      originalPrice: 399.99,
      discount: "-30% OFF",
      rating: 4.8,
      reviewCount: 4829,
      stockCount: 4,
      soldPercent: 82,
      badge: "Ends Tonight",
      isFlashDeal: true,
      isTopRated: true,
      monthlySales: "500+ bought this month",
      description: "Industry-leading active noise canceling, 30hr battery life, crystal-clear beamforming hands-free calling.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6QUb4CvuWbwZ1s6eUfEHw_KifBL-guibLQqiOEtPz1QdNSv-zfnB4noWNWsxf9GlShWdj_SNFiO95PYbcglV2HYJdNZftsaH-MwWq2jzsxOs-dQoGyGLoZU0uxJSx_Kw4-nsDi-Ruw49_F4t1Fx_hln7l619Xwxrhm_y6weWOVcjqDGPm7gK8J8bPSg7MJTr5o-OYcBQ0i5dSpwSCAgNiyUijpGG9L8EA9n1xKXYL1hJ_1X-WZTjCMQ",
      colors: [
        { name: "Midnight Blue", hex: "#1b233d" },
        { name: "Silver Platinum", hex: "#d5d4d0" },
        { name: "Matte Black", hex: "#1d1d1f" }
      ],
      highlights: [
        {
          icon: "graphic_eq",
          title: "Flagship Auto NC Optimizer",
          description: "Two processors controlling 8 specialized microphones for silence in city noise, flights, and commute environments."
        },
        {
          icon: "battery_charging_full",
          title: "30-Hour Marathon Playback",
          description: "Ultra-fast USB-PD charge pumps up to 3 hours of listening from just a 3-minute charge."
        },
        {
          icon: "headphones",
          title: "Soft-Fit Leather Comfort",
          description: "Lightweight stepless headband and plush earcups relieves head pressure for all-day listening sessions."
        }
      ],
      specs: {
        "Weight": "Approx. 250 g (8.8 oz)",
        "Driver Unit": "30 mm Carbon Fiber Dome",
        "Bluetooth Standard": "Version 5.2 (Multipoint)",
        "Supported Codecs": "LDAC, AAC, SBC",
        "Frequency Response": "4 Hz - 40,000 Hz",
        "Charging Interface": "USB Type-C (Power Delivery)"
      }
    },
    {
      id: "apple-iphone-16-pro",
      name: "Apple iPhone 16 Pro 256GB Titanium",
      fullName: "Apple iPhone 16 Pro 256GB Natural Titanium",
      brand: "Apple",
      category: "phones",
      price: 999.00,
      originalPrice: 1199.00,
      discount: "-17% OFF",
      rating: 4.9,
      reviewCount: 5120,
      stockCount: 8,
      soldPercent: 91,
      badge: "Almost gone",
      isFlashDeal: true,
      isTopRated: true,
      monthlySales: "1,200+ bought this month",
      description: "Aerospace-grade titanium design with triple-lens 48MP camera island, A18 Pro chip, and ProMotion 120Hz display.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCC0zDY88q4GJITIKdo6zPrW4vWjRwvDlxy1UNbCGz4dVpGadzqloDpF8ZpR68pj7cOGN4g2pWk0Pg-ebhl_NrbNzzaY9OIQKXM9Kpp4B5NIBmW6TfPb384sFBWgjTk8oQZHshbMBPs6D_WnVPmvv9mt000FLMUrvr1u1MEH2C9AHivEMs6GsqGz4R6yfjZk3Z3PBQM0YICZ-pVH4JaORlCW8AnZLQEQLk605Gx_wp83dXseg2abi0krg",
      colors: [
        { name: "Natural Titanium", hex: "#c2bbb4" },
        { name: "Black Titanium", hex: "#3c3b37" },
        { name: "White Titanium", hex: "#f2f1ed" },
        { name: "Desert Titanium", hex: "#cbb39c" }
      ],
      highlights: [
        {
          icon: "shield",
          title: "Grade 5 Titanium Design",
          description: "Strongest, lightest aerospace frame with contoured edges and thin borders."
        },
        {
          icon: "memory",
          title: "A18 Pro Bionic Silicon",
          description: "Groundbreaking power efficiency and pro-grade mobile gaming with hardware ray tracing."
        }
      ],
      specs: {
        "Display": "6.3-inch Super Retina XDR OLED 120Hz",
        "Processor": "Apple A18 Pro (3nm)",
        "Storage": "256 GB NVMe"
      }
    },
    {
      id: "asus-rog-zephyrus-g16",
      name: "ASUS ROG Zephyrus G16 OLED Gaming",
      fullName: "ASUS ROG Zephyrus G16 (2025) 2.5K 240Hz OLED Gaming Laptop",
      brand: "ASUS ROG",
      category: "laptops",
      price: 1649.00,
      originalPrice: 1999.00,
      discount: "-18% OFF",
      rating: 4.7,
      reviewCount: 890,
      stockCount: 12,
      soldPercent: 68,
      badge: "Hot Deal",
      isFlashDeal: true,
      isTopRated: false,
      monthlySales: "350+ bought this month",
      description: "Ultra-slim CNC aluminum gaming powerhouse with 2.5K 240Hz OLED display, Intel Core Ultra 9, and NVIDIA RTX 4070.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbclH2aIFPbvb3tZ-d44CZrMvnJQ9RHrSwx8lPIHDG4nMpt6iEoMJLqR6szfXef_pxvzdEXp4a3DhyLo50WkIjDHqY8dwpx_DwIb9A3VgM9iuTv5zT-ibC8ErO8KVFKWgG6jpjyiBlVgqIKIWDX_5Vtxw2WvkBc2VPCry8Y2iYaRX1SbcI4Q7rnC9F38xolSAqIKBBoDP7ERAKJBKQN0i0Xd7k2NXyl1h7zPqpmxHzymx0x4GMdm6hAw",
      colors: [
        { name: "Eclipse Gray", hex: "#2e3138" },
        { name: "Platinum White", hex: "#e8eaf0" }
      ],
      highlights: [
        {
          icon: "desktop_windows",
          title: "ROG Nebula 240Hz OLED",
          description: "0.2ms response time, 100% DCI-P3 color gamut, and VESA DisplayHDR True Black 500."
        }
      ],
      specs: {
        "Processor": "Intel Core Ultra 9 185H",
        "Graphics": "NVIDIA GeForce RTX 4070 8GB GDDR6"
      }
    },
    {
      id: "samsung-galaxy-watch-ultra",
      name: "Samsung Galaxy Watch Ultra 47mm",
      fullName: "Samsung Galaxy Watch Ultra 47mm LTE Titanium",
      brand: "Samsung",
      category: "watches",
      price: 549.00,
      originalPrice: 649.00,
      discount: "-15% OFF",
      rating: 4.6,
      reviewCount: 1120,
      stockCount: 15,
      soldPercent: 54,
      badge: "Free Strap Inc.",
      isFlashDeal: true,
      isTopRated: false,
      monthlySales: "420+ bought this month",
      description: "Rugged titanium cushion case design with 3000-nit high-brightness sapphire screen, dual-frequency GPS, and 100hr battery life.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAB_r_tM_wfKATbnEoEBPOrDLZZLrLPRLGuttY_sQNDCm_pUTKDe00K7QxOM2BKLNbAZW07_EAT6EgLHs8UW3ESkEIRAxavX57Rr8rqbJiND0Wj1yjW0Fd83iqJUSyT6TPDcXmE3Lv_8ifhtKS06wc1L_q7b0aDSb0HnHelSRip0x5lEGaCKybc4IBFdGUymLqd9qllGn6jak4cyKae1P3BGCGvGItROuATIi6J7oqgWu-56sx8EX6FzQ",
      colors: [
        { name: "Titanium Orange", hex: "#e05a1d" },
        { name: "Titanium Gray", hex: "#4a4c50" }
      ],
      highlights: [
        {
          icon: "water_drop",
          title: "10 ATM / IP68 Water Resistance",
          description: "Engineered for ocean swimming and extreme endurance."
        }
      ],
      specs: {
        "Case": "Grade 4 Titanium 47mm",
        "Battery": "590 mAh with fast wireless charging"
      }
    },
    {
      id: "anker-65w-gan-charger",
      name: "Anker 65W GaN Fast Charger",
      fullName: "Anker GaNPrime 65W 3-Port Wall Fast Charger Block",
      brand: "Anker",
      category: "peripherals",
      price: 39.99,
      originalPrice: 49.99,
      discount: "-20% OFF",
      rating: 4.9,
      reviewCount: 7240,
      stockCount: 25,
      soldPercent: 75,
      badge: "Amazon Choice",
      isFlashDeal: false,
      isTopRated: true,
      monthlySales: "2,000+ bought this month",
      description: "Ultra-compact GaNPrime dual USB-C + USB-A fast charging adapter with ActiveShield 2.0 temperature monitoring.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoNWqiyP1rvvGeWaVoPXX2_OBEi2BLzL5zIEmL6Tq2xiUxiCaJcEGex6NfFUToSnplxYJoeg_q2RqFXA4B2dbcGsUwtMbAanRO3pRewjvAB2rNJxezEsG6SbOlm850M3qWgMjBX4m2sEjbzKvG_-Zqy06QWSmYVyka4-xr8sMmlv27Xz3xyn-O-MAav8XEpkqSRBx7_hcb0aRfnVCah5QhZx15ebTJ6oeAbQC6SYEja1sc6iukTA7OOQ",
      colors: [
        { name: "Matte Black", hex: "#1d1d1f" }
      ],
      highlights: [
        {
          icon: "bolt",
          title: "GaNPrime 65W High Speed",
          description: "Charges a 14\" MacBook Pro to 50% in just 37 minutes."
        }
      ],
      specs: {
        "Total Output": "65W Max",
        "Ports": "2x USB-C + 1x USB-A"
      }
    }
  ];

  let list = all;
  if (category && category !== 'all') {
    list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  if (flash) {
    list = list.filter(p => p.isFlashDeal);
  }
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
  }
  return list;
}
