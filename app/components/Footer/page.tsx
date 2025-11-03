export default function Footer () {
    return (
        <footer className="w-full border-1 glass-container text-white-50 py-2">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Scott's Portfolio. All rights reserved.</p>
            </div>
        </footer>
    )
}