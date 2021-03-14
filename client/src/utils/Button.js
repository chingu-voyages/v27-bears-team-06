import Spinner from './Spinner';

const Button = ({ disabled = false, showSpinner = false, label, ...props }) => (
    <button
        type="button"
        className="inline-flex items-center px-4 py-2 my-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-blue-600 border-transparent rounded-md active:bg-blue-700 hover:bg-blue-500 focus:border-blue-700 disabled:opacity-50"
        disabled={disabled}
        {...props}
    >
        {showSpinner && <Spinner />}
        {label && <span>{label}</span>}
    </button>
);

export default Button;
