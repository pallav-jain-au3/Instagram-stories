import React, { useEffect, useRef, useState, useCallback, useMemo, memo } from 'react';
import { Story } from '../StoriesBar/StoriesBar';
import './StoryViewer.css';
import ImageLoader from '../ImageLoader/ImageLoader';

interface StoryViewerProps {
  story: Story;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
  autoAdvance: () => void;
}

const AUTO_ADVANCE_TIME = 5000;

const StoryViewer: React.FC<StoryViewerProps> = memo(({ story, onPrev, onNext, onClose, autoAdvance }) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      autoAdvance();
    }, AUTO_ADVANCE_TIME);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [story, autoAdvance]);

  const handleTap = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    if (x < width / 2) {
      onPrev();
    } else {
      onNext();
    }
  }, [onPrev, onNext]);

  const handleCloseClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose();
  }, [onClose]);

  const progressStyle = useMemo(() => ({
    width: '100%',
    animation: `progress ${AUTO_ADVANCE_TIME}ms linear`
  }), []);

  return (
    <div className="story-viewer" onClick={handleTap}>
      <button
        className="close-btn"
        onClick={handleCloseClick}
        aria-label="Close"
      >
        ×
      </button>
      <ImageLoader
        className="story-image"
        src={story.image}
        alt={story.username}
        width={"100%"}
        height={"100%"}
      />
      <div className="story-username">{story.username}</div>
      <div className="progress-bar">
        <div
          key={story.id}
          className="progress"
          style={progressStyle}
        />
      </div>
    </div>
  );
});

StoryViewer.displayName = 'StoryViewer';

export default StoryViewer; 