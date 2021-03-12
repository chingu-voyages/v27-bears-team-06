const Card = ({ children, color = 'bg-white' }) => (
        <div
            className={`${color} flex justify-center items-center h-screen snap-center`}
        >
            <div className="w-3/4 md:max-w-md">{children}</div>
        </div>
);

export default Card;
