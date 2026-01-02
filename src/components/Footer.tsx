import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#0a192f] text-white border-t border-gray-800 py-8">
            <div className="flex flex-col items-center justify-center gap-6">
                <nav className="flex flex-wrap justify-center gap-8 text-sm font-medium text-gray-400">
                    <Link href="/about" className="hover:text-cyan-400 transition-colors duration-200">
                        About Us
                    </Link>
                    <Link href="/privacy" className="hover:text-cyan-400 transition-colors duration-200">
                        Privacy Policy
                    </Link>
                    <Link href="/terms" className="hover:text-cyan-400 transition-colors duration-200">
                        Terms of Service
                    </Link>
                </nav>
                <p className="text-gray-500 text-xs">
                    &copy; {new Date().getFullYear()} Syvursoft. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
