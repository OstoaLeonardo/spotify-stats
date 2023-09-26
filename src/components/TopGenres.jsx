import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, Select, SelectItem } from '@nextui-org/react'
import { ranges } from '../constants/lists'
import getTopArtists from '../api/getTopArtists'

export function TopGenres() {
    const [topGenres, setTopGenres] = useState([])

    useEffect(() => {
        fetchTopArtists()
    }, [])

    async function fetchTopArtists(range) {
        try {
            const response = await getTopArtists(range, '50')
            getCountGenres(response)
        } catch (error) {
            console.error('Error fetching top artists:', error)
        }
    }

    const getCountGenres = (genres) => {
        const countGenres = []
        genres.forEach((artist) => {
            artist.genres.forEach((genre) => {
                const index = countGenres.findIndex((item) => item.name === genre)
                if (index !== -1) {
                    countGenres[index].count++
                }
                else {
                    countGenres.push({ name: genre, count: 1 })
                }
            })
        })

        getTopGenres(countGenres)
    }

    const getTopGenres = (genres) => {
        const topGenres = genres.sort((a, b) => b.count - a.count).slice(0, 5)
        setTopGenres(topGenres)
    }

    return (
        <Card className='shadow-none flex flex-col sm:flex-row'>
            <CardHeader className='static sm:absolute h-fit justify-end pb-0 z-20'>
                {/* <span className='text-xs sm:text-base text-guppie-green line-clamp-1'>Your Top Track</span> */}
                <Select
                    label='Period'
                    className='max-w-[200px]'
                    labelPlacement={'inside'}
                    disallowEmptySelection={true}
                    defaultSelectedKeys={[ranges[2].value]}
                    onChange={(e) => {
                        const selected = e.target.value
                        fetchTopArtists(selected)
                    }}
                >
                    {ranges.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                            {range.label}
                        </SelectItem>
                    ))}
                </Select>
            </CardHeader>
            <CardBody className='relative flex justify-center overflow-hidden'>
                <div className='flex flex-col px-0 sm:px-4 gap-1 z-10'>
                    {topGenres.map((genre, index) => (
                        <div key={index} className='flex flex-row items-center gap-1'>
                            <span className='w-8 sm:w-10 flex-none text-2xl sm:text-5xl font-semibold text-end text-guppie-green mr-2 sm:mr-4'>{index + 1}.</span>
                            <span className='text-2xl sm:text-4xl font-semibold capitalize line-clamp-1'>{genre.name}</span>
                        </div>
                    ))}
                </div>
                <div className='hidden lg:block absolute -right-5 z-0'>
                    <div className='absolute w-full h-full bg-gradient-to-r from-eerie-black to-80% to-transparent z-10' />
                    <span className='text-5xl sm:text-8xl font-bold text-transparent font-outline-1 -rotate-12 line-clamp-1'>Your Top Genres</span>
                    <span className='text-5xl sm:text-8xl font-bold text-foreground -rotate-12 line-clamp-1'>Your Top Genres</span>
                    <span className='text-5xl sm:text-8xl font-bold text-guppie-green -rotate-12 line-clamp-1'>Your Top Genres</span>
                    <span className='text-5xl sm:text-8xl font-bold text-transparent font-outline-1 -rotate-12 line-clamp-1'>Your Top Genres</span>
                </div>
            </CardBody>
        </Card>
    )
}
