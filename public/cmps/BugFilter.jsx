const {useState, useEffect} = React
export function BugFilter({ onSetFilter, filterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    console.log(filterByToEdit)
    
    useEffect(() => {
        onSetFilter(filterByToEdit)

    }, [filterByToEdit])

    const { severity, txt, label } = filterBy

    function handleChange({ target }) {
        console.log("the target in the filter cmp is:", target);

        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        setFilterByToEdit(prevFilter => ({
            ...prevFilter,
            [field]: value,
        }))
    }
    // return <form>
    //     <input
    //         className='bug-filter'
    //         placeholder="Enter bug's title here"
    //         type="text"
    //         id="txt"
    //         value={txt}
    //         onChange={handleChange}>
    //     </input>

    //     <select
    //         onChange={handleChange}
    //         Sort by severity
    //         name="severity"
    //         value={severity}
    //     >
    //         <select value="1"></select>
    //         <select value="2"></select>
    //         <select value="3"></select>
    //     </select>
    // </form>

    return 'bug filter cmp'
}