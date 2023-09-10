import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { advantages } from '../constants/landing'

export function Advantages() {
    return (
        <section className='flex flex-col sm:flex-row justify-between bg-neutral-900 p-[12%] sm:p-[8%]'>
            <div className='w-full sm:w-1/2'>
                <div className='w-full'>
                    <p className='text-4xl sm:text-6xl font-bold'>
                        <span className='text-green-400'>Music </span>
                        what you listen,
                    </p>
                    <p className='text-4xl sm:text-6xl font-bold'>
                        Stats what you <span className='text-green-400'>need</span>
                    </p>
                    <p className='text-sm sm:text-lg text-foreground/80 mt-5'>
                        You just need to login with Spotify for
                    </p>
                    <p className='text-sm sm:text-lg text-foreground/80'>
                        get what you need to know about your music
                    </p>
                </div>
            </div>
            <div className='w-full sm:w-5/12 mt-16 sm:mt-0'>
                <div className='w-full flex flex-col items-center gap-8 sm:gap-10'>
                    {advantages.map((advantage, index) => (
                        <div key={index} className='w-full flex flex-row items-start gap-6'>
                            <span className='w-12 h-12 flex justify-center items-center bg-green-400/20 rounded-lg aspect-square'>
                                <FontAwesomeIcon className='w-5 h-5 text-green-400' icon={advantage.icon} />
                            </span>
                            <div className='flex flex-col gap-3'>
                                <p className='text-xl sm:text-3xl font-bold'>
                                    {advantage.title}
                                </p>
                                <p className='text-sm sm:text-lg text-foreground/80'>
                                    {advantage.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
