import Spinner from './Spinner';

const Button = ({ disabled = false, showSpinner = false, label, ...props }) => (
    <button
        type="button"
        className="inline-flex items-center px-4 py-2 my-3 border border-transparent text-base leading-6 font-medium rounded-md bg-blue-600 text-white active:bg-blue-700 hover:bg-blue-500 focus:border-blue-700 transition ease-in-out duration-150 disabled:opacity-50"
        disabled={disabled}
        {...props}
    >
        {showSpinner && <Spinner />}
        {label && <span>{label}</span>}
    </button>
);

export default Button;
