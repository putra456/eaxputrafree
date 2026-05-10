"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Shield,
  Users,
  Plus,
  Trash2,
  Check,
  X,
  Crown,
  User,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface UserItem {
  username: string;
  password: string;
  role: string;
  premium: boolean;
}

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("buyer");
  const [newPremium, setNewPremium] = useState(false);
  const [adding, setAdding] = useState(false);
  const router = useRouter();

  const currentUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("xau_user") || "{}")
      : {};

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("xau_user");
    if (!stored) {
      router.push("/");
      return;
    }
    try {
      const u = JSON.parse(stored);
      if (u.role !== "admin") {
        router.push("/dashboard/profile");
        return;
      }
    } catch {
      router.push("/");
    }
    fetchUsers();
  }, [router]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.users) setUsers(data.users);
    } catch {
      setError("Failed to load users");
    }
    setLoading(false);
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setAdding(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: newUsername,
          password: newPassword,
          role: newRole,
          premium: newPremium,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to add user");
        setAdding(false);
        return;
      }
      setNewUsername("");
      setNewPassword("");
      setNewRole("buyer");
      setNewPremium(false);
      setShowAdd(false);
      fetchUsers();
    } catch {
      setError("Connection error");
    }
    setAdding(false);
  };

  const handleDelete = async (username: string) => {
    if (!confirm(`Delete user "${username}"?`)) return;
    try {
      const res = await fetch(`/api/admin/users?username=${username}`, {
        method: "DELETE",
      });
      if (res.ok) fetchUsers();
    } catch {
      setError("Failed to delete user");
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Header */}
      <div
        className="animate-slide-up"
        style={{ animationDelay: "0.05s", opacity: 0 }}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => router.push("/dashboard/profile")}
              className="liquid-btn p-2"
            >
              <ArrowLeft size={16} />
            </button>
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(255,193,7,0.1)",
                border: "1px solid rgba(255,193,7,0.15)",
              }}
            >
              <Shield size={15} className="text-amber-400/70" />
            </div>
            <div>
              <h1
                className="font-bold text-white leading-tight"
                style={{ fontSize: "clamp(17px, 4.5vw, 22px)" }}
              >
                Admin Panel
              </h1>
              <p className="text-white/25 text-[10px]">User Management</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div
        className="animate-slide-up grid grid-cols-3 gap-2.5 mb-4"
        style={{ animationDelay: "0.1s", opacity: 0 }}
      >
        <div className="liquid-glass p-3 text-center">
          <div className="relative z-10">
            <Users size={14} className="text-white/30 mx-auto mb-1" />
            <span className="text-white font-bold text-lg block">
              {users.length}
            </span>
            <span className="text-white/25 text-[10px]">Total Users</span>
          </div>
        </div>
        <div className="liquid-glass p-3 text-center">
          <div className="relative z-10">
            <Crown size={14} className="text-amber-400/50 mx-auto mb-1" />
            <span className="text-white font-bold text-lg block">
              {users.filter((u) => u.premium).length}
            </span>
            <span className="text-white/25 text-[10px]">Premium</span>
          </div>
        </div>
        <div className="liquid-glass p-3 text-center">
          <div className="relative z-10">
            <Shield size={14} className="text-emerald-400/50 mx-auto mb-1" />
            <span className="text-white font-bold text-lg block">
              {users.filter((u) => u.role === "admin").length}
            </span>
            <span className="text-white/25 text-[10px]">Admins</span>
          </div>
        </div>
      </div>

      {/* Add User Toggle */}
      <div
        className="animate-slide-up mb-3"
        style={{ animationDelay: "0.15s", opacity: 0 }}
      >
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="liquid-btn w-full py-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
          style={{
            background: showAdd
              ? "linear-gradient(135deg, rgba(255,59,48,0.15), rgba(255,59,48,0.04))"
              : "linear-gradient(135deg, rgba(52,199,89,0.18), rgba(52,199,89,0.05))",
            borderColor: showAdd
              ? "rgba(255,59,48,0.2)"
              : "rgba(52,199,89,0.2)",
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            {showAdd ? <X size={15} /> : <Plus size={15} />}
            {showAdd ? "Cancel" : "Add New User"}
          </span>
        </button>
      </div>

      {/* Add User Form */}
      {showAdd && (
        <div
          className="animate-slide-up mb-4"
          style={{ animationDelay: "0.05s", opacity: 0 }}
        >
          <div className="liquid-glass p-4 sm:p-5">
            <div className="relative z-10">
              <h3 className="text-white/70 text-sm font-semibold mb-3">
                Create User
              </h3>
              <form onSubmit={handleAddUser} className="space-y-3">
                <div>
                  <label className="block text-white/35 text-[10px] font-semibold mb-1 uppercase tracking-wider">
                    Username
                  </label>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="Enter username"
                    className="liquid-input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/35 text-[10px] font-semibold mb-1 uppercase tracking-wider">
                    Password
                  </label>
                  <input
                    type="text"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter password"
                    className="liquid-input"
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-white/35 text-[10px] font-semibold mb-1 uppercase tracking-wider">
                      Role
                    </label>
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="liquid-input"
                      style={{ appearance: "auto" }}
                    >
                      <option value="buyer">Buyer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-white/35 text-[10px] font-semibold mb-1 uppercase tracking-wider">
                      Premium
                    </label>
                    <button
                      type="button"
                      onClick={() => setNewPremium(!newPremium)}
                      className="liquid-btn w-full py-3 text-xs font-semibold flex items-center justify-center gap-2"
                      style={{
                        background: newPremium
                          ? "linear-gradient(135deg, rgba(255,193,7,0.2), rgba(255,193,7,0.06))"
                          : "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                        borderColor: newPremium
                          ? "rgba(255,193,7,0.25)"
                          : "rgba(255,255,255,0.1)",
                      }}
                    >
                      <span className="relative z-10 flex items-center gap-1.5">
                        {newPremium ? (
                          <>
                            <Crown size={13} className="text-amber-400" />
                            Premium
                          </>
                        ) : (
                          <>
                            <User size={13} />
                            Regular
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </div>
                {error && (
                  <div
                    className="flex items-center gap-2 py-2 px-3 rounded-xl text-xs"
                    style={{
                      background: "rgba(255,59,48,0.1)",
                      border: "1px solid rgba(255,59,48,0.2)",
                      color: "#ff6b6b",
                    }}
                  >
                    <AlertCircle size={13} />
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={adding}
                  className="liquid-btn w-full py-3.5 text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {adding ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus size={15} />
                        Create User
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* User List */}
      <div className="space-y-2.5">
        {loading ? (
          <div className="text-center py-8">
            <Loader2 size={24} className="text-white/20 animate-spin mx-auto" />
          </div>
        ) : (
          users.map((u, idx) => (
            <div
              key={u.username}
              className="animate-slide-up"
              style={{ animationDelay: `${0.1 + idx * 0.04}s`, opacity: 0 }}
            >
              <div className="liquid-glass p-4">
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: u.premium
                            ? "rgba(255,193,7,0.08)"
                            : "rgba(255,255,255,0.05)",
                          border: `1px solid ${
                            u.premium
                              ? "rgba(255,193,7,0.12)"
                              : "rgba(255,255,255,0.06)"
                          }`,
                        }}
                      >
                        {u.premium ? (
                          <Crown
                            size={15}
                            className="text-amber-400/60"
                          />
                        ) : (
                          <User size={15} className="text-white/30" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white/80 text-xs font-semibold">
                            {u.username}
                          </span>
                          {u.premium && (
                            <span
                              className="text-[8px] font-bold px-1 py-0.5 rounded"
                              style={{
                                background: "rgba(255,193,7,0.15)",
                                color: "#ffc107",
                              }}
                            >
                              PREMIUM
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {u.role === "admin" ? (
                            <Shield size={10} className="text-emerald-400/60" />
                          ) : (
                            <User size={10} className="text-white/20" />
                          )}
                          <span className="text-white/25 text-[10px] capitalize">
                            {u.role}
                          </span>
                          <span className="text-white/10 text-[10px]">•</span>
                          <span className="text-white/20 text-[10px]">
                            {u.password}
                          </span>
                        </div>
                      </div>
                    </div>
                    {u.username !== currentUser.username && (
                      <button
                        onClick={() => handleDelete(u.username)}
                        className="p-2 rounded-xl hover:bg-red-500/10 transition-colors text-white/20 hover:text-red-400"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="text-center py-5 mt-2">
        <p className="text-white/12 text-[10px] tracking-wider">
          © 2024 Xau×Putra • Admin Panel
        </p>
      </div>
    </>
  );
}
