import Image from "next/image";
import logo from "../Assets/New_Logo.png";

function SpinnerLoader() {
    return (
        <div className="relative flex items-center justify-center h-[8.5rem] w-[8.5rem]">
            {/* Spinning Ring */}
            <div className="absolute w-full h-full border-4 border-t-4 border-orange-500 rounded-full animate-spin"></div>
            {/* Logo Image */}
            <Image
                src={logo}
                alt="logo"
                width={120}
                height={60}
                objectFit="cover"
                className="z-10"
            />
        </div>
    );
}

export default SpinnerLoader;
