export const NEXT_PUBLIC_API =
    process.env.NEXT_PUBLIC_API;

export async function registerUser({ email, name, password, role = "individual" }) {
    const res = await fetch(`${NEXT_PUBLIC_API}/api/users/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password, role }),
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Registration failed");
    }
    return await res.json();
}

export async function loginUser({ email, password }) {
    const res = await fetch(`${NEXT_PUBLIC_API}/api/users/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Login failed");
    }
    return await res.json();
}