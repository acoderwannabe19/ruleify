export function errorMessage({message}: {message: ""}) {
    return (
        <span style={{color: "red"}}>`Veuillez choisir {message}.`</span>
    )
}