import { create } from "zustand";

export const usesigninStore = create((set) => ({
    userDetails: null,
    setUserDetails: (details) => set({ userDetails: details }),
    getUserDetails: async (credentials) => {
        // Validate input fields
        if (!credentials.email || !credentials.password) {
            return { success: false, message: "Please fill in all fields." };
        }

        try {
            // Construct the query string for GET request
            const queryParams = new URLSearchParams({
                email: credentials.email,
                password: credentials.password,
            }).toString();

            // Send a GET request to the server
            const res = await fetch(`/sign/in?${queryParams}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Check response status
            if (!res.ok) {
                throw new Error("Failed to fetch user details.");
            }

            // Parse the JSON response
            const result = await res.json();

            if (result.success) {
                set({ userDetails: result.data });
                return { success: true, data: result.data, message: result.message };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
            return { success: false, message: "Failed to fetch user details. Please try again." };
        }
    },
}));
