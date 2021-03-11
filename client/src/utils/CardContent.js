const CardContent = ({ children }) => (
    <div className="flex align-bottom flex-col leading-none p-2 md:p-4 bg-white rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1">
        <div className="flex flex-row justify-between items-center">{children}</div>
    </div>
);

export default CardContent;