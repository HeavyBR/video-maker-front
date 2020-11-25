import React, { useState } from 'react';
import Head from 'next/head';
<<<<<<< HEAD:src/pages/dashboard/index.tsx
import Header from '../../components/Header';
import Empty from '../../assets/empty.svg';
import { useRouter } from 'next/router';
import { useMount, useUpdateEffect } from '../../hooks';
import { getVideos } from '../../store/states/video';
import { CardVideo, CardVideoSkeleton } from '../../components';
import { ApplicationState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { VideoParams, VideoState } from '../../models/Video';
import { Container, EmptyList, ListCards } from '../../styles/pages/Dashboard';
=======
import Header from '../components/Header';
import Empty from '../assets/empty.svg';
import { useAuth, useMount, useUpdateEffect } from '../hooks';
import { getVideos } from '../store/states/video';
import { CardVideo, CardVideoSkeleton } from '../components';
import { ApplicationState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { VideoParams, VideoState } from '../models/Video';
import { Container, EmptyList, ListCards } from '../styles/pages/Dashboard';
import { useRouter } from 'next/router';
>>>>>>> ff474613ef687f7f8af37e1e7f0e719e45941995:src/pages/dashboard.tsx

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const state = useSelector<ApplicationState, VideoState>(state => state.video);
  const [authenticated, user] = useAuth();
  const router = useRouter();
  const status = state.status;
  const videos = state.videos;

  useMount(() => {
    dispatch(getVideos());
  });

  useUpdateEffect(() => {
    if (status === 'LOADING') {
      setLoading(true);
    } else {
      setLoading(false);
    }
    if (!authenticated) router.push('/login');
  }, [status]);

  const onClickCard = () => {
    router.push('/dashboard/video/1');
  };

  return (
<<<<<<< HEAD:src/pages/dashboard/index.tsx
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Header
        options={[
          { title: 'Create Video', link: '/' },
          { title: 'My Account', link: '/' },
        ]}
      />
      <Container>
        <ListCards isEmpty={videos.length < 1}>
          {loading ? (
            <CardVideoSkeleton />
          ) : videos.length > 0 ? (
            videos.map((video: VideoParams, index) => {
              return <CardVideo id={index} key={index} thumbnail={video.image} title={video.title} onClick={onClickCard} />;
            })
          ) : (
            <EmptyList>
              <Empty />
            </EmptyList>
          )}
        </ListCards>
      </Container>
    </>
=======
    authenticated && (
      <>
        <Head>
          <title>Dashboard</title>
        </Head>
        <Header
          options={[
            { title: 'Create Video', link: '/' },
            { title: 'My Account', link: '/' },
          ]}
        />
        <Container>
          <ListCards isEmpty={videos.length < 1}>
            {loading ? (
              <CardVideoSkeleton />
            ) : videos.length > 0 ? (
              videos.map((video: VideoParams, index) => {
                return <CardVideo id={index} key={index} thumbnail={video.image} title={video.title} />;
              })
            ) : (
              <EmptyList>
                <Empty />
              </EmptyList>
            )}
          </ListCards>
        </Container>
      </>
    )
>>>>>>> ff474613ef687f7f8af37e1e7f0e719e45941995:src/pages/dashboard.tsx
  );
};

export default Dashboard;