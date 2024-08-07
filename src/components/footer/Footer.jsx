import React from "react";
import { Link } from "react-router-dom";


function Footer(){
    return(
        <section className="relative overflow-hidden py-10 dark:bg-slate-600 bg-pink-200 border border-t-2 border-t-black">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                    {/* TODO: <Logo/> */}
                            </div>
                            <div>
                                <p className="text-sm dark:text-gray-100  text-gray-600">
                                    &copy; Copyright 2023. All Rights Reserved by DevUI.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12 text-xs font-semibold uppercase dark:text-gray-100 text-gray-500">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  ">
                                Company
                            </h3>
                            <ul>
                                <li className="mb-4">
                                <a
                                className="text-base   hover:text-stone-700"
                                href="https://www.linkedin.com/in/sanat-kumar-rath-433144248/"
                                target="_blank"
                                rel="noopener noreferrer">
                      LinkedIn
</a>
                                </li>
                                <li className="mb-4">
                                <a
  className="text-base   hover:text-stone-700"
  href="https://www.instagram.com/sanat_kumar_rath/"
  target="_blank"
  rel="noopener noreferrer"
>
  INSTAGRAM
</a>
                                </li>
                                <li className="mb-4">
                                <a
  className="text-base font-medium  hover:text-gray-700"
  href="https://twitter.com/boosisright?s=08"
  target="_blank"
  rel="noopener noreferrer"
>
  TWITTER/X
</a>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium  hover:text-stone-700"
                                        to="/"
                                    >
                                        Press Kit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12 text-xs font-semibold uppercase dark:text-gray-100 text-gray-500">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9 ">
                                Support
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base  hover:text-gray-700"
                                        to="/"
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base  hover:text-gray-700"
                                        to="/"
                                    >
                                        Help
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base  hover:text-gray-700"
                                        to="/"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base  hover:text-gray-700"
                                        to="/"
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-3/12 text-xs font-semibold uppercase dark:text-gray-100 text-gray-500">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9">
                                Legals
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base hover:text-gray-700"
                                        to="/"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base  hover:text-gray-700"
                                        to="/"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base  hover:text-gray-700"
                                        to="/"
                                    >
                                        Licensing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default Footer;