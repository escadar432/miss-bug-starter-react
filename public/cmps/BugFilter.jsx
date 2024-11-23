const { useState, useEffect } = React

import { LabelSelector } from '../cmps/LabelSelector.jsx'


export function BugFilter({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    // console.log("Hi from the filter cmp", filterByToEdit)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])


    function handleChange({ target }) {
        console.log("the target in the filter cmp is:", target)
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        setFilterByToEdit(prevFilter => ({
            ...prevFilter,
            [field]: value,
        }))
    }

    function onLabelChange(selectedLabels) {
        setFilterByToEdit(prevFilter => ({
            ...prevFilter,
            labels: selectedLabels,
        })
        )
        console.log("the selected labels are:", selectedLabels)

    }
    const { severity, txt, label } = filterBy

    return <form className="bug-filter">
        <input
            className='bug-filter filter-input'
            placeholder="Enter bug's title here"
            type="text"
            id="txt"
            name="txt"
            value={txt}
            onChange={handleChange}>
        </input>
        <input
            placeholder="Enter severity here.."
            className="filter-input filter-input"
            type="text"
            id="severity"
            name="severity"
            value={severity}
            onChange={handleChange}
        />
        <LabelSelector onLabelChange={onLabelChange} />

    </form>

}