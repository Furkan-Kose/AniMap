const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium">Yükleniyor...</p>
        </div>
    );
};

export default Loading;
