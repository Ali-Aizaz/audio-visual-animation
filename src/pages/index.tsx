import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

const colors = [
	{ high: '#D0E7F5', low: '#D0E7F566' },
	{ high: '#D9E7F4', low: '#D9E7F466' },
	{ high: '#D6E3F4', low: '#D6E3F466' },
	{ high: '#BCDFF5', low: '#BCDFF566' },
	{ high: '#B7D9F4', low: '#B7D9F466' },
	{ high: '#C3D4F0', low: '#C3D4F066' },
	{ high: '#9DC1F3', low: '#9DC1F366' },
	{ high: '#9AA9F4', low: '#9AA9F466' },
	{ high: '#8D83EF', low: '#8D83EF66' },
	{ high: '#AE69F0', low: '#AE69F066' },
	{ high: '#D46FF1', low: '#D46FF166' },
	{ high: '#DB5AE7', low: '#DB5AE766' },
	{ high: '#D911DA', low: '#D911DA66' },
	{ high: '#D601CB', low: '#D601CB66' },
	{ high: '#E713BF', low: '#E713BF66' },
	{ high: '#F24CAE', low: '#F24CAE66' },
	{ high: '#FB79AB', low: '#FB79AB66' },
	{ high: '#FFB6C1', low: '#FFB6C166' },
	{ high: '#FED2CF', low: '#FED2CF66' },
	{ high: '#FDDFD5', low: '#FDDFD566' },
	{ high: '#FEDCD1', low: '#FEDCD166' },
]

let nextImpactTimes = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]

const calcCurrentImpactTime = (currentImpactTime: number, velocity: number) => {
	return currentImpactTime + (Math.PI / velocity) * 1000
}

const maxAngle = 2 * Math.PI

const MusicIcon = () => {
	return (
		<svg
			width={24}
			height={24}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M12.75 12.508L21.25 9.108V14.7609C20.7449 14.4375 20.1443 14.25 19.5 14.25C17.7051 14.25 16.25 15.7051 16.25 17.5C16.25 19.2949 17.7051 20.75 19.5 20.75C21.2949 20.75 22.75 19.2949 22.75 17.5C22.75 17.5 22.75 17.5 22.75 17.5L22.75 7.94625C22.75 6.80342 22.75 5.84496 22.6696 5.08131C22.6582 4.97339 22.6448 4.86609 22.63 4.76597C22.5525 4.24426 22.4156 3.75757 22.1514 3.35115C22.0193 3.14794 21.8553 2.96481 21.6511 2.80739C21.6128 2.77788 21.573 2.74927 21.5319 2.7216L21.5236 2.71608C20.8164 2.2454 20.0213 2.27906 19.2023 2.48777C18.4102 2.68961 17.4282 3.10065 16.224 3.60469L14.13 4.48115C13.5655 4.71737 13.0873 4.91751 12.712 5.1248C12.3126 5.34535 11.9686 5.60548 11.7106 5.99311C11.4527 6.38075 11.3455 6.7985 11.2963 7.25204C11.25 7.67831 11.25 8.19671 11.25 8.80858V16.7609C10.7448 16.4375 10.1443 16.25 9.5 16.25C7.70507 16.25 6.25 17.7051 6.25 19.5C6.25 21.2949 7.70507 22.75 9.5 22.75C11.2949 22.75 12.75 21.2949 12.75 19.5C12.75 19.5 12.75 19.5 12.75 19.5L12.75 12.508Z'
				fill='#1C274C'
			/>
			<path
				d='M7.75 2C7.75 1.58579 7.41421 1.25 7 1.25C6.58579 1.25 6.25 1.58579 6.25 2V7.76091C5.74485 7.4375 5.14432 7.25 4.5 7.25C2.70507 7.25 1.25 8.70507 1.25 10.5C1.25 12.2949 2.70507 13.75 4.5 13.75C6.29493 13.75 7.75 12.2949 7.75 10.5V5.0045C8.44852 5.50913 9.27955 5.75 10 5.75C10.4142 5.75 10.75 5.41421 10.75 5C10.75 4.58579 10.4142 4.25 10 4.25C9.54565 4.25 8.9663 4.07389 8.51159 3.69837C8.0784 3.34061 7.75 2.79785 7.75 2Z'
				fill='#1C274C'
			/>
		</svg>
	)
}

const MusicOffIcon = () => {
	return (
		<svg
			width={24}
			height={24}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M12.5 6.8935V5.57661C12.5 5.36926 12.5 5.26559 12.5347 5.17738C12.5653 5.09948 12.615 5.03052 12.6792 4.97682C12.752 4.91601 12.8503 4.88323 13.047 4.81766L17.447 3.35099C17.8025 3.23249 17.9803 3.17324 18.1218 3.20877C18.2456 3.23987 18.3529 3.31718 18.4216 3.42484C18.5 3.54783 18.5 3.7352 18.5 4.10994V7.42339C18.5 7.63074 18.5 7.73441 18.4653 7.82262C18.4347 7.90052 18.385 7.96948 18.3208 8.02318C18.248 8.08399 18.1497 8.11677 17.953 8.18234L14.8192 9.22692M12.5 12.5V18.5M12.5 18.5C12.5 19.8807 10.933 21 9 21C7.067 21 5.5 19.8807 5.5 18.5C5.5 17.1193 7.067 16 9 16C10.933 16 12.5 17.1193 12.5 18.5ZM3 3L21 21'
				stroke='#000000'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

const App = () => {
	const [playing, setPlaying] = useState(false)
	const contextRef = useRef<HTMLCanvasElement>(null)
	const startTimeRef = useRef<number>(0)
	// Pre-load the audio files
	const audioFiles = useRef<HTMLAudioElement[]>([])

	const draw = useCallback(() => {
		const paper = contextRef.current
		if (!paper) return
		const pen = paper.getContext('2d')
		if (!pen) return

		const currentTime = new Date().getTime()
		const elapsedTime = (currentTime - startTimeRef.current) / 1000

		pen.clearRect(0, 0, paper.width, paper.height)

		paper.width = paper.clientWidth
		paper.height = paper.clientHeight

		const start = {
			x: paper.width * 0.1,
			y: paper.height * 0.9,
		}

		const end = {
			x: paper.width * 0.9,
			y: paper.height * 0.9,
		}

		const center = {
			x: paper.width * 0.5,
			y: paper.height * 0.9,
		}
		// drawing the base line
		pen.strokeStyle = 'white'
		pen.lineWidth = 6
		pen.beginPath()
		pen.moveTo(start.x, start.y)
		pen.lineTo(end.x, end.y)
		pen.stroke()
		const length = end.x - start.x

		const gap = (length / 2 - length * 0.05) / colors.length

		colors.map((color, idx) => {
			const arcRadius = length * 0.05 + gap * idx
			const numOfLoops = 50 - idx
			const velocity = (numOfLoops * maxAngle) / 900

			const distance = Math.PI + velocity * elapsedTime
			const modDistance = distance % maxAngle
			const adjustedDistance =
				modDistance > Math.PI ? modDistance : maxAngle - modDistance

			pen.beginPath()
			pen.arc(
				center.x,
				center.y,
				length * 0.05 + gap * idx,
				Math.PI,
				2 * Math.PI
			)
			pen.strokeStyle = color.low
			if (
				adjustedDistance.toFixed(2) === Math.PI.toFixed(2) ||
				adjustedDistance.toFixed(2) === (2 * Math.PI).toFixed(2)
			) {
				if (playing && elapsedTime > 1) {
					pen.strokeStyle = color.high
					audioFiles.current[idx].play()
				}

				nextImpactTimes[idx] = calcCurrentImpactTime(currentTime, velocity)
			}

			pen.stroke()

			pen.fillStyle = 'white'
			pen.strokeStyle = 'white'
			const x = center.x + arcRadius * Math.cos(adjustedDistance)
			const y = center.y + arcRadius * Math.sin(adjustedDistance)
			pen.beginPath()
			pen.arc(x, y, length * 0.0065, 0, 2 * Math.PI)
			pen.fill()
			pen.stroke()
		})

		requestAnimationFrame(draw)
	}, [playing])

	useEffect(() => {
		if (!contextRef.current) return

		startTimeRef.current = new Date().getTime()
		audioFiles.current = colors.map((_, idx) => {
			const audio = new Audio(`Audio/vibraphone-key-${idx}.wav`)
			audio.volume = 0.05
			return audio
		})

		const animationFrameId = requestAnimationFrame(draw)

		return () => {
			// Clean up the animation frame when the component unmounts
			cancelAnimationFrame(animationFrameId)
		}
	}, [draw])

	useEffect(() => {
		const handleVisibilityChange = () => {
			if (document.hidden) {
				// Pause all audio files when the page is hidden
				setPlaying(false)
				audioFiles.current.forEach((audio) => audio.pause())
			} else {
				startTimeRef.current = new Date().getTime()
				setPlaying(true)
			}
		}

		document.addEventListener('visibilitychange', handleVisibilityChange)

		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange)
		}
	}, [])

	return (
		<button
			type='button'
			className='absolute'
			onClick={() => setPlaying((val) => !val)}
		>
			<Image src='/background.jpg' fill className='fill' alt='background' />
			<canvas
				className='w-screen h-screen relative'
				ref={contextRef}
				id='paper'
			/>
			<div className='absolute top-10 left-1/2 right-1/2'>
				{playing ? <MusicIcon /> : <MusicOffIcon />}
			</div>
		</button>
	)
}

export default App
