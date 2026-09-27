"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword, comparePassword, createSessionToken, setSessionCookie, clearSessionCookie } from "@/lib/auth";
import { registerSchema, loginSchema } from "@/lib/validations";

export interface ActionResponse {
  success: boolean;
  error?: string;
}

export async function registerUser(formData: FormData): Promise<ActionResponse> {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = registerSchema.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Invalid input data" };
  }

  const { name, email, password } = parsed.data;

  try {
    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      return { success: false, error: "An account with this email already exists" };
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        passwordHash,
      },
    });

    const token = await createSessionToken({
      userId: user.id,
      email: user.email,
    });

    await setSessionCookie(token);
  } catch (err: unknown) {
    console.error("Register error:", err);
    return { success: false, error: "Failed to create account. Please verify database connection." };
  }

  redirect("/dashboard");
}

export async function loginUser(formData: FormData): Promise<ActionResponse> {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = loginSchema.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Invalid input data" };
  }

  const { email, password } = parsed.data;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return { success: false, error: "Invalid email or password" };
    }

    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      return { success: false, error: "Invalid email or password" };
    }

    const token = await createSessionToken({
      userId: user.id,
      email: user.email,
    });

    await setSessionCookie(token);
  } catch (err: unknown) {
    console.error("Login error:", err);
    return { success: false, error: "Failed to log in. Please verify database connection." };
  }

  redirect("/dashboard");
}

export async function logoutUser() {
  await clearSessionCookie();
  redirect("/login");
}
