// src/components/Buttons/EditButton.tsx
import React from 'react';
import { BaseIcon } from '../Icons/BaseIcon';

type EditButtonProps = {
  onClick?: () => void;
};

export const EditButton: React.FC<EditButtonProps> = ({ onClick }) => (
  <button
    className="text-stone-800 bg-white rounded-full p-3 hover:bg-gray-50"
    type="button"
    onClick={onClick}
    aria-label="Edit"
  >
    <BaseIcon size={24} viewBox="0 0 24 24">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </BaseIcon>
  </button>
);
