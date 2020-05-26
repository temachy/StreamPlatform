import React from 'react'
import MetaData from './components/MetaData'
import Comments from './components/Comments'

const PlayerPage = ({ file, videoMeta, player: Player }) => {
    return (
        <div>
            <Player fileStream={file} meta={videoMeta} />
            <MetaData video={videoMeta} />
            <Comments />
        </div>
    )
}

export default PlayerPage
