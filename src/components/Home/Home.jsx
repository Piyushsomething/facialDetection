"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EntriesTable from './EntriesTable';
import YouTubeSlider from './YouTubeSlider';
import UploadForm from './UploadForm';
import useStore from '@/store/store';

const Home = () => {
  const router = useRouter();
  const { accessToken, fetchEntries, setAccessToken } = useStore();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
    } else {
      setAccessToken(token);
      fetchEntries();
    }
  }, [router, setAccessToken, fetchEntries]);

  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <UploadForm />
              </div>
              <div>
                <EntriesTable />
              </div>
              <div>
                <YouTubeSlider />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;