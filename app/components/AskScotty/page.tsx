import Image from 'next/image';

export default function AskScotty() {
    return (
        <div className="hidden lg:flex fixed bottom-0 right-4 h-128 w-64 border border-black  justify-center rounded-lg z-40">
            <div className="h-12 w-full flex items-center justify-center gap-2 p-2 bg-gray-900">
                <Image 
                    src="/askscotty.png"
                    alt="Ask Scotty Logo"
                    width={24}
                    height={24}
                    style={{ filter: "invert(1)" }}
                />
                <h3 className='text-white text-md'>Ask Scotty</h3>
            </div>
        </div>
    )
}
