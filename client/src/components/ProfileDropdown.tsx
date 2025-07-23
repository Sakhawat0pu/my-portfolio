import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaUserCircle } from 'react-icons/fa';

const ProfileDropdown: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {/* Placeholder for user profile picture */}
          <FaUserCircle size={40} className="text-white" />
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52 text-base-content border border-base-300"> {/* Added text-base-content and border */}
        <li>
          <Link to="/admin/my-profile" className="hover:bg-base-300">My Profile</Link>
        </li>
        {user?.result.role === 'admin' && (
          <li><Link to="/admin/register" className="hover:bg-base-300">Register User</Link></li>
        )}
        <li><Link to="/admin/change-password" className="hover:bg-base-300">Change Password</Link></li>
        <li><button onClick={logout} className="hover:bg-base-300">Logout</button></li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;