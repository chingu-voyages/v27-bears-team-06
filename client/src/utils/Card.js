const Card = ({ children, color = 'bg-white' }) => (
    <div className={`flex ${color} justify-center`}>
        <div className={`${color} flex justify-center items-center h-screen w-screen`}>
            <div className="w-3/4 md:max-w-md">{children}</div>
        </div>
    </div>
);

export default Card;
