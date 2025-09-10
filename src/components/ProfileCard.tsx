import React from 'react';
import { User } from '../types';

interface ProfileCardProps {
  user: User;
  onLike: () => void;
  onPass: () => void;
  onSuperLike: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, onLike, onPass, onSuperLike }) => {
  return (
    <div className="relative w-full max-w-sm mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
      {/* Main Photo */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={user.photos[0]}
          alt={user.name}
          crossOrigin="anonymous"
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Online Status */}
        {user.isOnline && (
          <div className="absolute top-4 right-4 flex items-center space-x-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse-soft" />
            <span>Online</span>
          </div>
        )}
        
        {/* Verified Badge */}
        {user.verified && (
          <div className="absolute top-4 left-4 bg-primary-500 text-white p-2 rounded-full">
            <i className="bi bi-patch-check-fill text-sm" />
          </div>
        )}
        
        {/* User Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-2xl font-bold font-display">{user.name}</h3>
            <span className="text-xl font-medium">{user.age}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm opacity-90 mb-2">
            <i className="bi bi-geo-alt-fill" />
            <span>{user.location}</span>
            <span>•</span>
            <span>{user.distance}km away</span>
          </div>
        </div>
      </div>
      
      {/* Bio and Interests */}
      <div className="p-6 space-y-4">
        <p className="text-secondary-700 text-sm leading-relaxed">{user.bio}</p>
        
        {/* Interests */}
        <div className="flex flex-wrap gap-2">
          {user.interests.slice(0, 4).map((interest, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-xs font-medium"
            >
              {interest}
            </span>
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 pt-4">
          {/* Pass Button */}
          <button
            onClick={onPass}
            className="w-14 h-14 bg-secondary-100 hover:bg-secondary-200 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <i className="bi bi-x-lg text-secondary-600 text-xl" />
          </button>
          
          {/* Super Like Button */}
          <button
            onClick={onSuperLike}
            className="w-16 h-16 bg-gradient-to-r from-accent-400 to-accent-500 hover:from-accent-500 hover:to-accent-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
          >
            <i className="bi bi-star-fill text-white text-xl animate-bounce-gentle" />
          </button>
          
          {/* Like Button */}
          <button
            onClick={onLike}
            className="w-14 h-14 bg-gradient-to-r from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
          >
            <i className="bi bi-heart-fill text-white text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
