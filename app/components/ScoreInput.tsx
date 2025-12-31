import { useState } from 'react';
import type { Team } from '../types';

interface ScoreInputProps {
  team: Team;
  onSave: (score: number) => void;
  onUpdateName: (name: string) => void;
  variant?: 'blue' | 'green';
}

export function ScoreInput({ team, onSave, onUpdateName, variant = 'blue' }: ScoreInputProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(team.name);
  const [inputVal, setInputVal] = useState('');
  const [error, setError] = useState('');

  const isGreen = variant === 'green';
  const theme = {
    bg: isGreen ? 'bg-green-50' : 'bg-blue-50',
    border: isGreen ? 'border-green-100' : 'border-blue-100',
    borderFocus: isGreen ? 'border-green-300' : 'border-blue-300',
    ring: isGreen ? 'focus:ring-green-500' : 'focus:ring-blue-500',
    text: isGreen ? 'text-green-900' : 'text-blue-900',
    textLight: isGreen ? 'text-green-400' : 'text-blue-400',
    button: isGreen ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700',
  };

  const handleSaveScore = () => {
    const value = parseInt(inputVal);
    if (isNaN(inputVal as any) || inputVal === '') {
      setError('Wajib angka');
      return;
    }
    if (value < 0) {
      setError('Min 0');
      return;
    }
    setError('');
    onSave(value);
    setInputVal(''); // Clear input after adding
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      onUpdateName(tempName);
      setIsEditingName(false);
    }
  };

  return (
    <div className={`bg-white p-3 rounded-lg shadow border ${theme.border} flex-1 min-w-[200px]`}>
      <div className="mb-2">
        {isEditingName ? (
          <input
            type="text"
            className={`w-full border ${theme.borderFocus} rounded px-2 py-1 text-xs focus:ring-2 ${theme.ring} outline-none`}
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onBlur={handleSaveName}
            onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
            autoFocus
          />
        ) : (
          <div 
            className={`font-bold ${theme.text} text-sm cursor-pointer hover:${theme.bg} p-1 rounded transition-colors flex justify-between items-center`}
            onClick={() => setIsEditingName(true)}
          >
            <span className="truncate">{team.name}</span>
            <span className={`text-[9px] ${theme.textLight} font-normal`}>Edit</span>
          </div>
        )}
      </div>
      
      <div className="flex gap-1">
        <div className="relative flex-1">
          <input
            type="number"
            className={`w-full border ${error ? 'border-red-500' : 'border-gray-200'} rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 ${theme.ring} font-bold`}
            placeholder="+ Poin"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              setError('');
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleSaveScore()}
          />
          {error && <p className="absolute -bottom-4 left-0 text-red-500 text-[9px] font-bold">{error}</p>}
        </div>
        <button
          onClick={handleSaveScore}
          className={`${theme.button} text-white font-bold py-2 px-3 rounded text-sm transition-transform active:scale-95 shadow-sm`}
        >
          Tambah
        </button>
      </div>
    </div>
  );
}
