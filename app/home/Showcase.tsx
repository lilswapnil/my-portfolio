import Image from "next/image";
export default function Showcase() {
    return (
        <div className="showcase-wrapper h-full w-full flex items-center justify-center">
            <Image
                src="/laptop.svg"
                alt="Showcase of Projects"
                width={1300}
                height={600}
                className="showcase-image object-contain"
            />
        </div>
    )
}