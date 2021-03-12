import Spinner from './Spinner';

const Button = ({ disabled = false, showSpinner = false, label, ...props }) => (
    <button
        type="button"
        className="mb-10 inline-flex items-center px-5 py-4 my-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
       
        disabled={disabled}
        {...props}
    >
        {showSpinner && <Spinner />}
        {label && <span>{label}</span>}
    </button>
);

export default Button;
