import { NextRequest, NextResponse } from "next/server";
import { signToken } from "@/lib/auth";
import { DEMO_USERS } from "@/lib/data-store";

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json();

    // Verify demo password
    const validPassword = password === "demo123456" || password === "password" || password === "demo123";

    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid credentials. Use demo password: demo123456" },
        { status: 401 }
      );
    }

    // Match demo user by email or by selected role
    let user = DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user && role) {
      user = DEMO_USERS.find((u) => u.role === role);
    }

    if (!user) {
      // Default fallback based on email domain or role
      user = {
        id: `usr_${Date.now()}`,
        email: email || "student@demo.com",
        name: email.split("@")[0].toUpperCase(),
        role: role || "STUDENT",
        institution: "National TalentIQ Portal",
      };
    }

    const token = await signToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      institution: user.institution,
      department: user.department,
    });

    const response = NextResponse.json({
      success: true,
      user,
      redirectUrl: getRoleDashboardUrl(user.role),
    });

    // Set HTTP-only auth cookie
    response.cookies.set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function getRoleDashboardUrl(role: string): string {
  switch (role) {
    case "STUDENT":
      return "/student";
    case "INDUSTRY":
      return "/industry";
    case "TPO":
      return "/tpo";
    case "GOVERNMENT":
      return "/government";
    case "FACULTY":
      return "/faculty";
    default:
      return "/student";
  }
}
