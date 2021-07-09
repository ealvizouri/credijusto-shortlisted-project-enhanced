const InputText = ({requried = true, name, label, bind}) => {
    return <div className="d-flex flex-direction-column p-1">
        <label className="text-500" htmlFor={name}>{label}</label>
        <input className="input-form" id={name} type="text" requried={requried ? "true" : "false"} {...bind} />
    </div>
}
export default InputText;