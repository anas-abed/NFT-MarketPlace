import React from "react";
import Link from "next/link";
import Image from 'next/image'

const HeadSection = () => {
  return (
    <div className="relative max-w-7xl mx-auto px-4">
      <section>
        <div className="relative bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <div className="relative pt-6 px-4 sm:px-6 lg:px-8 "></div>
              <main className=" mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:m-28 ">
                <div className="sm:text-center lg:text-left">
                  <h1 className=" text-4xl tracking-tight font-extrabold text-blue-500 sm:text-5xl md:text-6xl ">
                    <span className=" block xl:inline  ">Upload Your NFTs </span>
                    <span className=" block xl:inline text-gray-800 ">
                      Discover, Collect, and Sell Extraordinary NFTs 
                    </span>
                  </h1>
                  <p className=" mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 ">
                  Join us where the best place in the world of NFT
                  </p>
                  <div className=" mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start ">
                    <div className=" rounded-md shadow ">
                      <Link href="/createNFT" legacyBehavior>
                        <a
                          className="text-white bg-blue-500 hover:bg-gray-700 w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md  "
                        >
                          Get started with Create Your NFTs
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
          <div className=" lg:absolute lg:inset-y-40 lg:right-0 lg:w-1/2 ">
            <Image className="h-56 w-full  object-center sm:h-76 md:h-96   " src="/../public/NFT-background.jpg" width={1200} height={300} alt="NFT IMAGE" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeadSection;
