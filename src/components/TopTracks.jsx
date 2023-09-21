import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, Button, Select, SelectItem, CircularProgress } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faTableCellsLarge } from '@fortawesome/free-solid-svg-icons'
import { TrackCard } from './TrackCard'
import { TrackList } from './TrackList'
import { ranges, limits } from '../constants/lists'
import getTopTracks from '../api/getTopTracks'

export function TopTracks() {
    const [topTracks, setTopTracks] = useState([])
    const [selectedRange, setSelectedRange] = useState()
    const [selectedLimit, setSelectedLimit] = useState()
    const [modeList, setModeList] = useState(false)

    useEffect(() => {
        fetchTopTracks()
    }, [])

    async function fetchTopTracks(selectedRange, selectedLimit) {
        try {
            const response = await getTopTracks(selectedRange, selectedLimit)
            setTopTracks(response)
        } catch (error) {
            console.error('Error fetching top tracks:', error)
        }
    }

    const playPreview = (previewUrl) => {
        if (previewUrl === null) return
        const audio = new Audio(previewUrl)
        audio.play()
    }

    const toggleModeList = () => {
        setModeList(!modeList)
    }

    return (
        <Card className='shadow-none p-4'>
            <CardHeader className='flex flex-col sm:flex-row justify-between gap-3'>
                <h3 className='w-full text-2xl sm:text-4xl font-bold'>
                    Top <span className='text-guppie-green'>Songs</span>
                </h3>
                <div className='w-full flex flex-row justify-end items-center gap-3'>
                    <Button
                        isIconOnly
                        onClick={() => toggleModeList()}
                        variant='light'
                        showAnchorIcon
                    >
                        {modeList ? (
                            <FontAwesomeIcon icon={faList} />
                        ) : (
                            <FontAwesomeIcon icon={faTableCellsLarge} />
                        )}
                    </Button>
                    <Select
                        labelPlacement={'inside'}
                        label='Limit'
                        className='max-w-[100px]'
                        defaultSelectedKeys={[limits[0].value]}
                        disallowEmptySelection={true}
                        onChange={(e) => {
                            const selected = e.target.value
                            setSelectedLimit(selected)
                            fetchTopTracks(selectedRange, selected)
                        }}
                    >
                        {limits.map((limit) => (
                            <SelectItem key={limit.value} value={limit.value}>
                                {limit.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select
                        labelPlacement={'inside'}
                        label='Period'
                        className='max-w-[200px]'
                        defaultSelectedKeys={[ranges[2].value]}
                        disallowEmptySelection={true}
                        onChange={(e) => {
                            const selected = e.target.value
                            setSelectedRange(selected)
                            fetchTopTracks(selected, selectedLimit)
                        }}
                    >
                        {ranges.map((range) => (
                            <SelectItem key={range.value} value={range.value}>
                                {range.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </CardHeader>
            <CardBody className='px-3'>
                {topTracks.length === 0 && <CircularProgress className='self-center' color='success' />}

                {!modeList ? (
                    <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3'>
                        {topTracks.map((track, index) => (
                            <TrackCard key={index} index={index + 1} track={track} />
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col gap-3'>
                        {topTracks.map((track, index) => (
                            <TrackList key={index} index={index + 1} track={track} />
                        ))}
                    </div>
                )}
            </CardBody>
        </Card>
    )
}
