function Range({ rangeValue, onRangeChange }) {
	const handleChange = (e) => {
		onRangeChange(e.target.value)
	}

	return (
		<div>
			<input
				type="range"
				name="range"
				id="range"
				className="form-range"
				min="0"
				max="10"
				value={rangeValue}
				onChange={handleChange}
			/>
			<p>{ rangeValue }$</p>
		</div>
	)
}

export default Range
