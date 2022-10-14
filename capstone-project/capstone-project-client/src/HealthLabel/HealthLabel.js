

function HealthLabel(props) {

    return (//this is the name of the healthLabel. I think it'd be good to make healthlabels and user roles enums in backend.
            //possibly take the list from register and place in here for use in other components. kinda like an enum.
        <>
            <div>{props.healthLabelData}</div>
        </>
    );
}

export default HealthLabel;