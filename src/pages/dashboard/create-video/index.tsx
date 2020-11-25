import React from 'react';
import Head from 'next/head';
import Header from '../../../components/Header';
import theme from '../../../styles/theme';
import { Button, DragAndDrop } from '../../../components';
import { Container, DetailsContent, DetailsTitle, Section, SectionContent, SectionTitle, VideoDetails } from '../../../styles/pages/Video';
import { useMount } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { actions } from '../../../store/states/auth';

const CreateVideo: React.FC = () => {

  const dispatch = useDispatch();

  useMount(() => {
    const token = localStorage.getItem('access_token');
    dispatch(actions.updateUserAuth(token));
  });

  return (
    <>
      <Head>
        <title>Video</title>
      </Head>
      <Header
        options={[
          { title: 'Dashboard', link: '/dashboard' },
          { title: 'My Account', link: '/dashboard' },
        ]}
      />

      <Container>
        <VideoDetails>
          <DetailsContent>
            <DetailsTitle>Video Details:</DetailsTitle>
            <SectionTitle>Sentence</SectionTitle>
            <Section>
              <SectionContent>Lorem ipsum dolor sit amet, consectetur adipiscing</SectionContent>
            </Section>
            <SectionTitle>Semantic</SectionTitle>
            <Section>
              <SectionContent>The history of</SectionContent>
            </Section>
            <Button isValid>Download Video</Button>
          </DetailsContent>
          <Button color={theme.colors.error} isValid>
            Delete Video
          </Button>
        </VideoDetails>
        <DragAndDrop></DragAndDrop>
      </Container>
    </>
  );
};

export default CreateVideo;
