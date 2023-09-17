import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image, Button, Select, SelectItem, CircularProgress, Link } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faList, faTableCellsLarge } from '@fortawesome/free-solid-svg-icons'
import { ranges, limits } from '../constants/lists'
import getTopArtists from '../api/topArtists'
import { ArtistCard } from './ArtistCard'
import { ArtistList } from './ArtistList'

export function TopArtists() {
    const [topArtists, setTopArtists] = useState([])
    const [selectedRange, setSelectedRange] = useState()
    const [selectedLimit, setSelectedLimit] = useState()
    const [modeList, setModeList] = useState(false)

    useEffect(() => {
        fetchTopArtists()
    }, [])

    async function fetchTopArtists(selectedRange, selectedLimit) {
        try {
            const response = await getTopArtists(selectedRange, selectedLimit)
            setTopArtists(response)
        } catch (error) {
            console.error('Error fetching top artists:', error)
        }
    }

    const toggleModeList = () => {
        setModeList(!modeList)
    }

    return (
        <Card className='shadow-none p-4'>
            <CardHeader className='flex flex-col sm:flex-row justify-between gap-3'>
                <h3 className='w-full text-2xl sm:text-4xl font-bold'>
                    Top <span className='text-guppie-green'>Artists</span>
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
                            fetchTopArtists(selectedRange, selected)
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
                            fetchTopArtists(selected, selectedLimit)
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
                {topArtists.length === 0 && <CircularProgress className='self-center' color='success' />}

                {!modeList ? (
                    <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3'>
                        {topArtists.map((artist, index) => (
                            <ArtistCard key={index} index={index + 1} artist={artist} />
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col gap-3'>
                        {topArtists.map((artist, index) => (
                            <ArtistList key={index} index={index + 1} artist={artist} />
                        ))}
                    </div>
                )}

            </CardBody>
        </Card>
    )
}
