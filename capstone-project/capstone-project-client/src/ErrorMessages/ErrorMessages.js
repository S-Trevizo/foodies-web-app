
function ErrorMessages(props) {
    return (
        <>
            {props.errorData.message ?
                <div>{props.errorData.message}</div>
                :
                <div className="alert alert-danger">{props.errorData}</div>
            }
        </>
    );
}

export default ErrorMessages;