

export function BugPreview({ bug }) {

    return <article>
        <h4>{bug.title}</h4>
        <h1>🐛</h1>
        <p>Severity: <span>{bug.severity}</span></p>
        <ul className="preview-bug-labels">
            {bug.labels && bug.labels.map(label => <li key={bug._id+''+label}>{label}</li>)}
        </ul>

    </article>
}