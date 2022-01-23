import React, { useEffect } from "react";
import page1 from "/h.jpg";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import moment from "moment";
import ApplicationLogo from "@/Components/ApplicationLogo";
import "moment/locale/en-gb";
import { Inertia } from "@inertiajs/inertia";
import { isArray } from "lodash";

export default function Print({ out, auth, dname, carnum, carType }) {
    const [spinner, setSpinner] = React.useState(true);

    useEffect(() => {
        download();
    }, []);

    // setTimeout(() => {
    //     setSpinner(false);
    //     if (auth.user !== null) {
    //         Inertia.get("/");
    //     }
    // }, 3000);

    const download = () => {
        const divToPrint = document.querySelector("#page");
        html2canvas(divToPrint).then((canvas) => {
            const imgData = canvas.toDataURL("image/jpeg", 1.0);
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const doc = new jsPDF("p", "mm", "A4");
            doc.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
            doc.save(`jij.pdf`);
        });
    };

    return (
        <div className="flex flex-col mt-4 items-center font-sans justify-center">
            <div
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
                {spinner && (
                    <div className="m-5 flex flex-col items-center justify-center">
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
                        <ApplicationLogo className="h-28 w-96" />
                    </div>
                )}
            </div>
            <div id="page" className="">
                {isArray(out) ? (
                    <div
                        className="page1 relative font-tajawal-regular "
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
                        <div className="absolute w-full top-64 h-full">
                            <p
                                style={{
                                    top: "10rem",
                                }}
                                className="absolute w-full text-center text-6xl"
                            >
                                م / اخراج مواد
                            </p>
                            <div
                                style={{
                                    top: "25rem",
                                }}
                                className="flex flex-wrap absolute leading-loose gap-4 w-full  text-center px-20 text-6xl"
                            >
                                <p className="">
                                    {" "}
                                    تم اخراج المواد ادناه بواسطة السيد
                                </p>
                                <p className="font-bold">( {out[0].name} )</p>
                                <p>
                                    بتأريخ{" "}
                                    <span className="font-bold">
                                        {moment(out[0].outdate).format(
                                            "YYYY/MM/DD"
                                        )}
                                    </span>{" "}
                                </p>
                                <p>
                                    في تمام الساعه{" "}
                                    <span className="font-bold">
                                        {moment(out[0].outdate).format(
                                            "hh:mm:ss"
                                        )}
                                    </span>{" "}
                                </p>
                            </div>
                            <div
                                style={{
                                    top: "45rem",
                                }}
                                className="absolute w-full text-6xl mt-20"
                            >
                                <ul className="items px-64  gap-y-6">
                                    {out.map((item, index) => (
                                        <li className="flex" key={index}>
                                            <span className=" ml-4">
                                                &bull;
                                            </span>
                                            <div className="flex gap-x-32">
                                                <span> {item.items.name} </span>
                                                <div className="flex gap-x-10">
                                                    <span> العدد </span>
                                                    <span> {item.qty} </span>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>{" "}
                                {out[0].outType == 1 && (
                                    <div className="flex absolute gap-4 w-full text-center px-20 mt-20 text-6xl">
                                        <p className="flex flex-wrap gap-x-4">
                                            <span>
                                                {" "}
                                                تم اخراج المواد خارج الشركة من
                                                قبل{" "}
                                            </span>
                                            <span className="font-bold">
                                                {" "}
                                                ( {dname} ){" "}
                                            </span>
                                            <span> نوع المركبة </span>
                                            <span className="font-bold">
                                                {" "}
                                                ( {carType} ){" "}
                                            </span>
                                            <span> المرقمة </span>
                                            <span className="font-bold">
                                                {" "}
                                                ( {carnum} ){" "}
                                            </span>
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div
                                style={{
                                    bottom: "50rem",
                                    columnGap: "20rem",
                                }}
                                className="flex  items-center px-20 justify-between text-7xl  absolute w-full"
                            >
                                <div className="sender text-center h-72 flex flex-col justify-around flex-1">
                                    <p>المسلم</p>
                                    <p className="text-6xl font-bold">
                                        {" "}
                                        {out[0].authname}{" "}
                                    </p>
                                </div>
                                <div className="reciver  text-center h-72 flex flex-col justify-around flex-1">
                                    <p>المستلم</p>
                                    <p className="text-6xl font-bold">
                                        {out[0].name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
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
                        <div className="absolute w-full h-full top-64">
                            <p
                                style={{
                                    top: "20rem",
                                }}
                                className="absolute w-full text-center text-6xl"
                            >
                                م / ادخال ماده
                            </p>
                            <div
                                style={{
                                    top: "40rem",
                                }}
                                className="flex absolute gap-4 w-full text-center px-20 text-6xl"
                            >
                                <p> تم ادخال الماده ادناه بواسطة السيد</p>
                                <p className="font-bold">( {out.name} )</p>
                                <p>
                                    بتأريخ{" "}
                                    <span className="font-bold">
                                        {moment(out.outdate).format(
                                            "YYYY/MM/DD"
                                        )}{" "}
                                    </span>
                                </p>
                                <p>
                                    في تمام الساعه{" "}
                                    <span className="font-bold">
                                        {moment(out.outdate).format("hh:mm:ss")}{" "}
                                    </span>
                                </p>
                            </div>
                            <div
                                style={{
                                    top: "46rem",
                                }}
                                className="absolute text-6xl mt-7"
                            >
                                <ul className="items px-64 text-right  gap-y-6">
                                    <li className="">
                                        <span className=" ml-4">&bull;</span>
                                        <span>{out.items.name}</span>
                                    </li>
                                </ul>
                            </div>

                            <div
                                style={{
                                    bottom: "50rem",
                                    columnGap: "20rem",
                                }}
                                className="flex  items-center px-20 justify-between text-7xl  absolute w-full"
                            >
                                <div className="reciver  text-center h-72 flex flex-col justify-around flex-1">
                                    <p>المستلم</p>
                                    <p className="text-6xl font-bold">
                                        {out.authname}
                                    </p>
                                </div>
                                <div className="sender text-center h-72 flex flex-col justify-around flex-1">
                                    <p>المسلم</p>
                                    <p className="text-6xl font-bold">
                                        {" "}
                                        {out.name}{" "}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
