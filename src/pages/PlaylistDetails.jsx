import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { HeaderPlaylist } from '../components/PlaylistDetails/HeaderPlaylist'
import { PlaylistTracks } from '../components/PlaylistDetails/PlaylistTracks'
import getPlaylistById from '../api/getPlaylistById'

const PlaylistDetails = () => {
    const { id } = useParams()
    const [playlist, setPlaylist] = useState([])
    const [tracks, setTracks] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const playlist = await getPlaylistById(id)
            setTracks(playlist.tracks)
            setPlaylist(playlist)
        }

        fetchData()

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    return (
        <main className='w-full min-h-screen flex flex-col items-center'>
            <HeaderPlaylist playlist={playlist} />
            <PlaylistTracks tracks={tracks} />
        </main>
    )
}

export default PlaylistDetails
