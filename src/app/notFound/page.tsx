
import Image from 'next/image';

const EmptyComponent = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="hidden sm-320:block sm-480:block sm-767:block sm-991:block sm-992:hidden text-center">
                <div className="bg-white rounded-lg p-8">
                    <div className="flex justify-center">
                        <Image
                            src="https://staticmania.cdn.prismic.io/staticmania/aa469681-b2d1-4384-a990-91906711a24d_Property+1%3DNight+sky_+Property+2%3DSm.svg"
                            height={250}
                            width={350}
                            alt="Screen Not Supported"
                            className="object-contain"
                        />
                    </div>
                    <h1 className="text-2xl font-semibold text-orange-500 mb-4">
                        Content Not Available
                    </h1>
                    <p className="text-sm text-gray-600 mb-6 font-semibold">
                        This page is not accessible on mobile or tablet devices. To view this content, please access it on a desktop or laptop.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EmptyComponent;
