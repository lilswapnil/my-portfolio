export default function Footer () {
    return (
        <footer className="w-full bg-gray-900 text-white py-2 mt-8">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Scott's Portfolio. All rights reserved.</p>
            </div>
        </footer>
    )
}