export default function LoadingSpin(props) {
    return (
        <div className={`flex items-center justify-center h-screen bg-gray-100 ${props.className}`}>
            <div className={`w-12 h-12 border-4 ${props.spinBorderColor} border-t-transparent rounded-full animate-spin`}></div>
        </div>
    )
}