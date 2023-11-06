export default function ErrorMessage({message}: {message: string}) {
    return (
       message.length >= 1 ? <div style={{color: "red"}}>Veuillez choisir {message}.</div> : ""
    )
}