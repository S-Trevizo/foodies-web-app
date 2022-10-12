

function HealthLabel(props) {

    return (//this is the name of the healthLabel. I think it'd be good to make healthlabels and user roles enums in backend.
        <>
            <div>{props.healthLabelData}</div>
        </>
    );
}

export default HealthLabel;