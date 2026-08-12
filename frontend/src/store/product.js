import { create } from "zustand";

// Creating "Global State" for Product List using Zustand

export const useProductStore = create((set) => ({
  products: [],
  pagination: null,
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    // Validate fields properly
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields..." };
    }

    try {
      const res = await fetch("/api/createProducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: data.message || "Failed to create product",
        };
      }

      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      return { success: false, message: "Server connection failed: " + error };
    }
  },
  fetchProducts: async (page = 1,search ="") => {
    try {
      const res = await fetch(`/api/products?page=${page}&limit=6&search=${search}`);
      const data = await res.json();
      console.log("Fetched API Data:", data);

      if (res.ok) {
        set({ products: data.data,
          pagination: data.pagination
         });
      } else {
        console.error("Failed to fetch products:", data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/deleteProduct/${pid}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: "Product Deletion Failed" };
    }

    set((state) => ({ products: state.products.filter((p) => p._id !== pid) }));
    return {
      success: true,
      message: data.message || "Product Deletion Success",
    };
  },
  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/updateProduct/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    const data = await res.json();
    console.log(data);                    

    if (!res.ok) {
      return { success: false, message: "Product Update Failed" };
    }

    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product,
      ),
    }));

    return { success: true, message: data.message || "Product Update Successfully" };
  },
}));

// Local State
// const [state, setState] = useState({})
