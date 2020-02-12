import React, {} from 'react'
import Lottie from 'react-lottie'
import animationData from '../photoloading.json'

interface IProps {
  isStopped: boolean
}

const Loading: React.FC<IProps> = ({isStopped}) => {
  return (
    <div className="loading">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: animationData,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
        height={400}
        width={400}
    />
    </div>
  )
};

export default Loading;
