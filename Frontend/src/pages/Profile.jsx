import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(!user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setProfile(user);
      setLoading(false);
      return;
    }

    getCurrentUser()
      .then((res) => setProfile(res.data.data))
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return <p className="text-center text-muted py-20">Please login to view your profile.</p>;
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-14">
      <div className="bg-surface/90 border border-white/10 rounded-3xl p-10 shadow-xl">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display text-white">Your Profile</h1>
            <p className="text-sm text-muted mt-1">Manage your account and logout when you are done.</p>
          </div>
          <button
            onClick={async () => {
              await logout();
              navigate('/');
            }}
            className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-dark transition hover:bg-primary/90"
          >
            Logout
          </button>
        </div>

        <div className="space-y-4 text-sm">
          <div className="rounded-3xl bg-dark/80 p-6">
            <p className="text-muted uppercase tracking-widest text-xs mb-2">Name</p>
            <p className="text-white text-lg font-medium">{profile.name}</p>
          </div>
          <div className="rounded-3xl bg-dark/80 p-6">
            <p className="text-muted uppercase tracking-widest text-xs mb-2">Email</p>
            <p className="text-white text-lg font-medium">{profile.email}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
