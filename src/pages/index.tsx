import { useCallback, useEffect, useRef, useState } from 'react'

const colors = [
	'#D0E7F5',
	'#D9E7F4',
	'#D6E3F4',
	'#BCDFF5',
	'#B7D9F4',
	'#C3D4F0',
	'#9DC1F3',
	'#9AA9F4',
	'#8D83EF',
	'#AE69F0',
	'#D46FF1',
	'#DB5AE7',
	'#D911DA',
	'#D601CB',
	'#E713BF',
	'#F24CAE',
	'#FB79AB',
	'#FFB6C1',
	'#FED2CF',
	'#FDDFD5',
	'#FEDCD1',
]

let nextImpactTimes = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]

const calcCurrentImpactTime = (currentImpactTime: number, velocity: number) => {
	return currentImpactTime + (Math.PI / velocity) * 1000
}
const maxAngle = 2 * Math.PI

const App = () => {
	const [playing, setPlaying] = useState(false)
	const contextRef = useRef<HTMLCanvasElement>(null)

	const startTime = new Date().getTime()

	const draw = useCallback(() => {
		const paper = contextRef.current
		if (!paper) return
		const pen = paper.getContext('2d')
		if (pen === null) return

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

		const currentTime = new Date().getTime()
		const elapsedTime = (currentTime - startTime) / 1000

		colors.map((color, idx) => {
			pen.beginPath()
			pen.arc(
				center.x,
				center.y,
				length * 0.05 + gap * idx,
				Math.PI,
				2 * Math.PI
			)
			pen.strokeStyle = color
			pen.stroke()

			const arcRadius = length * 0.05 + gap * idx
			const numOfLoops = 50 - idx
			const velocity = (numOfLoops * maxAngle) / 900

			const distance = Math.PI + velocity * elapsedTime
			const modDistance = distance % maxAngle
			const adjustedDistance =
				modDistance > Math.PI ? modDistance : maxAngle - modDistance

			if (currentTime >= nextImpactTimes[idx]) {
				const audio = new Audio(
					`http://localhost:3000/Audio/vibraphone-key-${idx}.wav`
				)
				audio.volume = 0.05

				if (playing) audio.play()

				nextImpactTimes[idx] = calcCurrentImpactTime(currentTime, velocity)
			} else {
				pen.fillStyle = 'white'
				pen.strokeStyle = 'white'
			}

			const x = center.x + arcRadius * Math.cos(adjustedDistance)
			const y = center.y + arcRadius * Math.sin(adjustedDistance)
			pen.beginPath()
			pen.arc(x, y, length * 0.0065, 0, 2 * Math.PI)
			pen.fill()
			pen.stroke()
		})

		requestAnimationFrame(draw)
	}, [playing, startTime])

	useEffect(() => {
		if (!contextRef.current) return

		draw()
	}, [contextRef, draw])

	useEffect(() => {
		const handleVisibilityChange = () => {
			setPlaying(false)
		}
		handleVisibilityChange()
		document.addEventListener('visibilitychange', handleVisibilityChange)

		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange)
		}
	}, [])

	return (
		<>
			<canvas
				className='w-screen h-screen relative'
				ref={contextRef}
				id='paper'
			/>
			<button
				type='button'
				className='absolute top-0 text-white'
				onClick={() => setPlaying((val) => !val)}
			>
				Play Sound {playing.toString()}
			</button>
		</>
	)
}

export default App
