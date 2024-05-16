import { Input } from "./components/forms/Input"
import { Checkbox } from "./components/forms/Checkbox"
import ProductCategoryRow from "./components/products/ProductCategoryRow"
import ProductRow from "./components/products/ProductRow";
import { useState } from "react";
import Range from "./components/forms/Range";
import { PRODUCTS as products } from "../db";
import Footer from "./components/Footer";

function SearchBar({ showStockedOnly, onStockedOnlyChange, search, onSearchChange, rangeValue, onRangeChange}) {
	return (
		<div>
			<div className="mb-3">
				<Input
					value={search}
					onChange={onSearchChange}
					placeholder={"Search..."}
				/>
			</div>
			<Checkbox
				id="stocked"
				checked={showStockedOnly}
				onChange={onStockedOnlyChange}
				label="Display only products in stock">
				</Checkbox>
			<Range
				rangeValue={rangeValue}
				onRangeChange={onRangeChange}
			/>
		</div>
	)
}

function ProductTable({ products }) {
	const rows = []
	let lastCategory = null

	for (let product of products) {
		if (product.category !== lastCategory) {
			rows.push(<ProductCategoryRow key={product.category} name={product.category} />)
		}
		lastCategory = product.category
		rows.push(<ProductRow product={product} key={product.id} />)
	}
	return (
		<table className="table">
			<thead>
				<tr>
					<th>Name</th>
					<th>Price</th>
				</tr>
			</thead>
			<tbody>
				{rows}
			</tbody>
		</table>
	)
}

function App() {
	const [showStockedOnly, setShowStockedOnly] = useState(false)
	const [search, setSearch] = useState('')
	const [rangeValue, setRangeValue] = useState(10)

	const visibleProducts = products.filter(product => {
		let price = Number(product.price.split("$")[1])
		let lowerCaseName = product.name.toLowerCase()

		if (showStockedOnly && !product.stocked)
			return false

		if (search && !lowerCaseName.includes(search.toLowerCase()))
			return false

		if (rangeValue < price)
			return false

		return true
	})

	return (
		<div className="container my-3">
			<SearchBar
				showStockedOnly={showStockedOnly}
				onStockedOnlyChange={setShowStockedOnly}
				search={search}
				onSearchChange={setSearch}
				rangeValue={rangeValue}
				onRangeChange={setRangeValue}
			/>
			<ProductTable products={visibleProducts} />
			<Footer />
		</div>
	)
}

export default App
