const RadioButton = ({ label, value, onChange }) => {
    return (
        <div className="flex items-center mr-4">
            <input
                type="radio"
                checked={value}
                onChange={onChange}
                className={`w-4 h-4 bg-gray-100 border-gray-300 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ring-2`}
            />
            <label
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
                {label}
            </label>
        </div>
    );
};

export default RadioButton;
