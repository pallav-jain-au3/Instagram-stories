import React, { useCallback, useState, useEffect } from 'react';
import StoriesBar, { Story as StoryType } from '../StoriesBar/StoriesBar';
import StoryViewer from '../StoryViewer/StoryViewer';
import Loader from '../Loader/Loader';

interface StoryProps {
  stories: StoryType[];
}

const Story: React.FC<StoryProps> = ({ stories }) => {
  const [currentStoryId, setCurrentStoryId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (stories?.length > 0) {
      setLoading(false);
    }
  }, [stories]);

  const openStory = (id: number) => setCurrentStoryId(id);
  const closeStory = () => setCurrentStoryId(null);

  const currentIndex = stories.findIndex((s) => s.id === currentStoryId);
  const currentStory = currentIndex !== -1 ? stories[currentIndex] : null;

  const goPrev = useCallback(() => {
    if (currentIndex > 0) setCurrentStoryId(stories[currentIndex - 1].id);
    else closeStory();
  }, [currentIndex, stories]);

  const goNext = useCallback(() => {
    if (currentIndex < stories.length - 1) setCurrentStoryId(stories[currentIndex + 1].id);
    else closeStory();
  }, [currentIndex, stories]);

  const autoAdvance = useCallback(() => {
    if (currentIndex < stories.length - 1) setCurrentStoryId(stories[currentIndex + 1].id);
    else closeStory();
  }, [currentIndex, stories]);

  return (
    <div className="stories-section">
      {loading && <Loader />}
      {!loading && (
        <>
          <StoriesBar
            stories={stories}
            currentStoryId={currentStoryId}
            onSelect={openStory}
          />
          {currentStoryId !== null && currentStory && (
            <StoryViewer
              story={currentStory}
              onPrev={goPrev}
              onNext={goNext}
              onClose={closeStory}
              autoAdvance={autoAdvance}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Story; 