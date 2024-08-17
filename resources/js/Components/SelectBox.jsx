export default function SelectBox({ 
    className = '', 
    defaultValue,
    options,
    currentValue,
    ...props
 }) {
    return (
        <select 
            {...props}
            defaultValue={defaultValue}
            className={'rounded border-gray-300 text-gray-600 shadow-sm focus:ring-gray-500' + className}
        >
            {options.map((option, index) => {
                return (
                    <option
                        {...props}
                        value={option.value}
                    >{option.label}</option>
                )
            })}
        </select>
    )
};
