import React, { useEffect } from "react";
import page1 from "/h.jpg";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import moment from "moment";
import "moment/locale/en-gb";
import { Inertia } from "@inertiajs/inertia";

export default function Print({ out }) {
    const [spinner, setSpinner] = React.useState(true);

    // useEffect(() => {
    //     download();
    // }, []);

    // setTimeout(() => {
    //     setSpinner(false);
    //     if (auth.user !== null) {
    //         Inertia.replace("/");
    //     }
    // }, 3000);

    const download = () => {
        const divToPrint = document.querySelector("#page");
        html2canvas(divToPrint).then((canvas) => {
            const imgData = canvas.toDataURL("image/jpeg", 1.0);
            const imgWidth = 210;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const doc = new jsPDF("p", "mm", "A4");
            doc.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
            doc.save(`jij.pdf`);
        });
    };

    return (
        <div className="flex flex-col mt-4 items-center font-sans justify-center">
            {/* <div
                style={{
                    width: "100%",
                    height: "100vh",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: "10000",
                }}
                className="loader"
            >
                {/* {spinner && (
                    <div className="m-5">
                        <svg
                            className="animate-spin -ml-1 mr-3 h-10 w-10 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    </div>
                )/}
            </div> */}
            <div id="page" className="">
                <div
                    className="page1 relative font-tajawal-regular"
                    style={{
                        backgroundImage: `url(${page1})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        imageResolution: "700dpi",
                        width: "2480px",
                        height: "3500px",
                    }}
                >
                    <p
                        style={{
                            top: "30rem",
                        }}
                        className="absolute w-full text-center text-6xl"
                    >
                        م / اخراج مواد
                    </p>
                    <div
                        style={{
                            top: "40rem",
                        }}
                        className="flex absolute gap-4 w-full text-center px-20 text-6xl"
                    >
                        <p className=""> تم اخراج المواد ادناه بواسطة السيد</p>
                        <p className="">( {out[0].name} )</p>
                        <p className="">
                            بتأريخ {moment(out[0].outdate).format("YYYY/MM/DD")}{" "}
                        </p>
                        <p className="">
                            في تمام الساعه{" "}
                            {moment(out[0].outdate).format("hh:mm:ss")}{" "}
                        </p>
                    </div>
                    <div
                        style={{
                            top: "46rem",
                        }}
                        className="absolute w-full text-6xl mt-7"
                    >
                        <ul className="items list-disc px-64 flex flex-col gap-y-6">
                            {out.map((item, index) => (
                                <li key={index}> {item.items.name} </li>
                            ))}
                        </ul>
                    </div>

                    <div
                        style={{
                            bottom: "30rem",
                        }}
                        className="flex  items-center justify-between px-80  absolute w-full"
                    >
                        <p className="reci"> reciver </p>
                        <p className="send "> sender </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
