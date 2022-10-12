
function ErrorMessages(props) {
    return (
        <>
            {props.errorData.message ?
                <div>{props.errorData.message}</div>
                :
                <div>{props.errorData}</div>
            }
        </>
    );
}

export default ErrorMessages;