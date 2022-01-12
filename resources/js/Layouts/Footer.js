import React from "react";

export default function Footer({}) {
    var year = new Date();
    return (
        <footer className="bg-primary print:hidden">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="flex flex-col text-gray-100 items-center justify-center">
                        <h2 className="text-lg capitalize">
                            جميع الحقوق محفوظة {year.getFullYear()}
                        </h2>
                        <p className="font-bold ">
                            مجموعة شركات الدير المتحدة AUG &copy;
                        </p>
                    </div>
                    <div className="flex flex-col text-gray-100 items-center justify-center">
                        <p href="KKM" className="">
                            تم التصميم والتطوير بواسطة
                        </p>
                        <a
                            target="_blank"
                            href="https://horizondev-7ul7z3h2p-mohammed-qasim93.vercel.app"
                            className="text-lg"
                        >
                            HorizonDev IQ &copy;
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
