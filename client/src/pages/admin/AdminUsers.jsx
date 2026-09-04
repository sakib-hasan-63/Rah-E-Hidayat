import { useState, useEffect } from 'react';
import {
  Users, Search, Filter, ShieldCheck, UserCheck, Trash2,
  Edit2, X, Check, AlertCircle, RefreshCw
} from 'lucide-react';
import api from '../../services/api';
import Loader from '../../components/common/Loader';
import Modal from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

export default function AdminUsers() {
  const { user: currentAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Modal States
  const [selectedUser, setSelectedUser] = useState(null);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [newRole, setNewRole] = useState('user');

  const { addToast } = useToast();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/admin/users?search=${encodeURIComponent(search)}&role=${roleFilter}`);
      if (res.data?.success) {
        setUsers(res.data.users);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err.message);
      addToast('Failed to load users from server', 'error');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, roleFilter]);

  const handleRoleUpdate = async () => {
    if (!selectedUser) return;
    try {
      const res = await api.put(`/api/admin/users/${selectedUser._id}/role`, { role: newRole });
      if (res.data?.success) {
        addToast(`Role updated to ${newRole}`, 'success');
        setRoleModalOpen(false);
        fetchUsers();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to update role', 'error');
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    try {
      const res = await api.delete(`/api/admin/users/${selectedUser._id}`);
      if (res.data?.success) {
        addToast('User deleted from database', 'success');
        setDeleteModalOpen(false);
        fetchUsers();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to delete user', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-main)]">
            User Management
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
            Search, manage user permissions, and view database accounts.
          </p>
        </div>

        <button
          onClick={fetchUsers}
          className="btn-secondary !py-2 !px-3.5 !text-xs font-bold inline-flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh List
        </button>
      </div>

      {/* Search & Filters Bar */}
      <div className="card-premium p-4 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field !py-2.5 !text-xs sm:!text-sm"
          />
          <Search className="w-4 h-4 text-[var(--text-sub)] absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Role Filter Tabs */}
        <div className="flex rounded-xl bg-[var(--bg-main)] p-1 border border-[var(--border-color)] self-stretch sm:self-auto">
          {['all', 'admin', 'user'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                roleFilter === r
                  ? 'bg-white dark:bg-[#162118] text-[#0F5132] dark:text-[#34D399] shadow-xs'
                  : 'text-[var(--text-muted)]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="card-premium overflow-hidden">
        {loading ? (
          <div className="p-8">
            <Loader variant="spinner" />
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center text-xs sm:text-sm text-[var(--text-muted)]">
            No users matched your search criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--text-sub)] uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 font-bold">User</th>
                  <th className="py-3.5 px-4 font-bold">Contact</th>
                  <th className="py-3.5 px-4 font-bold">Role</th>
                  <th className="py-3.5 px-4 font-bold">Registered</th>
                  <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {users.map((u) => {
                  const isSelf = currentAdmin?.id === u._id || currentAdmin?.email === u.email;
                  return (
                    <tr key={u._id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 font-bold text-[var(--text-main)]">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[var(--primary-light)] text-[var(--primary-main)] flex items-center justify-center font-bold text-xs">
                            {u.name?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          <div>
                            <p className="font-bold text-[var(--text-main)] leading-tight">{u.name}</p>
                            {isSelf && (
                              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                                (You)
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <p className="text-[var(--text-main)] font-medium">{u.email}</p>
                        {u.phone && <p className="text-[11px] text-[var(--text-sub)]">{u.phone}</p>}
                      </td>

                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          u.role === 'admin'
                            ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300'
                            : 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300'
                        }`}>
                          {u.role}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-[var(--text-sub)] text-xs">
                        {new Date(u.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>

                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedUser(u);
                              setNewRole(u.role);
                              setRoleModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-black/5 dark:hover:bg-white/5"
                            title="Edit Role"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              setSelectedUser(u);
                              setDeleteModalOpen(true);
                            }}
                            disabled={isSelf}
                            className="p-1.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 disabled:opacity-30"
                            title={isSelf ? 'Cannot delete your own account' : 'Delete User'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Role Modification Modal */}
      <Modal
        isOpen={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
        title={`Change Role: ${selectedUser?.name}`}
      >
        <div className="space-y-4">
          <p className="text-xs text-[var(--text-muted)]">
            Select a new access role for <strong>{selectedUser?.email}</strong>.
          </p>

          <div className="space-y-2">
            <label className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
              newRole === 'user'
                ? 'border-[#0F5132] bg-[var(--primary-light)] text-[var(--text-main)]'
                : 'border-[var(--border-color)]'
            }`}>
              <input
                type="radio"
                name="role"
                value="user"
                checked={newRole === 'user'}
                onChange={() => setNewRole('user')}
                className="accent-[#0F5132]"
              />
              <div>
                <p className="text-sm font-bold">Standard User</p>
                <p className="text-xs text-[var(--text-muted)]">Can read Quran, save bookmarks, use Tasbeeh</p>
              </div>
            </label>

            <label className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
              newRole === 'admin'
                ? 'border-amber-500 bg-amber-500/10 text-[var(--text-main)]'
                : 'border-[var(--border-color)]'
            }`}>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={newRole === 'admin'}
                onChange={() => setNewRole('admin')}
                className="accent-amber-500"
              />
              <div>
                <p className="text-sm font-bold text-amber-800 dark:text-amber-300">Administrator</p>
                <p className="text-xs text-[var(--text-muted)]">Full access to view analytics and manage users</p>
              </div>
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-[var(--border-color)]">
            <button
              onClick={() => setRoleModalOpen(false)}
              className="btn-secondary !py-2 !px-4 !text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleRoleUpdate}
              className="btn-primary !py-2 !px-4 !text-xs font-bold"
            >
              Save Role
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Account Deletion"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-800 dark:text-red-300">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
            <p>
              Are you sure you want to delete <strong>{selectedUser?.name} ({selectedUser?.email})</strong>? This action cannot be undone and will erase all associated bookmarks and data from MongoDB.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="btn-secondary !py-2 !px-4 !text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteUser}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors"
            >
              Delete User
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
