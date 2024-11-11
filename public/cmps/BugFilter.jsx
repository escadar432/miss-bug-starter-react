const { useState, useEffect } = React
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

    const { severity, txt, label } = filterBy

    return <form>
        <input
            className='bug-filter'
            placeholder="Enter bug's title here"
            type="text"
            id="txt"
            name="txt"
            value={txt}
            onChange={handleChange}> 
        </input>
        {/* 
        <select
            onChange={handleChange}
            Sort by severity
            name="severity"
            value={severity}
        >
            <select value="1"></select>
            <select value="2"></select>
            <select value="3"></select>
        </select> */}
    </form>

}