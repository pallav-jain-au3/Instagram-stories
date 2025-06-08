import React, { memo } from 'react';
import './StoriesBar.css';
import ImageLoader from '../ImageLoader/ImageLoader';

export interface Story {
  id: number;
  username: string;
  image: string;
}

interface StoriesBarProps {
  stories: Story[];
  currentStoryId: number | null;
  onSelect: (id: number) => void;
}

const StoriesBar: React.FC<StoriesBarProps> = memo(({ stories, currentStoryId, onSelect }) => {
  return (
    <div className="flex stories-bar">
      {stories.map((story) => (
        <div
          key={story.id}
          className={`story-thumb${currentStoryId === story.id ? ' active' : ''}`}
          onClick={() => onSelect(story.id)}
        >
          <ImageLoader src={story.image} alt={story.username} width={56} height={56} />
          <span className="username">{story.username}</span>
        </div>
      ))}
    </div>
  );
});

StoriesBar.displayName = 'StoriesBar';

export default StoriesBar; 