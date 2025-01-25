import { create } from "zustand";

export const usesignupStore = create((set) => ({
    newids: [],
    setnewIds: (newids) => set({ newids }),
    createnewIds: async (newid) => {
        // Validate input fields
        if (
            !newid.email ||
            !newid.password ||
            !newid.phonenumber ||
            typeof newid.phonenumber !== "string"
        ) {
            return { success: false, message: "Please fill in all fields correctly." };
        }
        if (newid.phonenumber.toString().length !==10 || newid.phonenumber.toString()[0] === '0') {
            return {success:false , message : "Invalid Number "};
        }
        try {
            const res = await fetch("/sign/up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newid),
            });
            if (res.status === 300) {
                return { success : false , message : "User email already registered !"};
            }
            const result = await res.json();
            set((state) => ({ newids: [...state.newids, result.data] }));
            return { success: true, message: "Details registered successfully!" };
        } catch (error) {
            console.error("Error during registration:", error);
            return { success: false, message: "Failed to register details. Please try again." };
        }
    },
    getiddetails: async (newid) => {
        // Validate input fields
        if (!newid.email || !newid.password) {
            return { success: false, message: "Please fill in all fields." };
        }
        try {
            const queryParams = new URLSearchParams({
                email: newid.email,
                password: newid.password,
            }).toString();

            const res = await fetch(`/sign/in?${queryParams}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch details.");
            }

            const result = await res.json();
            return { success: true, message: "Details displayed.", data: result.data };
        } catch (error) {
            console.error("Error fetching details:", error);
            return { success: false, message: "Failed to fetch details. Please try again." };
        }
    },
}));
