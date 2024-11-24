

export function BugPreview({ bug }) {
    return <article>
        <h4>{bug.title}</h4>
        <img src={`https://robohash.org/${Math.random()}`} alt="bug img" />
                <p>Severity: <span>{bug.severity}</span></p>
        {bug.labels && bug.labels.map(label => <label key={bug.id + label}>{label} | </label>)}
    </article>
}