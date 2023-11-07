export default function ErrorMessage({message}: {message: string}) {
    return (
       message.length >= 1 ? (<div style={{color: "red", fontSize:"12px"}}>*Please choose {message}.</div>) : ""
    )
}