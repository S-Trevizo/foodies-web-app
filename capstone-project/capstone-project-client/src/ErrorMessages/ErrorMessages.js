
function ErrorMessages(props) {
    return (
        <>
            {props.errorData.message ?
                <div className="alert alert-danger">{props.errorData.message}</div>
                :
                <div>{props.errorData}</div>
            }
        </>
    );
}

export default ErrorMessages;