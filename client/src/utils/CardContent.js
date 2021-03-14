const CardContent = ({ children }) => (
    <div className="flex flex-col min-h-full p-2 mb-1 mr-1 leading-none align-bottom bg-white rounded shadow outline-none md:p-4 hover:shadow-lg focus:outline-none">
        <div className="flex flex-row items-center justify-center">{children}</div>
    </div>
);

export default CardContent;
