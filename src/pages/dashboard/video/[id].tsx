import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import theme from '../../../styles/theme';
import DownloadIcon from '../../../assets/download.svg';
import DeleteIcon from '../../../assets/trashcan.svg';
import { useRouter } from 'next/router';
import { VideoService } from '../../../services/Video';
import { Video } from '../../../models/Video';
import { useMount } from '../../../hooks';
import { actions } from '../../../store/states/auth';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Header } from '../../../components';
import {
  Container,
  DetailsContent,
  DetailsTitle,
  Section,
  SectionContent,
  SectionTitle,
  VideoContainer,
  VideoDetails,
  VideoTitle,
} from '../../../styles/pages/Video';
import { getVideos } from '../../../store/states/video';
import { UserState } from '../../../models/User';
import { ApplicationState } from '../../../store';

const VideoDetailsPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [video, setVideo] = useState<Video>();
  const { authenticated, user } = useSelector<ApplicationState, UserState>(state => state.auth);

  useMount(() => {
    const token = localStorage.getItem('access_token');
    dispatch(actions.updateUserAuth(token));
  });

  useEffect(() => {
    getVideo();
  }, []);

  const deleteVideo = () => {
    VideoService.deleteVideo(video._id)
      .then(() => {
        router.replace('/dashboard');
        toast.success(`🤙 ${video.name} deleted with success`, {
          autoClose: 3000,
          position: 'top-center',
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      })
      .catch(err => {
        toast.error('😥 Parece que houve um problema!', {
          autoClose: 4000,
          position: 'top-center',
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
        return err;
      });
  };

  const getID = (): string => {
    const urlArray = window.location.href.split('/');
    return urlArray.pop();
  };

  const getVideo = () => {
    VideoService.getVideoByID(getID())
      .then(({ data }) => {
        setVideo(data);
      })
      .catch(err => {
        toast.error('😥 Parece que houve um problema!', {
          autoClose: 4000,
          position: 'top-center',
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
        return err;
      });
  };

  return (
    <>
      <Head>
        <title>Video</title>
      </Head>
      <Header
        options={[
          { title: 'Dashboard', link: '/dashboard' },
          { title: 'My Account', link: '/dashboard/my-account' },
        ]}
      />

      <Container>
        <VideoContainer>
          <video src={!video ? '' : video.url} controls></video>
          <VideoTitle>{!video ? '' : video.name}</VideoTitle>
        </VideoContainer>
        <VideoDetails>
          <DetailsContent>
            <DetailsTitle>Video Details:</DetailsTitle>
            <SectionTitle>Sentence</SectionTitle>
            <Section>
              <SectionContent>{!video ? '' : video.sentence}</SectionContent>
            </Section>
            <SectionTitle>Semantic</SectionTitle>
            <Section>
              <SectionContent>{!video ? '' : video.semantic}</SectionContent>
            </Section>
            <Button isValid>
              <DownloadIcon />
              Download Video
            </Button>
          </DetailsContent>
          <Button color={theme.colors.error} isValid onClick={deleteVideo}>
            <DeleteIcon />
            Delete Video
          </Button>
        </VideoDetails>
      </Container>
    </>
  );
};

export default VideoDetailsPage;
