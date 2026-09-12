import { supabase, isSupabaseConfigured } from "./client";
import {
  DEMO_USERS,
  PRIMARY_STUDENT_PROFILE,
  OPPORTUNITIES,
  INITIAL_APPLICATIONS,
} from "@/lib/data-store";

/**
 * Unified Database Service with Supabase PostgreSQL Support + Resilient Mock Fallback
 */
export async function getPlatformUsers() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from("users").select("*");
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn("Supabase fetch error, falling back to local store:", e);
    }
  }
  return DEMO_USERS;
}

export async function getStudentTwinByUserId(userId: string) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("student_twins")
        .select("*")
        .eq("user_id", userId)
        .single();
      if (!error && data) return data;
    } catch (e) {
      console.warn("Supabase student twin fetch error:", e);
    }
  }
  return PRIMARY_STUDENT_PROFILE;
}

export async function getJobs() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from("jobs").select("*");
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn("Supabase jobs fetch error:", e);
    }
  }
  return OPPORTUNITIES;
}

export async function getApplications() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from("applications").select("*");
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn("Supabase applications fetch error:", e);
    }
  }
  return INITIAL_APPLICATIONS;
}
