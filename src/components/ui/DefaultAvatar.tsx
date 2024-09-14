interface DefaultAvatarProps {
    username: string;
    random_id: string;
    size?: number;
  }
  
  export const DefaultAvatar: React.FC<DefaultAvatarProps> = ({ username, random_id, size = 32 }) => {
    const letter = username.charAt(0).toUpperCase();
    
    // Generate a consistent hue based on the random_id
    const hue = random_id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360;
    const color = `hsl(${hue}, 70%, 70%)`;
  
    return (
      <div
        className="rounded-full flex items-center justify-center text-white font-bold border-2 border-white"
        style={{ 
          backgroundColor: color,
          width: `${size}px`,
          height: `${size}px`,
          fontSize: `${size / 2}px`,
        }}
      >
        {letter}
      </div>
    );
  };