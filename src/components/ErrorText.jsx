function ErrorText (prop) {

    const {text, status } = prop

    return (
        <>
        {
            status && 
            (
                <p className="text-red">Error</p>
            )
        }
        </>
    )
}

export default ErrorText