import React from "react";

export default function Footer({}) {
    return (
        <footer className="bg-slate-500 print:hidden">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="flex flex-col items-center justify-center">
                        <p
                            href="KKM"
                            className="font-bold text-gray-700 hover:text-gray-900"
                        >
                            تم التصميم والتطوير بواسطة
                        </p>
                        <h2 className="text-lg capitalize">horizon dev</h2>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <p
                            href="KKM"
                            className="font-bold text-gray-700 hover:text-gray-900"
                        >
                            فريق الدعم
                        </p>
                        <h2 className="text-lg ">horizondev.iq</h2>
                    </div>
                </div>
            </div>
        </footer>
    );
}
