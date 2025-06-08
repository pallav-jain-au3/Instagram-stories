import React, { useEffect, useState } from 'react';
import Story from '../components/Story/Story';
import { Story as StoryType } from '../components/StoriesBar/StoriesBar';
import Loader from '../components/Loader/Loader';

const STORIES_URL = '/data/stories.json';

const HomePage: React.FC = () => {
  const [stories, setStories] = useState<StoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const response = await fetch(STORIES_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch stories');
        }
        const data = await response.json();
        setStories(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return <Story stories={stories} />;
};

export default HomePage;