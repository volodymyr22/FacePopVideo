import { useState, useRef } from "react";
import { BiMinus } from "react-icons/bi";
import {MdVolumeOff,MdVolumeUp, MdPlayArrow, MdPause } from "react-icons/md";
import styles from './VideoFacepop.module.scss'
function VideoFacepop() {
  const player = useRef();
  const [videoOptions, setVideoOptions] = useState({
    isActive:false,
    isMuted:true,
    isPlaying:true,
  })
  const openVideo = () => {
    setVideoOptions({
      ...videoOptions,
      isActive:true,
      isMuted:false,
    })
    player.current.load();
  };
  const closeVideo = (event) => {
    event.stopPropagation()
    setVideoOptions({
      ...videoOptions,
      isActive:false,
      isMuted:true,
    })
    player.current.load();
  };
  const playVideo = () => {
    setVideoOptions({
      ...videoOptions,
      isPlaying:true
    })
      player.current.play();
  };
  const stopVideo = () => {
    setVideoOptions({
      ...videoOptions,
      isPlaying:false
    })
    player.current.pause();
  };
  const muteVideo = (event) =>{
    event.stopPropagation()
    videoOptions.isMuted?setVideoOptions({
      ...videoOptions,
      isMuted:false,
    }):setVideoOptions({
      ...videoOptions,
      isMuted:true,
    })
  }
  return (
      <section
        onClick={videoOptions.isActive ? videoOptions.isPlaying?stopVideo:playVideo:openVideo}
        className={videoOptions.isActive ? styles.activeVideo : styles.disabledVideo}
      >
        <video
          className={styles.video}
          loop
          autoPlay={true}
          muted={videoOptions.isMuted}
          ref={player}
          controls={false}
        >
          <source src="/video.mp4" type="video/webm" />
        </video>
        {videoOptions.isActive && videoOptions.isPlaying && (
          <MdPause size={29} className={styles.playBtn} onClick={stopVideo} />
        )}
        {videoOptions.isActive && !videoOptions.isPlaying && (
          <MdPlayArrow size={29} className={styles.playBtn} onClick={playVideo} />
        )}
        {videoOptions.isActive && (
          <div>
            <div className={styles.facepopAbout}>
              <h1>This is FacePop!</h1>
              <p>
                A widget you can use to upload videos and get personal with your
                customers to schedule meetings, ask for reviews, or share the
                latest features with its CTA functionality
              </p>
            </div>
            <button className={styles.linkBtn}>Try for free {' >'}</button>
          </div>
        )}
        {videoOptions.isActive && (
          <BiMinus
            size={28}
            className={styles.closeBtn}
            onClick={(event)=>closeVideo(event)}
          />
        )}
        {!videoOptions.isActive && (
          <MdPlayArrow
            size={29}
            className={styles.openBtn}
            onClick={openVideo}
          />
        )}
        {videoOptions.isActive && videoOptions.isMuted && (
          <MdVolumeOff
            size={28}
            className={styles.muteBtn}
            onClick={(event) => muteVideo(event)}
          />
        )}
        {videoOptions.isActive && !videoOptions.isMuted && (
          <MdVolumeUp
            size={28}
            className={styles.muteBtn}
            onClick={(event) => muteVideo(event)}
          />
        )}
      </section>
  );
}

export default VideoFacepop;
